# Scripts Directory

This directory contains utility scripts for product management and testing.

## Available Scripts

### 1. `test-import.ts`

Tests the image download and product data creation functionality.

```bash
npx tsx scripts/test-import.ts
```

This script:
- Tests URL validation for images
- Tests image download functionality
- Tests product data creation with variants

### 2. `import-products.ts`

Imports products from the example JSON file into the database.

```bash
# Make sure the dev server is running first
npm run dev

# In another terminal:
npx tsx scripts/import-products.ts
```

This script:
- Reads product data from `example-import.json`
- Sends import requests to the API
- Downloads images and creates variants
- Shows detailed import results

### 3. `example-import.json`

Example product data file with 5 sample products:
1. Camping Tent (2-person)
2. Tactical Survival Knife
3. Military Backpack (50L)
4. LED Headlamp
5. Portable Gas Stove

You can use this as a template for creating your own product imports.

## Creating Your Own Import Files

Create a JSON file following this structure:

```json
{
  "products": [
    {
      "productData": {
        "name": "Product Name",
        "description": "Detailed description...",
        "price": 45.50,
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ],
        "brand": "Brand Name",
        "category": "category-slug",
        "variants": [
          { "name": "Color", "value": "Red" },
          { "name": "Size", "value": "Large" }
        ],
        "weight": 1.5
      },
      "url": "https://source-url.com/product"
    }
  ]
}
```

### Available Categories

- `tentes-abris` - Tentes & Abris
- `sacs-a-dos` - Sacs à Dos
- `outils-couteaux` - Outils & Couteaux
- `eclairage` - Éclairage
- `cuisine-eau` - Cuisine & Eau
- `survie-navigation` - Survie & Navigation

## Workflow for Adding Products

1. **Find products** on AliExpress or other sources
2. **Extract data** manually (see IMPORT_SYSTEM.md for browser DevTools method)
3. **Create JSON file** with product data
4. **Run import script** to add products to database
5. **Verify** products appear on the website

## Tips

- Images will be downloaded and stored locally in `/public/products/[slug]/`
- If image download fails, the original URL is used as fallback
- Prices are automatically calculated with margins
- Products are automatically assigned unique slugs
- Variants are optional but recommended for better UX

## Troubleshooting

### "Connection refused" error
- Make sure the dev server is running (`npm run dev`)
- Check that the API is accessible at `http://localhost:3000`

### Images not downloading
- Check internet connectivity
- Verify image URLs are valid and accessible
- Check browser console for CORS issues

### Import fails
- Check JSON file syntax (use a JSON validator)
- Ensure all required fields are present (name, description, price)
- Check the API logs for detailed error messages

## See Also

- [Import System Documentation](../docs/IMPORT_SYSTEM.md)
- [Product Import API](../app/api/admin/import/route.ts)
