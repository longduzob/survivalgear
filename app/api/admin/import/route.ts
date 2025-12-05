import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateSellingPrice } from "@/lib/pricing";

// Constants for product import
const COMPARE_PRICE_MULTIPLIER = 1.3;
const DEFAULT_VARIANT_PRICE = 0;
const DEFAULT_VARIANT_STOCK = 100;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products } = body;

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: "Products array required" }, { status: 400 });
    }

    const results = [];

    for (const productData of products) {
      const { name, price, description, images, brand, category, variants } = productData;

      if (!name || !price) {
        results.push({ success: false, error: "Name and price required" });
        continue;
      }

      // Generate base slug
      let slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Ensure slug uniqueness
      let uniqueSlug = slug;
      let counter = 1;
      while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }

      // Calculate selling price with margin
      const sellingPrice = calculateSellingPrice(price);

      // Find or create category
      let categoryRecord = null;
      if (category) {
        categoryRecord = await prisma.category.findUnique({ where: { slug: category } });
      }
      
      // If no category found, get or create a default one
      if (!categoryRecord) {
        categoryRecord = await prisma.category.findFirst({
          where: { slug: 'survie-navigation' },
        });
        
        if (!categoryRecord) {
          categoryRecord = await prisma.category.create({
            data: {
              name: 'Survie & Navigation',
              slug: 'survie-navigation',
              description: 'Équipements de survie et navigation',
            },
          });
        }
      }

      // Create product
      const product = await prisma.product.create({
        data: {
          name,
          slug: uniqueSlug,
          description: description || '',
          price: sellingPrice,
          basePrice: price,
          comparePrice: sellingPrice * COMPARE_PRICE_MULTIPLIER,
          brand: brand || undefined,
          categoryId: categoryRecord.id,
          active: true,
          images: {
            create: (images || []).map((url: string, index: number) => ({
              url,
              alt: name,
              order: index,
            })),
          },
          variants: {
            create: (variants || []).map((v: { name: string; value: string }) => ({
              name: v.name,
              value: v.value,
              price: DEFAULT_VARIANT_PRICE,
              stock: DEFAULT_VARIANT_STOCK,
            })),
          },
        },
      });

      results.push({ success: true, product: { id: product.id, name: product.name, price: product.price } });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
