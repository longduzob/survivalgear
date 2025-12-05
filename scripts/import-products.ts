#!/usr/bin/env tsx
/**
 * Product import script
 * Demonstrates how to import products using the enhanced API
 * 
 * Usage:
 *   npm run dev (in another terminal)
 *   npx tsx scripts/import-products.ts
 */

import fs from 'fs';
import path from 'path';

const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const IMPORT_FILE = path.join(__dirname, 'example-import.json');

async function importProducts() {
  console.log('🚀 Starting product import...\n');

  // Read import file
  const importData = JSON.parse(fs.readFileSync(IMPORT_FILE, 'utf-8'));
  
  console.log(`📦 Importing ${importData.products.length} products:\n`);
  importData.products.forEach((p: any, i: number) => {
    console.log(`  ${i + 1}. ${p.productData.name}`);
  });
  console.log('');

  try {
    // Send import request
    console.log('⏳ Sending import request...');
    const response = await fetch(`${API_URL}/api/admin/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(importData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    
    console.log('\n✅ Import completed!\n');
    console.log('Summary:');
    console.log(`  Total: ${result.summary.total}`);
    console.log(`  Succeeded: ${result.summary.succeeded}`);
    console.log(`  Failed: ${result.summary.failed}`);
    console.log('');

    // Show details for each product
    result.results.forEach((r: any, i: number) => {
      if (r.success) {
        console.log(`✅ Product ${i + 1}: ${r.product.name}`);
        console.log(`   Slug: ${r.product.slug}`);
        console.log(`   Base Price: ${r.product.basePrice.toFixed(2)}€`);
        console.log(`   Selling Price: ${r.product.sellingPrice.toFixed(2)}€`);
        console.log(`   Margin: ${r.product.margin.toFixed(1)}%`);
        console.log(`   Images Downloaded: ${r.product.imagesDownloaded}`);
        console.log(`   Variants Created: ${r.product.variantsCreated}`);
        console.log(`   URL: ${API_URL}/products/${r.product.slug}`);
      } else {
        console.log(`❌ Product ${i + 1}: Failed`);
        console.log(`   Error: ${r.error}`);
      }
      console.log('');
    });

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  importProducts();
}

export { importProducts };
