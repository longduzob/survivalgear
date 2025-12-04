# Product Importer Tool

Outil d'automatisation pour importer des produits depuis AliExpress et Hipobuy.

## 🆕 Nouveau: Scraper Playwright

**Scraper automatique AliExpress avec Playwright** - Récupère TOUTES les infos produit automatiquement!

✅ **Système de marge dynamique** adapté au prix de base  
✅ **Log des imports** avec détails complets  
✅ **Support JavaScript** complet avec Playwright  
✅ **Anti-détection** avancé  

👉 **[Documentation complète du scraper Playwright](./PLAYWRIGHT_SCRAPER.md)**

### Utilisation rapide

```bash
# Installation
pip install -r requirements.txt
playwright install chromium

# Scraper un produit
python scraper_playwright.py "https://aliexpress.com/item/123.html"

# Scraper plusieurs produits
python scraper_playwright.py --file links.txt

# Voir le log des imports
cat imports-log.txt
```

---

## Installation (ancien scraper)

```bash
cd tools/product-importer
pip install -r requirements.txt
```

## Utilisation (ancien scraper)

1. Créez un fichier `links.txt` avec une URL par ligne:
```
https://www.aliexpress.com/item/...
https://www.hipobuy.com/product/...
```

2. Lancez l'import:
```bash
python importer.py
```

3. Les produits seront téléchargés dans `output/products.json` et les images dans `/public/products/`

## Système de prix dynamique

Le nouveau système calcule automatiquement le prix de vente avec une marge adaptée:

- **0-10€**: Marge ~200% (ex: 5€ → 14.99€)
- **10-30€**: Marge ~150% (ex: 20€ → 49.99€)
- **30-100€**: Marge ~100% (ex: 45€ → 89.99€)
- **100€+**: Marge ~70% (ex: 100€ → 169.99€)

## Configuration

Modifiez `config.py` pour ajuster:
- `IMAGE_QUALITY`: Qualité des images téléchargées
- `MAX_IMAGES_PER_PRODUCT`: Nombre maximum d'images
- `DEFAULT_CATEGORY`: Catégorie par défaut

## Import dans la base de données

Après génération du fichier `products.json`, importez-le dans Prisma:

```bash
cd ../..
node tools/product-importer/import-to-db.js
```

## Fichiers

- `scraper_playwright.py` - **NOUVEAU**: Scraper avec Playwright (recommandé)
- `pricing.py` - Module de calcul des prix dynamiques
- `importer.py` - Ancien scraper (BeautifulSoup)
- `config.py` - Configuration
- `imports-log.txt` - Log des imports avec détails des prix
- `PLAYWRIGHT_SCRAPER.md` - Documentation complète du nouveau scraper
