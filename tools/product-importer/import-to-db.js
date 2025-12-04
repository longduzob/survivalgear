#!/usr/bin/env node
/**
 * Import products from products.json into PostgreSQL database via Prisma
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('='.repeat(60));
  console.log('SurvivalGear - Import Products to Database');
  console.log('='.repeat(60));
  console.log();

  // Read products.json
  const productsFile = path.join(__dirname, 'output', 'products.json');
  
  if (!fs.existsSync(productsFile)) {
    console.error('❌ Error: products.json not found!');
    console.error('Run importer.py first to generate products.json');
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  
  console.log(`Found ${products.length} products to import\n`);

  let imported = 0;
  let skipped = 0;

  for (const product of products) {
    try {
      // Find or create category
      let category = await prisma.category.findUnique({
        where: { slug: product.category }
      });

      if (!category) {
        category = await prisma.category.create({
          data: {
            name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
            slug: product.category,
          }
        });
        console.log(`✓ Created category: ${category.name}`);
      }

      // Check if product already exists
      const existing = await prisma.product.findUnique({
        where: { slug: product.slug }
      });

      if (existing) {
        console.log(`⊘ Skipped (exists): ${product.name}`);
        skipped++;
        continue;
      }

      // Create product
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description || '',
          brand: product.brand,
          price: product.price,
          comparePrice: product.comparePrice,
          categoryId: category.id,
          stock: product.stock || 100,
          weight: product.weight,
          featured: product.featured || false,
          active: product.active !== false,
          images: {
            create: product.images.map((img) => ({
              url: img.url,
              alt: img.alt || product.name,
              order: img.order || 0,
            }))
          },
          variants: {
            create: product.variants?.map((v) => ({
              name: v.name,
              value: v.value,
              stock: v.stock || 50,
            })) || []
          }
        },
        include: {
          images: true,
          variants: true,
        }
      });

      console.log(`✓ Imported: ${createdProduct.name} (${createdProduct.images.length} images, ${createdProduct.variants.length} variants)`);
      imported++;

    } catch (error) {
      console.error(`❌ Error importing ${product.name}:`, error.message);
      skipped++;
    }
  }

  console.log();
  console.log('='.repeat(60));
  console.log(`✓ Import complete!`);
  console.log(`  Imported: ${imported}`);
  console.log(`  Skipped: ${skipped}`);
  console.log('='.repeat(60));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
