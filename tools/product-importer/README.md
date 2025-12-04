# Product Importer Tool

Outil d'automatisation pour importer des produits depuis AliExpress et Hipobuy.

## Installation

```bash
cd tools/product-importer
pip install -r requirements.txt
```

## Utilisation

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

## Configuration

Modifiez `config.py` pour ajuster:
- `PRICE_MULTIPLIER`: Coefficient de prix (défaut: 2.5)
- `PRICE_ROUND_TO`: Arrondi final (défaut: .99)
- `IMAGE_QUALITY`: Qualité des images téléchargées

## Import dans la base de données

Après génération du fichier `products.json`, importez-le dans Prisma:

```bash
cd ../..
node tools/product-importer/import-to-db.js
```
