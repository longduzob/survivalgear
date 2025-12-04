#!/usr/bin/env python3
"""
Main importer script for SurvivalGear
Processes links from links.txt and generates products.json
"""

import os
import json
import sys
from typing import List, Dict
from pathlib import Path

import config
from scrapers.aliexpress import AliExpressScraper
from scrapers.hipobuy import HipobuyScraper
from pricing import calculate_selling_price, calculate_margin_percentage


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    import re
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')


def calculate_price(original_price: float) -> float:
    """Apply dynamic price calculation with tiered margins"""
    return calculate_selling_price(original_price)


def download_image(url: str, product_slug: str, index: int) -> str:
    """Download image and save to local storage"""
    import requests
    from PIL import Image
    from io import BytesIO
    
    try:
        response = requests.get(url, headers=config.HEADERS, timeout=10)
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


def process_link(url: str) -> Dict:
    """Process a single product link"""
    print(f"\nProcessing: {url}")
    
    # Determine scraper based on URL
    if "aliexpress" in url.lower():
        scraper = AliExpressScraper()
    elif "hipobuy" in url.lower():
        scraper = HipobuyScraper()
    else:
        print(f"Unknown URL format: {url}")
        return None
    
    # Extract product data
    try:
        product_data = scraper.scrape(url)
        if not product_data:
            print(f"Failed to scrape product from {url}")
            return None
        
        # Generate slug
        slug = slugify(product_data['name'])
        
        # Calculate new price
        original_price = product_data['price']
        new_price = calculate_price(original_price)
        
        # Download images
        images = []
        for idx, img_url in enumerate(product_data['images'][:config.MAX_IMAGES_PER_PRODUCT]):
            local_path = download_image(img_url, slug, idx)
            if local_path:
                images.append({
                    'url': local_path,
                    'alt': product_data['name'],
                    'order': idx
                })
        
        # Build product object
        product = {
            'name': product_data['name'],
            'slug': slug,
            'description': product_data.get('description', ''),
            'brand': product_data.get('brand', 'Generic'),
            'price': new_price,
            'comparePrice': None,  # Could be original_price * 3 for showing discount
            'stock': 100,  # Default stock
            'weight': product_data.get('weight'),
            'featured': False,
            'active': True,
            'images': images,
            'variants': product_data.get('variants', []),
            'category': product_data.get('category', config.DEFAULT_CATEGORY)
        }
        
        print(f"✓ Successfully processed: {product_data['name']}")
        print(f"  Original price: ${original_price:.2f}")
        print(f"  New price: €{new_price:.2f}")
        print(f"  Images: {len(images)}")
        
        return product
    
    except Exception as e:
        print(f"Error processing {url}: {e}")
        import traceback
        traceback.print_exc()
        return None


def main():
    """Main function"""
    print("=" * 60)
    print("SurvivalGear Product Importer")
    print("=" * 60)
    
    # Check if links.txt exists
    links_file = Path("links.txt")
    if not links_file.exists():
        print("\nError: links.txt not found!")
        print("Create a links.txt file with one URL per line.")
        sys.exit(1)
    
    # Read links
    with open(links_file, 'r') as f:
        links = [line.strip() for line in f if line.strip()]
    
    if not links:
        print("\nError: links.txt is empty!")
        sys.exit(1)
    
    print(f"\nFound {len(links)} links to process\n")
    
    # Process each link
    products = []
    for link in links:
        product = process_link(link)
        if product:
            products.append(product)
    
    # Create output directory
    output_dir = Path(config.OUTPUT_DIR)
    output_dir.mkdir(exist_ok=True)
    
    # Save products to JSON
    output_file = output_dir / "products.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 60)
    print(f"✓ Successfully processed {len(products)} out of {len(links)} products")
    print(f"✓ Output saved to: {output_file}")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Review products.json")
    print("2. Run: node import-to-db.js")
    print()


if __name__ == "__main__":
    main()
