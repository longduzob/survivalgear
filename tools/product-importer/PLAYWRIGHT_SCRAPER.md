# AliExpress Playwright Scraper

Scraper automatique pour AliExpress utilisant Playwright pour récupérer toutes les informations produit.

## 🎯 Fonctionnalité principale

**Tu colles un lien → il récupère TOUT automatiquement**

## 📦 Installation

### 1. Installer les dépendances Python

```bash
cd tools/product-importer
pip install -r requirements.txt
```

### 2. Installer les navigateurs Playwright

```bash
playwright install chromium
```

## 🚀 Utilisation

### Scraper un seul produit

```bash
python scraper_playwright.py "https://aliexpress.com/item/1234567890.html"
```

### Scraper plusieurs produits depuis un fichier

1. Créer un fichier `links.txt` avec une URL par ligne:
```text
https://www.aliexpress.com/item/1234567890.html
https://fr.aliexpress.com/item/9876543210.html
https://www.aliexpress.com/item/5555555555.html
```

2. Lancer le scraper:
```bash
python scraper_playwright.py --file links.txt
```

### Options disponibles

```bash
# Mode visible (pour debugging)
python scraper_playwright.py --visible "URL"

# Afficher l'aide
python scraper_playwright.py --help
```

## 📊 Données récupérées

Le scraper extrait automatiquement:

- ✅ **Nom complet du produit**
- ✅ **Prix original** (prix barré si promo)
- ✅ **Prix actuel**
- ✅ **Toutes les images** (haute qualité)
- ✅ **Description complète**
- ✅ **Variantes** (couleurs, tailles, options)
- ✅ **Catégorie**
- ✅ **Spécifications/caractéristiques**

## 💰 Système de marge dynamique

Le prix de vente est calculé automatiquement selon une marge adaptative:

| Prix de base | Multiplier | Exemple |
|--------------|-----------|---------|
| 0-10€ | 3.0x | 5€ → 14.99€ |
| 10-30€ | 2.5x | 20€ → 49.99€ |
| 30-100€ | 2.0x | 45€ → 89.99€ |
| 100€+ | 1.7x | 100€ → 169.99€ |

### Exemples de calcul

```
Prix base: 5.00€   → Prix vente: 14.99€  (Marge: 200%)
Prix base: 8.50€   → Prix vente: 24.99€  (Marge: 194%)
Prix base: 20.00€  → Prix vente: 49.99€  (Marge: 150%)
Prix base: 45.00€  → Prix vente: 89.99€  (Marge: 100%)
Prix base: 85.00€  → Prix vente: 169.99€ (Marge: 100%)
Prix base: 100.00€ → Prix vente: 169.99€ (Marge: 70%)
```

Tous les prix sont automatiquement arrondis à `.99` (ex: 24.99€, 49.99€).

## 📝 Fichier log des imports

Chaque import est enregistré dans `imports-log.txt`:

```text
[2025-01-15 14:32] https://aliexpress.com/item/123.html | Couteau Survie Pro | 8.50€ | 24.99€ | 194%
[2025-01-15 14:33] https://aliexpress.com/item/456.html | Tente 2 Places | 85.00€ | 169.99€ | 100%
```

Format: `[DATE] LIEN | NOM PRODUIT | PRIX BASE | PRIX VENTE | MARGE %`

Pour consulter le log:
```bash
cat imports-log.txt
```

## 📁 Fichiers générés

### products.json
Tous les produits sont sauvegardés dans `output/products.json`:

```json
[
  {
    "name": "Couteau de Survie Professionnel",
    "slug": "couteau-de-survie-professionnel",
    "price": 24.99,
    "description": "...",
    "images": [
      {
        "url": "/products/couteau-de-survie-professionnel/0.jpg",
        "alt": "Couteau de Survie Professionnel",
        "order": 0
      }
    ],
    "variants": [],
    "category": "outdoor",
    "specifications": {}
  }
]
```

### Images
Les images sont téléchargées dans `/public/products/{slug}/`:
```
public/products/
  ├── couteau-de-survie-professionnel/
  │   ├── 0.jpg
  │   ├── 1.jpg
  │   └── 2.jpg
  └── tente-2-places/
      ├── 0.jpg
      └── 1.jpg
```

## 🔄 Import dans la base de données

Après génération du fichier `products.json`:

```bash
cd ../..
node tools/product-importer/import-to-db.js
```

## 🛠️ Fonctionnalités techniques

### Anti-détection
- User-agent réaliste
- Délais aléatoires entre les actions
- Émulation de navigateur complet
- Gestion automatique des cookies

### Gestion d'erreurs
- **Retry automatique** (3 tentatives par défaut)
- Timeouts configurables
- Logs détaillés des erreurs
- Récupération gracieuse en cas d'échec

### Performance
- Blocage des ressources inutiles (images durant la navigation)
- Téléchargement optimisé des images
- Compression JPEG avec qualité ajustable

## 🐛 Debugging

### Mode visible
Pour voir le navigateur en action:
```bash
python scraper_playwright.py --visible "URL"
```

### Logs détaillés
Le scraper affiche des logs détaillés:
```
============================================================
PROCESSING PRODUCT
============================================================
Scraping: https://aliexpress.com/item/123.html
Attempt: 1/3
============================================================
✓ Successfully extracted product data
  Name: Couteau Survie Pro...
  Price: €8.50
  Images: 5

============================================================
PRICING CALCULATION
============================================================
Base price:    8.50€
Selling price: 24.99€
Margin:        194.0%

============================================================
DOWNLOADING IMAGES
============================================================
Downloading image 1/5...
Downloading image 2/5...
...
✓ Downloaded 5 images

✓ Logged to imports-log.txt

============================================================
✓ PRODUCT PROCESSED SUCCESSFULLY
============================================================
```

## ⚠️ Limitations

- **Rate limiting**: Ajoute des délais entre requêtes pour éviter le blocage
- **Changements de structure**: AliExpress peut modifier son HTML, nécessitant des ajustements
- **Produits privés**: Certains produits peuvent être inaccessibles
- **Variantes complexes**: Les variantes très complexes peuvent ne pas être complètement extraites

## 🔧 Configuration avancée

Modifier `config.py` pour ajuster:

```python
# Qualité des images (1-100)
IMAGE_QUALITY = 80

# Nombre maximum d'images par produit
MAX_IMAGES_PER_PRODUCT = 10

# Répertoire de sortie
OUTPUT_DIR = "output"

# Répertoire des images
IMAGES_DIR = "../../public/products"
```

## 📚 Structure du code

```
tools/product-importer/
├── scraper_playwright.py    # Scraper principal avec Playwright
├── pricing.py                # Logique de calcul des prix
├── importer.py              # Ancien scraper (BeautifulSoup)
├── config.py                # Configuration
├── requirements.txt         # Dépendances Python
├── imports-log.txt          # Log des imports
└── scrapers/
    ├── aliexpress.py        # Ancien scraper AliExpress
    └── hipobuy.py           # Scraper Hipobuy
```

## 🆚 Comparaison avec l'ancien scraper

| Fonctionnalité | Ancien (BeautifulSoup) | Nouveau (Playwright) |
|----------------|------------------------|----------------------|
| JavaScript | ❌ Non supporté | ✅ Complet |
| Fiabilité | ⚠️ Limitée | ✅ Excellente |
| Anti-bot | ❌ Basique | ✅ Avancé |
| Debugging | ⚠️ Difficile | ✅ Mode visible |
| Performance | ✅ Rapide | ⚠️ Plus lent |
| Maintenance | ⚠️ Fragile | ✅ Robuste |

## 💡 Conseils d'utilisation

1. **Commencer petit**: Tester avec 1-2 produits avant un batch complet
2. **Vérifier les logs**: Toujours consulter `imports-log.txt` après import
3. **Valider les prix**: Vérifier que les marges sont correctes dans le log
4. **Images**: Vérifier que les images sont bien téléchargées dans `/public/products/`
5. **Mode visible**: Utiliser `--visible` pour le premier test et comprendre le comportement

## 🤝 Support

En cas de problème:
1. Vérifier que Playwright est bien installé: `playwright --version`
2. Réinstaller les navigateurs: `playwright install --force chromium`
3. Tester en mode visible: `python scraper_playwright.py --visible "URL"`
4. Consulter les logs d'erreur détaillés
