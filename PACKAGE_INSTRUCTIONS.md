# 📦 Instructions de Packaging - Survival Gear Pro

## Créer le fichier ZIP pour Shopify

### Méthode 1: Ligne de commande (Linux/Mac)

```bash
# Se placer dans le répertoire du thème
cd /home/runner/work/survivalgear/survivalgear

# Créer le fichier ZIP avec la structure correcte
zip -r survival-gear-pro-theme.zip \
  config/ \
  layout/ \
  templates/ \
  sections/ \
  snippets/ \
  assets/ \
  locales/ \
  -x "*.DS_Store" "*.git*" "node_modules/*" "*.log"
```

### Méthode 2: Script de packaging

```bash
#!/bin/bash
# package-theme.sh

THEME_NAME="survival-gear-pro-theme"
THEME_VERSION="1.0.0"
OUTPUT_FILE="${THEME_NAME}-v${THEME_VERSION}.zip"

echo "📦 Packaging Shopify Theme..."
echo "Theme: ${THEME_NAME}"
echo "Version: ${THEME_VERSION}"
echo ""

# Créer le ZIP
zip -r "${OUTPUT_FILE}" \
  config/ \
  layout/ \
  templates/ \
  sections/ \
  snippets/ \
  assets/ \
  locales/ \
  -x "*.DS_Store" \
     "*.git*" \
     "*node_modules/*" \
     "*.log" \
     "*/.env*" \
     "*/package*.json" \
     "*/tsconfig.json"

echo ""
echo "✅ Package created: ${OUTPUT_FILE}"
echo "📊 Size: $(du -h ${OUTPUT_FILE} | cut -f1)"
echo ""
echo "🚀 Ready to upload to Shopify!"
```

### Méthode 3: GitHub Actions (Automatique)

Créer `.github/workflows/package-theme.yml`:

```yaml
name: Package Shopify Theme

on:
  push:
    tags:
      - 'v*'

jobs:
  package:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Create theme ZIP
        run: |
          zip -r survival-gear-pro-theme-${{ github.ref_name }}.zip \
            config/ layout/ templates/ sections/ snippets/ assets/ locales/
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: survival-gear-pro-theme-*.zip
```

## Structure du ZIP

Le fichier ZIP doit avoir cette structure:

```
survival-gear-pro-theme.zip
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   └── theme.liquid
├── templates/
│   ├── index.liquid
│   ├── product.liquid
│   ├── collection.liquid
│   ├── cart.liquid
│   ├── search.liquid
│   └── page.contact.liquid
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero-banner.liquid
│   ├── featured-collections.liquid
│   ├── kit-builder.liquid
│   ├── featured-products.liquid
│   └── blog-posts.liquid
├── snippets/
│   ├── product-card.liquid
│   └── app-blocks.liquid
├── assets/
│   ├── theme.css
│   ├── theme-dark.css
│   └── global.js
└── locales/
    └── fr.json
```

## ⚠️ Fichiers à EXCLURE du ZIP

Ne PAS inclure:
- ❌ node_modules/
- ❌ .git/
- ❌ .env files
- ❌ package.json / package-lock.json
- ❌ tsconfig.json
- ❌ .gitignore
- ❌ README.md (Next.js)
- ❌ app/ (Next.js)
- ❌ components/ (Next.js)
- ❌ prisma/
- ❌ Documentation files (README.txt, INSTALLATION.md sont pour référence uniquement)

## ✅ Validation du Package

Avant de télécharger sur Shopify, vérifiez:

### 1. Taille du fichier
```bash
# Doit être < 50 MB
du -h survival-gear-pro-theme.zip
```

### 2. Structure du ZIP
```bash
# Vérifier le contenu
unzip -l survival-gear-pro-theme.zip | head -20
```

### 3. Fichiers requis
```bash
# Tous ces fichiers doivent être présents:
unzip -l survival-gear-pro-theme.zip | grep -E "(config/settings_schema|layout/theme|templates/index)"
```

### 4. Pas de fichiers interdits
```bash
# Ces patterns ne doivent PAS apparaître:
unzip -l survival-gear-pro-theme.zip | grep -E "(node_modules|\.git|\.env)"
# Si résultat = vide ✅
```

## 🚀 Upload vers Shopify

### Étape 1: Préparer
1. Connectez-vous à votre admin Shopify
2. Allez dans **Boutique en ligne > Thèmes**
3. Cliquez sur **Ajouter un thème**

### Étape 2: Upload
1. Sélectionnez **Importer un fichier ZIP**
2. Choisissez `survival-gear-pro-theme.zip`
3. Attendez la fin de l'upload (1-2 minutes)

### Étape 3: Vérification
- Vérifiez qu'aucune erreur n'apparaît
- Le thème doit apparaître dans "Bibliothèque de thèmes"
- Cliquez sur **Personnaliser** pour tester

### Étape 4: Configuration
1. Configurez le logo et les couleurs
2. Créez vos menus de navigation
3. Ajoutez les sections à la page d'accueil
4. Testez toutes les pages

### Étape 5: Publication
- Cliquez sur **Actions > Publier** quand prêt

## 🔄 Mise à Jour

Pour mettre à jour un thème déjà installé:

```bash
# 1. Créer une nouvelle version
zip -r survival-gear-pro-theme-v1.1.0.zip config/ layout/ templates/ sections/ snippets/ assets/ locales/

# 2. Dans Shopify, importer comme nouveau thème

# 3. Comparer avec l'ancien

# 4. Copier les paramètres personnalisés

# 5. Tester puis publier
```

## 📋 Checklist Pré-Upload

- [ ] Tous les fichiers Liquid sont valides
- [ ] CSS compilé et minifié
- [ ] JavaScript testé et fonctionnel
- [ ] Images d'exemple incluses
- [ ] Traductions complètes
- [ ] settings_schema.json valide
- [ ] Aucun fichier de développement inclus
- [ ] Taille du ZIP < 50 MB
- [ ] Documentation à jour
- [ ] Version number correcte

## 🐛 Troubleshooting

### Erreur: "Theme could not be uploaded"
- Vérifiez la structure du ZIP
- Assurez-vous que layout/theme.liquid existe
- Vérifiez la syntaxe Liquid

### Erreur: "Invalid settings_schema"
- Validez le JSON sur jsonlint.com
- Vérifiez les types de champs
- Assurez-vous que tous les IDs sont uniques

### Erreur: "Asset too large"
- Optimisez les images
- Minifiez CSS/JS
- Compressez le ZIP davantage

## 📚 Ressources

- [Shopify Theme Requirements](https://shopify.dev/themes/best-practices/theme-requirements)
- [Theme Structure](https://shopify.dev/themes/architecture)
- [Liquid Documentation](https://shopify.dev/api/liquid)

---

**Note**: Ces instructions sont pour le packaging et l'upload du thème Shopify uniquement. 
Le reste du repository (Next.js app) reste intact et séparé.
