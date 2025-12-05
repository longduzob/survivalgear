# Product Import System Documentation

## Overview

The product import system has been enhanced to support both automatic scraping (limited) and manual data import with image downloading capabilities.

## Key Features

### 1. **Image Download System** ✅
- Downloads images from external URLs
- Stores images locally in `/public/products/[slug]/`
- Automatic fallback to original URL if download fails
- Supports AliExpress CDN and other image sources

### 2. **Variant Support** ✅
- Import real product variants (colors, sizes, quantities)
- Flexible variant schema (name/value pairs)
- Automatic creation of ProductVariant records

### 3. **Flexible Import API** ✅
- Supports legacy URL-based import
- **Recommended**: Structured data import with full control
- Batch import (up to 50 products)

## Limitations of Real AliExpress Scraping

### Why Real Scraping Is Challenging

AliExpress implements multiple protection layers:

1. **Cloudflare Protection**
   - Bot detection and blocking
   - CAPTCHA challenges
   - IP-based rate limiting

2. **JavaScript Rendering**
   - Heavy client-side rendering
   - Requires headless browser (Puppeteer/Playwright)
   - Dynamic content loading

3. **Anti-Bot Measures**
   - Browser fingerprinting
   - TLS fingerprinting
   - Behavioral analysis

4. **Legal/TOS Issues**
   - Automated scraping violates AliExpress Terms of Service
   - Risk of account bans and legal action

### What You Would Need for Real Scraping

- **Paid Scraping Services**: ScraperAPI, Bright Data, Oxylabs ($50-500/month)
- **Residential Proxies**: Rotate IPs to avoid blocks ($100-300/month)
- **CAPTCHA Solving**: 2captcha, Anti-Captcha ($1-3 per 1000 CAPTCHAs)
- **Headless Browsers**: Puppeteer with stealth plugins
- **Maintenance**: Regular updates as AliExpress changes their site

**Total Cost**: $150-800/month for reliable scraping infrastructure

## Recommended Approach: Manual Import with Structured Data

Instead of automatic scraping, use the structured data import API:

### API Endpoint

```
POST /api/admin/import
```

### Request Format (Recommended)

```json
{
  "products": [
    {
      "productData": {
        "name": "Waterproof Camping Tent 2-Person",
        "description": "High-quality waterproof tent perfect for camping...",
        "price": 45.50,
        "images": [
          "https://ae01.alicdn.com/kf/S1234567890.jpg",
          "https://ae01.alicdn.com/kf/S0987654321.jpg"
        ],
        "brand": "OutdoorPro",
        "category": "tentes-abris",
        "variants": [
          { "name": "Color", "value": "Green" },
          { "name": "Color", "value": "Orange" },
          { "name": "Size", "value": "2-person" },
          { "name": "Size", "value": "4-person" }
        ],
        "weight": 2.5
      },
      "url": "https://www.aliexpress.com/item/1005001234567890.html"
    }
  ]
}
```

### Legacy Format (URL-based, limited success)

```json
{
  "urls": [
    "https://www.aliexpress.com/item/1005001234567890.html"
  ]
}
```

**Note**: URL-based import will likely fail due to bot protection. Use structured data instead.

### Response

```json
{
  "success": true,
  "results": [
    {
      "success": true,
      "url": "https://www.aliexpress.com/item/1005001234567890.html",
      "product": {
        "id": "clx1234567890",
        "name": "Waterproof Camping Tent 2-Person",
        "slug": "waterproof-camping-tent-2-person",
        "basePrice": 45.50,
        "sellingPrice": 113.74,
        "margin": 150.0,
        "imagesDownloaded": 2,
        "variantsCreated": 4
      }
    }
  ],
  "summary": {
    "total": 1,
    "succeeded": 1,
    "failed": 0
  }
}
```

## How to Manually Gather Product Data

Since automatic scraping is not reliable, here's how to manually collect product data:

### Step 1: Find Products on AliExpress

1. Browse AliExpress and find products you want to import
2. Open the product page in your browser

### Step 2: Extract Product Information

Open browser DevTools (F12) and run this in the Console:

```javascript
// Extract product data from AliExpress page
const productData = {
  name: document.querySelector('h1')?.textContent?.trim(),
  price: parseFloat(document.querySelector('.product-price-value')?.textContent?.replace(/[^0-9.]/g, '')),
  description: document.querySelector('.product-description')?.textContent?.trim(),
  images: Array.from(document.querySelectorAll('.images-view-item img')).map(img => img.src),
};
console.log(JSON.stringify(productData, null, 2));
```

**Note**: Selectors may change. Inspect the page structure to find current selectors.

### Step 3: Extract Variants

Look for color/size options on the page and manually note them:

```javascript
{
  "variants": [
    { "name": "Color", "value": "Army Green" },
    { "name": "Color", "value": "Desert Tan" },
    { "name": "Size", "value": "One Size" }
  ]
}
```

### Step 4: Import Using API

Send a POST request to `/api/admin/import` with the collected data.

## Using the Import System

### Example: Import with cURL

```bash
curl -X POST http://localhost:3000/api/admin/import \
  -H "Content-Type: application/json" \
  -d '{
    "products": [{
      "productData": {
        "name": "Tactical Survival Knife",
        "description": "Professional grade tactical knife with sheath",
        "price": 15.99,
        "images": [
          "https://ae01.alicdn.com/kf/knife1.jpg",
          "https://ae01.alicdn.com/kf/knife2.jpg"
        ],
        "brand": "TacticalGear",
        "category": "outils-couteaux",
        "variants": [
          { "name": "Color", "value": "Black" },
          { "name": "Color", "value": "Silver" }
        ],
        "weight": 0.3
      }
    }]
  }'
```

### Example: Import with JavaScript

```javascript
async function importProduct(productData) {
  const response = await fetch('/api/admin/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      products: [{ productData }]
    })
  });
  
  const result = await response.json();
  console.log('Import result:', result);
}

// Usage
importProduct({
  name: "Camping Backpack 50L",
  description: "Large capacity hiking backpack",
  price: 35.00,
  images: [
    "https://ae01.alicdn.com/kf/backpack1.jpg"
  ],
  brand: "AdventurePack",
  category: "sacs-a-dos",
  variants: [
    { name: "Color", value: "Black" },
    { name: "Color", value: "Olive Green" }
  ],
  weight: 1.2
});
```

## Image Handling

### Automatic Download

When you import a product, images are automatically:

1. **Downloaded** from the provided URLs
2. **Stored** in `/public/products/[slug]/image-0.jpg`, `image-1.jpg`, etc.
3. **Referenced** in the database with local paths

### Fallback Behavior

If image download fails (network error, invalid URL):
- The original URL is stored instead
- Product import continues successfully
- You can manually fix images later

### Supported Image Sources

- AliExpress CDN (ae01.alicdn.com, ae04.alicdn.com)
- Direct image URLs (.jpg, .jpeg, .png, .gif, .webp)
- Any publicly accessible image URL

## Pricing System

The system automatically calculates selling prices with dynamic margins:

- **€0-10**: 3.0x multiplier (~200% margin)
- **€10-30**: 2.5x multiplier (~150% margin)
- **€30-100**: 2.0x multiplier (~100% margin)
- **€100+**: 1.5x multiplier (~50% margin)

All prices are rounded to .99 format (e.g., 24.99, 49.99).

## Categories

### Available Categories

Products are assigned to these categories (auto-created if missing):

- `tentes-abris` - Tentes & Abris
- `sacs-a-dos` - Sacs à Dos
- `outils-couteaux` - Outils & Couteaux
- `eclairage` - Éclairage
- `cuisine-eau` - Cuisine & Eau
- `survie-navigation` - Survie & Navigation (default)

## Troubleshooting

### Import Fails with "Bot Protection" Error

**Problem**: Attempting to scrape AliExpress URL directly

**Solution**: Use structured data import instead of URL scraping

### Images Not Displaying

**Problem**: Image download failed or incorrect path

**Solution**: 
1. Check `/public/products/[slug]/` directory exists
2. Verify image files were downloaded
3. Check browser console for image load errors
4. Ensure Next.js image configuration includes the domain

### Variants Not Showing

**Problem**: Variants not created during import

**Solution**:
1. Ensure `variants` array is included in productData
2. Check variant name/value format is correct
3. Verify variants were saved (check database)

## Future Enhancements

Potential improvements for the import system:

1. **Browser Extension**
   - Chrome/Firefox extension to extract product data
   - One-click import from AliExpress pages
   - Automatic variant detection

2. **CSV Import**
   - Bulk import from CSV files
   - Template generator

3. **Image Optimization**
   - Automatic resizing and compression
   - WebP conversion
   - Thumbnail generation

4. **Scheduled Imports**
   - Automated import from saved URLs
   - Price monitoring and updates

5. **Third-Party Integrations**
   - Paid scraping service integration
   - Dropshipping platform APIs

## Security Notes

- Authentication is currently disabled for initial setup
- Re-enable auth in production (see `route.ts` comments)
- Validate all input data before import
- Rate limit the import endpoint
- Monitor for abuse (spam imports)

## See Also

- [Pricing System](../lib/pricing.ts)
- [Scraper Implementation](../lib/scraper.ts)
- [Image Downloader](../lib/imageDownloader.ts)
- [Import API Route](../app/api/admin/import/route.ts)
