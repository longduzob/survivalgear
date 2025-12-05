# Product Import Feature

## Overview

The product import feature allows administrators to easily import products from AliExpress by simply pasting product URLs. The system automatically:
- Scrapes product information
- Calculates optimal selling prices with dynamic margins
- Creates products in the database
- Logs all import attempts for tracking

## How to Use

### Access the Import Page

1. Log in as an administrator
2. Navigate to the Admin Dashboard at `/admin`
3. Click on "📦 Importer depuis AliExpress" button
4. Or go directly to `/admin/import`

### Import Products

1. **Paste URLs**: Copy AliExpress product URLs and paste them in the textarea (one URL per line)
2. **Click Import**: Press the "🚀 Importer les produits" button
3. **Monitor Progress**: Watch as products are imported with real-time status updates
4. **Review Results**: See success/failure status with pricing details

### Example URLs Format

```
https://aliexpress.com/item/123.html
https://www.aliexpress.com/item/456.html
https://fr.aliexpress.com/item/789.html
```

## Pricing Logic

The system uses dynamic pricing based on the base price from AliExpress:

| Base Price Range | Multiplier | Example |
|-----------------|------------|---------|
| €0 - €10 | 3.0x → 2.9x (gradual) | €5 → €14.99 |
| €10 - €30 | 2.5x | €20 → €49.99 |
| €30 - €100 | 2.0x | €45 → €89.99 |
| €100+ | 1.5x - 1.7x | €100 → €169.99 |

All prices are automatically rounded to .99 format (e.g., 24.99, 49.99).

## Features

### Import Tracking
- Every import attempt is logged in the database
- Track success/failure rates
- Store original prices and calculated margins
- Error messages for failed imports

### Product Information
- **sourceUrl**: Original AliExpress URL
- **basePrice**: Original price before markup
- **price**: Calculated selling price
- Product name, description, images, and brand

### Security
- ✅ Admin authentication required
- ✅ Rate limiting (max 50 URLs per request)
- ✅ URL validation (AliExpress only)
- ✅ SQL injection protection via Prisma

## Technical Details

### API Endpoint
```
POST /api/admin/import
```

**Request Body:**
```json
{
  "urls": [
    "https://aliexpress.com/item/123.html",
    "https://aliexpress.com/item/456.html"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "success": true,
      "url": "https://aliexpress.com/item/123.html",
      "product": {
        "id": "clx...",
        "name": "Product Name",
        "slug": "product-name",
        "basePrice": 20.00,
        "sellingPrice": 49.99,
        "margin": 150.0
      }
    }
  ],
  "summary": {
    "total": 2,
    "succeeded": 1,
    "failed": 1
  }
}
```

### Files Created/Modified

**New Files:**
- `app/admin/import/page.tsx` - Import UI interface
- `app/api/admin/import/route.ts` - Import API endpoint
- `lib/pricing.ts` - Pricing calculation logic
- `lib/scraper.ts` - Scraping utilities

**Modified Files:**
- `prisma/schema.prisma` - Added ImportLog model and Product fields
- `app/admin/page.tsx` - Added import button to dashboard

## Limitations & Future Enhancements

### Current Limitations
- Mock scraper used (returns placeholder data)
- No image downloading to local storage
- Sequential processing (one URL at a time)
- No retry mechanism for failed imports

### Suggested Enhancements
1. **Real Scraping**: Integrate Puppeteer/Playwright or use ScraperAPI
2. **Image Management**: Download and store images locally
3. **Batch Processing**: Parallel imports with queue system
4. **Import History**: View past imports with filtering
5. **Scheduling**: Schedule regular imports for price updates
6. **Notifications**: Email alerts for import completion
7. **CSV Upload**: Support CSV file uploads with multiple products

## Database Schema

### ImportLog Model
```prisma
model ImportLog {
  id          String       @id @default(cuid())
  sourceUrl   String
  productName String?
  basePrice   Float?
  sellingPrice Float?
  margin      Float?       // Margin percentage
  status      ImportStatus @default(PENDING)
  errorMessage String?     @db.Text
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}
```

### Product Model Extensions
```prisma
model Product {
  // ... existing fields ...
  sourceUrl   String?  // Original URL from import
  basePrice   Float?   // Original price before margin
}
```

## Troubleshooting

### "Unauthorized" Error
- Ensure you're logged in as an admin
- Check that your user role is set to `ADMIN` in the database

### "Invalid AliExpress URL" Error
- Verify URLs contain "aliexpress" in the domain
- Remove any extra spaces or line breaks

### Import Fails Silently
- Check browser console for JavaScript errors
- Verify API endpoint is accessible
- Check database connection

### Products Not Appearing
- Verify category exists in database
- Check that products are marked as `active: true`
- Review ImportLog table for error messages

## Support

For issues or questions:
1. Check the ImportLog table in the database
2. Review server logs for API errors
3. Verify Prisma schema is up to date with `npx prisma generate`
