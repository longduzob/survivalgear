# Product Import API

Simple JSON-based product import API for SurvivalGear.

## Endpoint

`POST /api/admin/import`

## Request Format

```json
{
  "products": [
    {
      "name": "Product Name",
      "price": 29.99,
      "description": "Product description",
      "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      "brand": "Brand Name",
      "category": "category-slug",
      "variants": [
        {
          "name": "Color",
          "value": "Red"
        },
        {
          "name": "Size",
          "value": "Large"
        }
      ]
    }
  ]
}
```

## Fields

### Required Fields
- `name` (string) - Product name
- `price` (number) - Base price in EUR

### Optional Fields
- `description` (string) - Product description
- `images` (array) - Array of image URLs
- `brand` (string) - Brand name
- `category` (string) - Category slug (must exist in database)
- `variants` (array) - Product variants (colors, sizes, etc.)

## Response

```json
{
  "success": true,
  "results": [
    {
      "success": true,
      "product": {
        "id": "clx123456",
        "name": "Product Name",
        "price": 59.99
      }
    }
  ]
}
```

## Notes

- The API automatically calculates the selling price based on the base price using dynamic margins
- Products are assigned to default category "survie-navigation" if category is not specified or not found
- Unique slugs are generated automatically from product names
- All products are set as active by default
