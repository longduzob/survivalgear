# Usage Examples

## Quick Start

### Example 1: Single Product Import

```bash
python scraper_playwright.py "https://www.aliexpress.com/item/1234567890.html"
```

**Output:**
```
================================================================================
ALIEXPRESS PLAYWRIGHT SCRAPER
================================================================================
URLs to process: 1
Headless mode: True
================================================================================


################################################################################
# PRODUCT 1/1
################################################################################

============================================================
PROCESSING PRODUCT
============================================================
Scraping: https://www.aliexpress.com/item/1234567890.html
Attempt: 1/3
============================================================
✓ Successfully extracted product data
  Name: Couteau de Survie Tactique Multifonction...
  Price: €8.50
  Images: 6

============================================================
PRICING CALCULATION
============================================================
Base price:    8.50€
Selling price: 24.99€
Margin:        194.0%

============================================================
DOWNLOADING IMAGES
============================================================
Downloading image 1/6...
Downloading image 2/6...
...
✓ Downloaded 6 images

✓ Logged to imports-log.txt

============================================================
✓ PRODUCT PROCESSED SUCCESSFULLY
============================================================

✓ Saved 1 products to output/products.json
```

### Example 2: Batch Import from File

Create `links.txt`:
```text
https://www.aliexpress.com/item/1234567890.html
https://fr.aliexpress.com/item/9876543210.html
https://www.aliexpress.com/item/5555555555.html
```

Run:
```bash
python scraper_playwright.py --file links.txt
```

### Example 3: Visible Mode (Debugging)

```bash
python scraper_playwright.py --visible "https://www.aliexpress.com/item/123.html"
```

This opens a visible browser window so you can see what the scraper is doing.

## Viewing Results

### Check Import Log

```bash
cat imports-log.txt
```

**Output:**
```
# Product Import Log
# Format: [DATE] URL | PRODUCT NAME | BASE PRICE | SELLING PRICE | MARGIN %
[2025-01-15 14:32] https://aliexpress.com/item/123.html | Couteau Survie Pro | 8.50€ | 24.99€ | 194%
[2025-01-15 14:33] https://aliexpress.com/item/456.html | Tente 2 Places | 85.00€ | 169.99€ | 100%
[2025-01-15 14:35] https://aliexpress.com/item/789.html | Sac à Dos 40L | 25.00€ | 62.99€ | 152%
```

### View Products JSON

```bash
cat output/products.json
```

**Output:**
```json
[
  {
    "name": "Couteau de Survie Tactique Multifonction",
    "slug": "couteau-de-survie-tactique-multifonction",
    "price": 24.99,
    "comparePrice": null,
    "description": "Couteau de survie professionnel...",
    "brand": "Generic",
    "stock": 100,
    "featured": false,
    "active": true,
    "images": [
      {
        "url": "/products/couteau-de-survie-tactique-multifonction/0.jpg",
        "alt": "Couteau de Survie Tactique Multifonction",
        "order": 0
      }
    ],
    "variants": [
      {
        "name": "Color",
        "options": ["Black", "Green", "Orange"]
      }
    ],
    "category": "outdoor",
    "specifications": {
      "Material": "Stainless Steel",
      "Length": "25cm",
      "Weight": "200g"
    }
  }
]
```

### Check Downloaded Images

```bash
ls -la public/products/couteau-de-survie-tactique-multifonction/
```

**Output:**
```
total 560
-rw-r--r-- 1 user user 89234 Jan 15 14:32 0.jpg
-rw-r--r-- 1 user user 92145 Jan 15 14:32 1.jpg
-rw-r--r-- 1 user user 87921 Jan 15 14:32 2.jpg
-rw-r--r-- 1 user user 91034 Jan 15 14:32 3.jpg
-rw-r--r-- 1 user user 88567 Jan 15 14:32 4.jpg
-rw-r--r-- 1 user user 90234 Jan 15 14:32 5.jpg
```

## Advanced Usage

### Test Pricing Calculation

```bash
python3 << 'EOF'
from pricing import calculate_selling_price, calculate_margin_percentage, format_price

prices = [5, 8.50, 20, 45, 85, 100, 150]

for base in prices:
    selling = calculate_selling_price(base)
    margin = calculate_margin_percentage(base, selling)
    print(f"{format_price(base)} → {format_price(selling)} ({margin:.0f}% margin)")
EOF
```

**Output:**
```
5.00€ → 14.99€ (200% margin)
8.50€ → 24.99€ (194% margin)
20.00€ → 49.99€ (150% margin)
45.00€ → 89.99€ (100% margin)
85.00€ → 169.99€ (100% margin)
100.00€ → 169.99€ (70% margin)
150.00€ → 254.99€ (70% margin)
```

### Verify Installation

```bash
python3 test_scraper_structure.py
```

**Output:**
```
======================================================================
TEST 1: Checking imports
======================================================================
✓ pricing module imported successfully
✓ config module imported successfully
✓ pricing functions imported successfully

======================================================================
✓✓✓ ALL TESTS PASSED ✓✓✓
======================================================================
```

## Common Workflows

### Workflow 1: Daily Product Import

```bash
#!/bin/bash
# daily_import.sh

cd /path/to/survivalgear/tools/product-importer

# Run the scraper
python scraper_playwright.py --file links.txt

# Check if successful
if [ $? -eq 0 ]; then
    echo "✓ Import successful"
    
    # Import to database
    cd ../..
    node tools/product-importer/import-to-db.js
    
    # Backup the log
    cp tools/product-importer/imports-log.txt backups/imports-$(date +%Y%m%d).txt
else
    echo "✗ Import failed"
    exit 1
fi
```

### Workflow 2: Test Single Product First

```bash
# Test with one product in visible mode
python scraper_playwright.py --visible "https://aliexpress.com/item/123.html"

# If successful, run full batch
python scraper_playwright.py --file links.txt
```

### Workflow 3: Monitor Import Log

```bash
# Watch log in real-time
tail -f imports-log.txt

# Count imports by date
grep "2025-01-15" imports-log.txt | wc -l

# Find products with high margins
awk -F'|' '$5 > 150 {print $2, $5}' imports-log.txt
```

## Troubleshooting Examples

### Issue: Browser Not Found

```bash
# Reinstall Playwright browsers
playwright install chromium --force
```

### Issue: Timeout Errors

Increase timeout in the scraper or try with visible mode:
```bash
python scraper_playwright.py --visible "URL"
```

### Issue: No Images Downloaded

Check the images directory exists:
```bash
mkdir -p ../../public/products
ls -la ../../public/products/
```

### Issue: Price Extraction Fails

The scraper will use the fallback price from `config.py`. Check the logs:
```bash
grep "Warning: Could not extract price" /tmp/scraper.log
```

## Integration Examples

### Example: Custom Price Adjustment

```python
from pricing import calculate_selling_price

# Get base price
base_price = 25.00

# Calculate with standard formula
selling_price = calculate_selling_price(base_price)

# Apply custom discount for promotion
promo_price = selling_price * 0.9  # 10% off
print(f"Base: €{base_price}, Selling: €{selling_price:.2f}, Promo: €{promo_price:.2f}")
```

### Example: Filter Products by Margin

```python
import json

with open('output/products.json', 'r') as f:
    products = json.load(f)

# Find products with high margins (assuming base price stored)
high_margin = [p for p in products if p.get('margin', 0) > 150]

print(f"Found {len(high_margin)} products with >150% margin")
```

## Performance Tips

1. **Batch Processing**: Process multiple products in one session to reuse browser
2. **Headless Mode**: Always use headless mode in production (default)
3. **Image Quality**: Adjust `IMAGE_QUALITY` in config.py if images are too large
4. **Retry Logic**: The scraper automatically retries failed requests 3 times
5. **Rate Limiting**: Add delays between products (already implemented)

## Next Steps

After successful import:

1. **Review products.json**: Check that all data looks correct
2. **Verify images**: Make sure images are downloaded and optimized
3. **Check log**: Review imports-log.txt for pricing accuracy
4. **Import to DB**: Run `node import-to-db.js` to add products to database
5. **Test on site**: Verify products display correctly on the website
