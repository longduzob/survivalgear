import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { scrapeAliExpress, slugify, validateProductData } from "@/lib/scraper";
import { calculateSellingPrice, calculateMarginPercentage } from "@/lib/pricing";

/**
 * POST /api/admin/import
 * Import products from AliExpress URLs
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Re-enable auth after initial product import
    // Check authentication
    // const session = await getServerSession();
    // 
    // if (!session || (session.user as any)?.role !== "ADMIN") {
    //   return NextResponse.json(
    //     { error: "Unauthorized. Admin access required." },
    //     { status: 401 }
    //   );
    // }

    const body = await request.json();
    const { urls } = body;

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "URLs array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Limit number of URLs to prevent abuse
    if (urls.length > 50) {
      return NextResponse.json(
        { error: "Maximum 50 URLs allowed per import" },
        { status: 400 }
      );
    }

    const results = [];

    // Process each URL
    for (const url of urls) {
      const result = await processProductImport(url);
      results.push(result);
    }

    return NextResponse.json({
      success: true,
      results,
      summary: {
        total: results.length,
        succeeded: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
      },
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: "Internal server error during import" },
      { status: 500 }
    );
  }
}

/**
 * Process a single product import
 */
async function processProductImport(url: string) {
  // Create import log entry
  const importLog = await prisma.importLog.create({
    data: {
      sourceUrl: url,
      status: "PENDING",
    },
  });

  try {
    // Scrape product data
    const scrapedData = await scrapeAliExpress(url);
    const productData = validateProductData(scrapedData);

    // Calculate pricing
    const basePrice = productData.price;
    const sellingPrice = calculateSellingPrice(basePrice);
    const margin = calculateMarginPercentage(basePrice, sellingPrice);

    // Generate unique slug
    let slug = slugify(productData.name);
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${slugify(productData.name)}-${counter}`;
      counter++;
    }

    // Get or create default category
    let category = await prisma.category.findFirst({
      where: { slug: productData.category || "outdoor-equipment" },
    });

    if (!category) {
      // Create default category if it doesn't exist
      category = await prisma.category.create({
        data: {
          name: "Outdoor Equipment",
          slug: "outdoor-equipment",
          description: "General outdoor and survival equipment",
        },
      });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug,
        description: productData.description,
        brand: productData.brand || "Generic",
        price: sellingPrice,
        basePrice,
        sourceUrl: url,
        categoryId: category.id,
        stock: 100, // Default stock
        active: true,
        featured: false,
      },
    });

    // Create product images
    if (productData.images && productData.images.length > 0) {
      await prisma.productImage.createMany({
        data: productData.images.map((imageUrl, index) => ({
          productId: product.id,
          url: imageUrl,
          alt: productData.name,
          order: index,
        })),
      });
    }

    // Update import log with success
    await prisma.importLog.update({
      where: { id: importLog.id },
      data: {
        status: "SUCCESS",
        productName: productData.name,
        basePrice,
        sellingPrice,
        margin,
      },
    });

    return {
      success: true,
      url,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        basePrice,
        sellingPrice,
        margin,
      },
    };
  } catch (error) {
    // Update import log with failure
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    
    await prisma.importLog.update({
      where: { id: importLog.id },
      data: {
        status: "FAILED",
        errorMessage,
      },
    });

    return {
      success: false,
      url,
      error: errorMessage,
    };
  }
}
