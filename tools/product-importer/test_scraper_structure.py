#!/usr/bin/env python3
"""
Test script to verify scraper structure and dependencies
This tests the scraper logic without actually running it
"""

import sys
import os

# Test 1: Check imports
print("=" * 70)
print("TEST 1: Checking imports")
print("=" * 70)

try:
    import pricing
    print("✓ pricing module imported successfully")
    
    import config
    print("✓ config module imported successfully")
    
    # Test pricing functions
    from pricing import calculate_selling_price, calculate_margin_percentage, format_price
    print("✓ pricing functions imported successfully")
    
except ImportError as e:
    print(f"✗ Import error: {e}")
    sys.exit(1)

# Test 2: Verify pricing calculations
print("\n" + "=" * 70)
print("TEST 2: Verifying pricing calculations")
print("=" * 70)

test_prices = [
    (5.00, 14.99),
    (20.00, 49.99),
    (45.00, 89.99),
    (100.00, 169.99),
]

all_pass = True
for base, expected in test_prices:
    result = calculate_selling_price(base)
    if abs(result - expected) < 0.01:
        print(f"✓ {format_price(base)} → {format_price(result)}")
    else:
        print(f"✗ {format_price(base)} → {format_price(result)} (expected {format_price(expected)})")
        all_pass = False

if not all_pass:
    print("\n✗ Some pricing tests failed")
    sys.exit(1)

# Test 3: Check file structure
print("\n" + "=" * 70)
print("TEST 3: Checking file structure")
print("=" * 70)

files_to_check = [
    'pricing.py',
    'scraper_playwright.py',
    'config.py',
    'importer.py',
    'requirements.txt',
    'imports-log.txt',
]

for filename in files_to_check:
    if os.path.exists(filename):
        print(f"✓ {filename} exists")
    else:
        print(f"✗ {filename} NOT found")
        all_pass = False

# Test 4: Verify scraper_playwright.py structure
print("\n" + "=" * 70)
print("TEST 4: Verifying scraper_playwright.py structure")
print("=" * 70)

try:
    with open('scraper_playwright.py', 'r') as f:
        content = f.read()
        
    required_components = [
        ('AliExpressPlaywrightScraper', 'class'),
        ('scrape', 'method'),
        ('_extract_name', 'method'),
        ('_extract_price', 'method'),
        ('_extract_images', 'method'),
        ('log_import', 'function'),
        ('calculate_selling_price', 'import'),
        ('main', 'function'),
    ]
    
    for component, type_str in required_components:
        if component in content:
            print(f"✓ {component} ({type_str}) found")
        else:
            print(f"✗ {component} ({type_str}) NOT found")
            all_pass = False
            
except Exception as e:
    print(f"✗ Error reading scraper_playwright.py: {e}")
    all_pass = False

# Test 5: Check imports-log.txt structure
print("\n" + "=" * 70)
print("TEST 5: Checking imports-log.txt")
print("=" * 70)

try:
    if os.path.exists('imports-log.txt'):
        print("✓ imports-log.txt exists")
        with open('imports-log.txt', 'r') as f:
            content = f.read()
        if 'DATE' in content or len(content.strip()) == 0:
            print("✓ imports-log.txt has correct format")
        else:
            print("⚠ imports-log.txt exists but may have unexpected content")
    else:
        print("✗ imports-log.txt NOT found")
        all_pass = False
except Exception as e:
    print(f"✗ Error checking imports-log.txt: {e}")
    all_pass = False

# Summary
print("\n" + "=" * 70)
if all_pass:
    print("✓✓✓ ALL TESTS PASSED ✓✓✓")
    print("=" * 70)
    print("\nThe scraper structure is correct!")
    print("\nNext steps:")
    print("1. Install dependencies: pip install -r requirements.txt")
    print("2. Install Playwright browsers: playwright install chromium")
    print("3. Run the scraper: python scraper_playwright.py <URL>")
else:
    print("✗✗✗ SOME TESTS FAILED ✗✗✗")
    print("=" * 70)
    sys.exit(1)
