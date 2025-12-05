import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { scrapeAliExpress, slugify, validateProductData, type ScrapedProduct } from "@/lib/scraper";
import { calculateSellingPrice, calculateMarginPercentage } from "@/lib/pricing";
import { downloadProductImages, isValidImageUrl } from "@/lib/imageDownloader";

interface ImportInput {
  url?: string;
  productData?: Partial<ScrapedProduct>;
}

/**
 * POST /api/admin/import
 * Import products from AliExpress URLs or structured data
 * 
 * Accepts two formats:
 * 1. { urls: string[] } - Attempt to scrape from URLs (limited success due to bot protection)
 * 2. { products: Array<{ url?: string, productData: ScrapedProduct }> } - Direct data import (recommended)
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
    const { urls, products } = body;

    let inputs: ImportInput[] = [];

    // Handle legacy URLs format
    if (urls && Array.isArray(urls)) {
      if (urls.length === 0) {
        return NextResponse.json(
          { error: "URLs array must not be empty" },
          { status: 400 }
        );
      }
      inputs = urls.map(url => ({ url }));
    }
    // Handle new products format with structured data
    else if (products && Array.isArray(products)) {
      if (products.length === 0) {
        return NextResponse.json(
          { error: "Products array must not be empty" },
          { status: 400 }
        );
      }
      inputs = products;
    }
    else {
      return NextResponse.json(
        { error: "Either 'urls' or 'products' array is required" },
        { status: 400 }
      );
    }

    // Limit number of imports to prevent abuse
    if (inputs.length > 50) {
      return NextResponse.json(
        { error: "Maximum 50 products allowed per import" },
        { status: 400 }
      );
    }

    const results = [];

    // Process each input
    for (const input of inputs) {
      const result = await processProductImport(input);
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
async function processProductImport(input: ImportInput) {
  const sourceUrl = input.url || 'manual-import';
  
  // Create import log entry
  const importLog = await prisma.importLog.create({
    data: {
      sourceUrl,
      status: "PENDING",
    },
  });

  try {
    // Get product data either from scraping or direct input
    let scrapedData: ScrapedProduct;
    
    if (input.productData) {
      // Use provided structured data (recommended approach)
      scrapedData = validateProductData(input.productData);
    } else if (input.url) {
      // Attempt to scrape from URL (will likely fail due to bot protection)
      scrapedData = await scrapeAliExpress(input.url);
    } else {
      throw new Error('Either url or productData is required');
    }
    
    const productData = scrapedData;

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

    // Download and save images locally
    let imageUrls = productData.images || [];
    const validImageUrls = imageUrls.filter(url => isValidImageUrl(url));
    
    let localImagePaths: string[] = [];
    if (validImageUrls.length > 0) {
      console.log(`Downloading ${validImageUrls.length} images for product ${slug}...`);
      localImagePaths = await downloadProductImages(validImageUrls, slug);
      console.log(`Successfully processed images for ${slug}`);
    }

    // Get or create default category
    // Try to find the category from scraped data, or use a default
    const categorySlug = productData.category || "survie-navigation";
    let category = await prisma.category.findFirst({
      where: { slug: categorySlug },
    });

    if (!category) {
      // If category doesn't exist, use the "Survie & Navigation" category as fallback
      category = await prisma.category.findFirst({
        where: { slug: "survie-navigation" },
      });
      
      // If even the default doesn't exist, create it
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: "Survie & Navigation",
            slug: "survie-navigation",
            description: "Équipements de survie et navigation pour explorateurs",
          },
        });
      }
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
        sourceUrl,
        categoryId: category.id,
        stock: 100, // Default stock
        weight: productData.weight,
        active: true,
        featured: false,
      },
    });

    // Create product images with local paths
    if (localImagePaths.length > 0) {
      await prisma.productImage.createMany({
        data: localImagePaths.map((imagePath, index) => ({
          productId: product.id,
          url: imagePath,
          alt: productData.name,
          order: index,
        })),
      });
    }

    // Create product variants if provided
    if (productData.variants && productData.variants.length > 0) {
      await prisma.productVariant.createMany({
        data: productData.variants.map(variant => ({
          productId: product.id,
          name: variant.name,
          value: variant.value,
          price: variant.price,
          stock: variant.stock || 100,
          sku: variant.sku,
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
      url: sourceUrl,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        basePrice,
        sellingPrice,
        margin,
        imagesDownloaded: localImagePaths.length,
        variantsCreated: productData.variants?.length || 0,
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
      url: sourceUrl,
      error: errorMessage,
    };
  }
}
