"""
Hipobuy scraper
Note: This is a basic template. Real implementation depends on
Hipobuy's current HTML structure.
"""

import requests
from bs4 import BeautifulSoup
from typing import Dict, List
import json
import re
import sys
sys.path.append('..')
import config


class HipobuyScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(config.HEADERS)
    
    def scrape(self, url: str) -> Dict:
        """Scrape product data from Hipobuy"""
        try:
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'lxml')
            
            product_data = {
                'name': self._extract_title(soup),
                'description': self._extract_description(soup),
                'price': self._extract_price(soup),
                'images': self._extract_images(soup),
                'brand': self._extract_brand(soup),
                'variants': self._extract_variants(soup),
                'category': self._extract_category(soup),
            }
            
            return product_data
        
        except Exception as e:
            print(f"Error scraping Hipobuy: {e}")
            return None
    
    def _extract_title(self, soup: BeautifulSoup) -> str:
        """Extract product title"""
        title_element = soup.select_one('h1.product-name') or \
                       soup.select_one('h1') or \
                       soup.select_one('.product-title')
        
        if title_element:
            return title_element.get_text(strip=True)
        
        return "Unknown Product"
    
    def _extract_description(self, soup: BeautifulSoup) -> str:
        """Extract product description"""
        desc_element = soup.select_one('.product-description') or \
                      soup.select_one('.description')
        
        if desc_element:
            return desc_element.get_text(strip=True)
        
        return ""
    
    def _extract_price(self, soup: BeautifulSoup) -> float:
        """Extract product price"""
        price_element = soup.select_one('.product-price') or \
                       soup.select_one('.price')
        
        if price_element:
            price_text = price_element.get_text()
            # Extract number from price text
            match = re.search(r'(\d+\.?\d*)', price_text)
            if match:
                return float(match.group(1))
        
        return 29.99  # Default fallback
    
    def _extract_images(self, soup: BeautifulSoup) -> List[str]:
        """Extract product images"""
        images = []
        
        img_elements = soup.select('.product-gallery img, .product-images img')
        
        for img in img_elements:
            src = img.get('src') or img.get('data-src')
            if src and src not in images:
                # Ensure full URL
                if src.startswith('//'):
                    src = 'https:' + src
                elif src.startswith('/'):
                    src = 'https://hipobuy.com' + src
                images.append(src)
        
        return images[:config.MAX_IMAGES_PER_PRODUCT]
    
    def _extract_brand(self, soup: BeautifulSoup) -> str:
        """Extract brand name"""
        brand_element = soup.select_one('.product-brand') or \
                       soup.select_one('.brand')
        
        if brand_element:
            return brand_element.get_text(strip=True)
        
        return "Generic"
    
    def _extract_variants(self, soup: BeautifulSoup) -> List[Dict]:
        """Extract product variants"""
        variants = []
        
        # Color variants
        color_elements = soup.select('.color-option')
        for color in color_elements:
            variants.append({
                'name': 'Color',
                'value': color.get('data-color') or color.get_text(strip=True)
            })
        
        # Size variants
        size_elements = soup.select('.size-option')
        for size in size_elements:
            variants.append({
                'name': 'Size',
                'value': size.get_text(strip=True)
            })
        
        return variants
    
    def _extract_category(self, soup: BeautifulSoup) -> str:
        """Extract category"""
        breadcrumb = soup.select('.breadcrumb a')
        
        if len(breadcrumb) > 1:
            return breadcrumb[-1].get_text(strip=True).lower()
        
        return config.DEFAULT_CATEGORY
