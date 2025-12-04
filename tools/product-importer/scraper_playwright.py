#!/usr/bin/env python3
"""
AliExpress Playwright Scraper for SurvivalGear
Automatically extracts all product information using Playwright
"""

import os
import sys
import json
import argparse
import random
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright, Page, Browser
from PIL import Image
from io import BytesIO
import requests

# Import local modules
import config
from pricing import calculate_selling_price, calculate_margin_percentage, format_price


class AliExpressPlaywrightScraper:
    """Scraper for AliExpress using Playwright for JavaScript rendering"""
    
    def __init__(self, headless: bool = True):
        self.headless = headless
        self.browser: Optional[Browser] = None
        self.context = None
        self.page: Optional[Page] = None
        
    def __enter__(self):
        """Context manager entry"""
        self.start_browser()
        return self
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit"""
        self.close_browser()
        
    def start_browser(self):
        """Initialize Playwright browser"""
        self.playwright = sync_playwright().start()
        
        # Use Chromium with realistic user agent
        self.browser = self.playwright.chromium.launch(
            headless=self.headless,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
            ]
        )
        
        # Create context with realistic settings
        self.context = self.browser.new_context(
            user_agent=config.USER_AGENT,
            viewport={'width': 1920, 'height': 1080},
            locale='fr-FR',
            timezone_id='Europe/Paris',
        )
        
        # Block unnecessary resources to speed up
        self.context.route("**/*.{png,jpg,jpeg,gif,svg,mp4,webm,mp3,wav}", lambda route: route.abort())
        
        self.page = self.context.new_page()
        
    def close_browser(self):
        """Close Playwright browser"""
        if self.page:
            self.page.close()
        if self.context:
            self.context.close()
        if self.browser:
            self.browser.close()
        if hasattr(self, 'playwright'):
            self.playwright.stop()
    
    def random_delay(self, min_sec: float = 1.0, max_sec: float = 3.0):
        """Add random delay to mimic human behavior"""
        time.sleep(random.uniform(min_sec, max_sec))
    
    def scrape(self, url: str, retries: int = 3) -> Optional[Dict]:
        """
        Scrape product data from AliExpress URL
        
        Args:
            url: AliExpress product URL
            retries: Number of retry attempts on failure
            
        Returns:
            Dictionary with product data or None on failure
        """
        for attempt in range(retries):
            try:
                print(f"\n{'='*60}")
                print(f"Scraping: {url}")
                print(f"Attempt: {attempt + 1}/{retries}")
                print(f"{'='*60}")
                
                # Navigate to page
                self.page.goto(url, wait_until='domcontentloaded', timeout=30000)
                self.random_delay(2, 4)
                
                # Wait for product content to load
                try:
                    self.page.wait_for_selector('h1', timeout=10000)
                except:
                    print("Warning: Title selector timeout, continuing anyway...")
                
                # Extract product data
                product_data = {
                    'name': self._extract_name(),
                    'price': self._extract_price(),
                    'original_price': self._extract_original_price(),
                    'images': self._extract_images(),
                    'description': self._extract_description(),
                    'variants': self._extract_variants(),
                    'category': self._extract_category(),
                    'specifications': self._extract_specifications(),
                }
                
                # Validate required fields
                if not product_data['name'] or not product_data['price']:
                    raise ValueError("Missing required fields (name or price)")
                
                print(f"✓ Successfully extracted product data")
                print(f"  Name: {product_data['name'][:50]}...")
                print(f"  Price: €{product_data['price']:.2f}")
                print(f"  Images: {len(product_data['images'])}")
                
                return product_data
                
            except Exception as e:
                print(f"✗ Error on attempt {attempt + 1}: {e}")
                if attempt < retries - 1:
                    print(f"Retrying in 5 seconds...")
                    time.sleep(5)
                else:
                    print(f"Failed after {retries} attempts")
                    import traceback
                    traceback.print_exc()
                    return None
        
        return None
    
    def _extract_name(self) -> str:
        """Extract product name"""
        selectors = [
            'h1[data-pl="product-title"]',
            'h1.product-title-text',
            'h1',
            '[data-pl="product-title"]',
        ]
        
        for selector in selectors:
            try:
                element = self.page.query_selector(selector)
                if element:
                    text = element.inner_text().strip()
                    if text:
                        return text
            except:
                continue
        
        return "Unknown Product"
    
    def _extract_price(self) -> float:
        """Extract current product price"""
        selectors = [
            '[data-pl="product-price"]',
            '.product-price-value',
            '.price-current',
            '[class*="price"]',
        ]
        
        # Try selectors first
        for selector in selectors:
            try:
                elements = self.page.query_selector_all(selector)
                for element in elements:
                    text = element.inner_text()
                    price = self._parse_price(text)
                    if price and price > 0:
                        return price
            except:
                continue
        
        # Fallback: search in page content
        try:
            content = self.page.content()
            import re
            # Look for price patterns
            patterns = [
                r'€\s*(\d+[.,]\d{2})',
                r'(\d+[.,]\d{2})\s*€',
                r'\$\s*(\d+[.,]\d{2})',
                r'(\d+[.,]\d{2})\s*\$',
                r'US\s*\$\s*(\d+[.,]\d{2})',
            ]
            
            for pattern in patterns:
                matches = re.findall(pattern, content)
                if matches:
                    price_str = matches[0].replace(',', '.')
                    price = float(price_str)
                    if 0.01 < price < 10000:  # Reasonable price range
                        return price
        except:
            pass
        
        print("Warning: Could not extract price, using default")
        return 29.99
    
    def _extract_original_price(self) -> Optional[float]:
        """Extract original/crossed-out price if on sale"""
        selectors = [
            '[class*="original"]',
            '[class*="old-price"]',
            '[class*="compare"]',
            'del',
            's',
        ]
        
        for selector in selectors:
            try:
                elements = self.page.query_selector_all(selector)
                for element in elements:
                    text = element.inner_text()
                    price = self._parse_price(text)
                    if price and price > 0:
                        return price
            except:
                continue
        
        return None
    
    def _parse_price(self, text: str) -> Optional[float]:
        """Parse price from text string"""
        import re
        # Remove common currency symbols and text
        text = text.replace('€', '').replace('$', '').replace('USD', '').replace('EUR', '')
        text = text.replace('US', '').strip()
        
        # Find decimal number
        match = re.search(r'(\d+[.,]\d{2})', text)
        if match:
            price_str = match.group(1).replace(',', '.')
            try:
                return float(price_str)
            except:
                pass
        
        return None
    
    def _extract_images(self) -> List[str]:
        """Extract product image URLs"""
        images = []
        
        # Look for image gallery
        selectors = [
            'img[class*="magnifier"]',
            'img[class*="gallery"]',
            'img[class*="product"]',
            '.images-view-item img',
            '[class*="image-view"] img',
        ]
        
        for selector in selectors:
            try:
                elements = self.page.query_selector_all(selector)
                for element in elements:
                    src = element.get_attribute('src') or element.get_attribute('data-src')
                    if src and ('alicdn.com' in src or 'aliexpress' in src):
                        # Get high quality version
                        src = src.split('_')[0]  # Remove size suffix
                        if src.startswith('//'):
                            src = 'https:' + src
                        if src not in images:
                            images.append(src)
            except:
                continue
        
        # Limit to max images
        return images[:config.MAX_IMAGES_PER_PRODUCT]
    
    def _extract_description(self) -> str:
        """Extract product description"""
        selectors = [
            '[class*="product-description"]',
            '[class*="description"]',
            '[data-pl="product-description"]',
            '#product-description',
        ]
        
        for selector in selectors:
            try:
                element = self.page.query_selector(selector)
                if element:
                    text = element.inner_text().strip()
                    if len(text) > 20:  # Meaningful description
                        return text
            except:
                continue
        
        return ""
    
    def _extract_variants(self) -> List[Dict]:
        """Extract product variants (colors, sizes, etc.)"""
        variants = []
        
        # Look for variant selectors
        selectors = [
            '[class*="sku-property"]',
            '[class*="variation"]',
            '[class*="option"]',
        ]
        
        for selector in selectors:
            try:
                elements = self.page.query_selector_all(selector)
                for element in elements:
                    variant_name = element.query_selector('[class*="title"]')
                    if variant_name:
                        name = variant_name.inner_text().strip()
                        options = []
                        
                        option_elements = element.query_selector_all('[class*="item"]')
                        for opt in option_elements:
                            opt_text = opt.inner_text().strip()
                            if opt_text:
                                options.append(opt_text)
                        
                        if options:
                            variants.append({
                                'name': name,
                                'options': options
                            })
            except:
                continue
        
        return variants
    
    def _extract_category(self) -> str:
        """Extract category from breadcrumbs"""
        try:
            breadcrumbs = self.page.query_selector_all('[class*="breadcrumb"] a')
            if len(breadcrumbs) > 1:
                # Get last breadcrumb (most specific category)
                return breadcrumbs[-1].inner_text().strip().lower()
        except:
            pass
        
        return config.DEFAULT_CATEGORY
    
    def _extract_specifications(self) -> Dict[str, str]:
        """Extract product specifications/characteristics"""
        specs = {}
        
        selectors = [
            '[class*="specification"]',
            '[class*="property"]',
            '[class*="attribute"]',
        ]
        
        for selector in selectors:
            try:
                elements = self.page.query_selector_all(selector)
                for element in elements:
                    # Try to find key-value pairs
                    key_elem = element.query_selector('[class*="title"], [class*="label"], dt')
                    val_elem = element.query_selector('[class*="value"], [class*="desc"], dd')
                    
                    if key_elem and val_elem:
                        key = key_elem.inner_text().strip()
                        val = val_elem.inner_text().strip()
                        if key and val:
                            specs[key] = val
            except:
                continue
        
        return specs


def download_image(url: str, product_slug: str, index: int) -> Optional[str]:
    """Download and save product image"""
    try:
        # Re-enable image downloads for this specific request
        response = requests.get(url, headers=config.HEADERS, timeout=15)
        response.raise_for_status()
        
        # Create product directory
        product_dir = Path(config.IMAGES_DIR) / product_slug
        product_dir.mkdir(parents=True, exist_ok=True)
        
        # Process image
        img = Image.open(BytesIO(response.content))
        
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGB')
        
        # Save image
        filename = f"{index}.jpg"
        filepath = product_dir / filename
        img.save(filepath, 'JPEG', quality=config.IMAGE_QUALITY, optimize=True)
        
        # Return relative path
        return f"/products/{product_slug}/{filename}"
    
    except Exception as e:
        print(f"Error downloading image {url}: {e}")
        return None


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    import re
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')


def log_import(url: str, product_name: str, base_price: float, selling_price: float, margin: float):
    """Log import to imports-log.txt"""
    log_file = Path(__file__).parent / "imports-log.txt"
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    log_line = f"[{timestamp}] {url} | {product_name} | {format_price(base_price)} | {format_price(selling_price)} | {margin:.0f}%\n"
    
    # Append to log file
    with open(log_file, 'a', encoding='utf-8') as f:
        f.write(log_line)
    
    print(f"\n✓ Logged to imports-log.txt")


def process_product(url: str, scraper: AliExpressPlaywrightScraper) -> Optional[Dict]:
    """Process a single product URL"""
    print(f"\n{'='*80}")
    print(f"PROCESSING PRODUCT")
    print(f"{'='*80}")
    
    # Scrape product data
    product_data = scraper.scrape(url)
    if not product_data:
        print("✗ Failed to scrape product")
        return None
    
    # Get base price (use original price if available, otherwise current price)
    base_price = product_data.get('original_price') or product_data['price']
    
    # Calculate selling price with dynamic margin
    selling_price = calculate_selling_price(base_price)
    margin = calculate_margin_percentage(base_price, selling_price)
    
    print(f"\n{'='*60}")
    print(f"PRICING CALCULATION")
    print(f"{'='*60}")
    print(f"Base price:    {format_price(base_price)}")
    print(f"Selling price: {format_price(selling_price)}")
    print(f"Margin:        {margin:.1f}%")
    
    # Generate slug
    slug = slugify(product_data['name'])
    
    # Download images
    print(f"\n{'='*60}")
    print(f"DOWNLOADING IMAGES")
    print(f"{'='*60}")
    images = []
    for idx, img_url in enumerate(product_data['images']):
        print(f"Downloading image {idx + 1}/{len(product_data['images'])}...")
        local_path = download_image(img_url, slug, idx)
        if local_path:
            images.append({
                'url': local_path,
                'alt': product_data['name'],
                'order': idx
            })
    
    print(f"✓ Downloaded {len(images)} images")
    
    # Build product object
    product = {
        'name': product_data['name'],
        'slug': slug,
        'description': product_data.get('description', ''),
        'brand': 'Generic',
        'price': selling_price,
        'comparePrice': None,
        'stock': 100,
        'weight': None,
        'featured': False,
        'active': True,
        'images': images,
        'variants': product_data.get('variants', []),
        'category': product_data.get('category', config.DEFAULT_CATEGORY),
        'specifications': product_data.get('specifications', {}),
    }
    
    # Log import
    log_import(url, product_data['name'], base_price, selling_price, margin)
    
    print(f"\n{'='*80}")
    print(f"✓ PRODUCT PROCESSED SUCCESSFULLY")
    print(f"{'='*80}")
    
    return product


def save_products(products: List[Dict]):
    """Save products to JSON file"""
    output_dir = Path(config.OUTPUT_DIR)
    output_dir.mkdir(exist_ok=True)
    
    output_file = output_dir / "products.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Saved {len(products)} products to {output_file}")


def main():
    """Main function"""
    parser = argparse.ArgumentParser(
        description='AliExpress Product Scraper with Playwright',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Scrape single product
  python scraper_playwright.py "https://aliexpress.com/item/123.html"
  
  # Scrape multiple products from file
  python scraper_playwright.py --file links.txt
  
  # View import log
  cat imports-log.txt
        """
    )
    
    parser.add_argument('url', nargs='?', help='Product URL to scrape')
    parser.add_argument('--file', help='File containing URLs (one per line)')
    parser.add_argument('--headless', action='store_true', default=True, help='Run browser in headless mode (default)')
    parser.add_argument('--visible', action='store_true', help='Run browser in visible mode (for debugging)')
    
    args = parser.parse_args()
    
    # Validate arguments
    if not args.url and not args.file:
        parser.error("Must provide either URL or --file")
    
    # Collect URLs to process
    urls = []
    if args.url:
        urls.append(args.url)
    
    if args.file:
        file_path = Path(args.file)
        if not file_path.exists():
            print(f"✗ Error: File not found: {args.file}")
            sys.exit(1)
        
        with open(file_path, 'r') as f:
            file_urls = [line.strip() for line in f if line.strip() and not line.startswith('#')]
            urls.extend(file_urls)
    
    if not urls:
        print("✗ Error: No URLs to process")
        sys.exit(1)
    
    print(f"\n{'='*80}")
    print(f"ALIEXPRESS PLAYWRIGHT SCRAPER")
    print(f"{'='*80}")
    print(f"URLs to process: {len(urls)}")
    print(f"Headless mode: {not args.visible}")
    print(f"{'='*80}")
    
    # Process products
    products = []
    headless = not args.visible
    
    with AliExpressPlaywrightScraper(headless=headless) as scraper:
        for i, url in enumerate(urls, 1):
            print(f"\n\n{'#'*80}")
            print(f"# PRODUCT {i}/{len(urls)}")
            print(f"{'#'*80}")
            
            product = process_product(url, scraper)
            if product:
                products.append(product)
            else:
                print(f"✗ Skipping product {i}")
            
            # Small delay between products
            if i < len(urls):
                print(f"\nWaiting 3 seconds before next product...")
                time.sleep(3)
    
    # Save results
    if products:
        save_products(products)
        
        print(f"\n{'='*80}")
        print(f"SUMMARY")
        print(f"{'='*80}")
        print(f"Successfully processed: {len(products)}/{len(urls)} products")
        print(f"Output: output/products.json")
        print(f"Log: imports-log.txt")
        print(f"\nNext steps:")
        print(f"1. Review products.json")
        print(f"2. Run: node import-to-db.js")
        print(f"{'='*80}\n")
    else:
        print(f"\n✗ No products were successfully processed")
        sys.exit(1)


if __name__ == "__main__":
    main()
