"""
Configuration for the product importer
"""

# Price settings
PRICE_MULTIPLIER = 2.5
PRICE_ROUND_TO = 0.99  # e.g., 49.99, 79.99

# Image settings
IMAGE_QUALITY = 80
MAX_IMAGES_PER_PRODUCT = 10

# Paths
OUTPUT_DIR = "output"
IMAGES_DIR = "../../public/products"

# Headers for web scraping
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

HEADERS = {
    "User-Agent": USER_AGENT,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
}

# Default category if not found
DEFAULT_CATEGORY = "general"

# Variants to extract
VARIANT_TYPES = ["color", "size", "quantity"]
