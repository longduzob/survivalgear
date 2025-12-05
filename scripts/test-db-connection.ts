/**
 * Test database connection and verify setup
 * Run with: npx tsx scripts/test-db-connection.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing database connection...\n');

  try {
    // Test connection
    await prisma.$connect();
    console.log('✓ Database connection successful\n');

    // Count categories
    const categoryCount = await prisma.category.count();
    console.log(`Categories in database: ${categoryCount}`);

    if (categoryCount > 0) {
      const categories = await prisma.category.findMany({
        select: {
          name: true,
          slug: true,
          _count: {
            select: { products: true }
          }
        }
      });
      
      console.log('\nCategories:');
      categories.forEach(cat => {
        console.log(`  - ${cat.name} (${cat.slug}): ${cat._count.products} products`);
      });
    } else {
      console.log('\n⚠️  No categories found. Run: npm run seed\n');
    }

    // Count products
    const productCount = await prisma.product.count();
    console.log(`\nProducts in database: ${productCount}`);

    if (productCount > 0) {
      const products = await prisma.product.findMany({
        take: 5,
        select: {
          name: true,
          price: true,
          category: {
            select: { name: true }
          }
        }
      });
      
      console.log('\nSample products:');
      products.forEach(product => {
        const categoryName = product.category?.name || 'No category';
        console.log(`  - ${product.name} (${product.price}€) - ${categoryName}`);
      });
    }

    console.log('\n✓ Database test completed successfully');
  } catch (error) {
    console.error('✗ Database test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
