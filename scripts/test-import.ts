/**
 * Test script for product import functionality
 * Tests image downloading and data import
 */

import { createProductData } from '../lib/scraper';
import { downloadProductImages, isValidImageUrl } from '../lib/imageDownloader';

async function testImageDownloader() {
  console.log('🧪 Testing Image Downloader...\n');

  // Test URL validation
  console.log('Testing URL validation:');
  console.log('  Valid image URL:', isValidImageUrl('https://ae01.alicdn.com/kf/S123456.jpg'));
  console.log('  Valid AliExpress URL:', isValidImageUrl('https://ae04.alicdn.com/img/product.png'));
  console.log('  Invalid URL:', isValidImageUrl('not-a-url'));
  console.log('  Non-image URL:', isValidImageUrl('https://example.com/page.html'));
  console.log('');

  // Test image download from Unsplash (reliable test source)
  console.log('Testing image download:');
  const testImages = [
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
  ];
  
  try {
    const localPaths = await downloadProductImages(testImages, 'test-product');
    console.log('  ✅ Downloaded images:');
    localPaths.forEach((path, i) => {
      console.log(`    ${i + 1}. ${path}`);
    });
    console.log('');
  } catch (error) {
    console.error('  ❌ Download failed:', error);
  }
}

async function testProductDataCreation() {
  console.log('🧪 Testing Product Data Creation...\n');

  try {
    const productData = createProductData({
      name: 'Test Survival Tent',
      description: 'A high-quality waterproof tent perfect for camping and survival situations.',
      price: 45.50,
      images: [
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
      ],
      brand: 'OutdoorPro',
      category: 'tentes-abris',
      variants: [
        { name: 'Color', value: 'Green' },
        { name: 'Color', value: 'Orange' },
        { name: 'Size', value: '2-person' },
        { name: 'Size', value: '4-person' },
      ],
      weight: 2.5,
    });

    console.log('  ✅ Created product data:');
    console.log('    Name:', productData.name);
    console.log('    Price:', productData.price);
    console.log('    Brand:', productData.brand);
    console.log('    Category:', productData.category);
    console.log('    Images:', productData.images.length);
    console.log('    Variants:', productData.variants?.length);
    console.log('    Weight:', productData.weight, 'kg');
    console.log('');
  } catch (error) {
    console.error('  ❌ Product data creation failed:', error);
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('Testing Product Import System');
  console.log('='.repeat(60));
  console.log('');

  await testImageDownloader();
  await testProductDataCreation();

  console.log('='.repeat(60));
  console.log('✅ All tests completed');
  console.log('='.repeat(60));
}

main().catch(console.error);
