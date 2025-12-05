# SurvivalGear 🏕️

Site e-commerce **Next.js 14+** de matériel outdoor/survie en dropshipping, inspiré de l'esthétique OutdoorLine.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma)
![PayPal](https://img.shields.io/badge/PayPal-Integrated-00457C?style=flat&logo=paypal)

## 🎯 Fonctionnalités

### E-commerce
- ✅ Catalogue produits avec filtres avancés (marque, prix, couleur, taille, poids)
- ✅ Panier persistant (localStorage + sync DB)
- ✅ Variantes produits (couleur, taille, quantité)
- ✅ Checkout PayPal 100% fonctionnel
- ✅ Gestion des commandes
- ✅ Wishlist / Favoris
- ✅ Avis clients
- ✅ Recherche produits
- ✅ Multi-langue FR/EN (i18n)

### Frais de Port
- France : 4.99€
- Union Européenne : 9.99€
- **Gratuit** dès 100€ d'achat
- Délai de livraison : ~2 semaines

### Conformité
- ✅ Bannière cookies RGPD
- ✅ Pages légales (CGV, mentions, confidentialité, retours)
- ✅ Protection acheteur

### Admin
- ✅ Dashboard admin pour gérer produits et commandes
- ✅ CRUD produits complet
- ✅ Gestion des stocks et variantes
- ✅ **Import automatique depuis AliExpress** avec calcul de prix dynamique

## 🛠️ Stack Technique

- **Framework** : Next.js 14+ (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Database** : PostgreSQL avec Prisma ORM
- **Auth** : NextAuth.js
- **Payment** : PayPal React SDK
- **Hosting** : Optimisé pour Vercel

## 📦 Installation

### Prérequis
- Node.js 18+
- PostgreSQL
- npm ou yarn

### 1. Cloner le repository

```bash
git clone https://github.com/longduzob/survivalgear.git
cd survivalgear
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

Copiez `.env.example` vers `.env` et configurez vos variables :

```bash
cp .env.example .env
```

Éditez `.env` :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/survivalgear"

# NextAuth
NEXTAUTH_SECRET="votre-cle-secrete-ici"
NEXTAUTH_URL="http://localhost:3000"

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID="votre-client-id-paypal"
PAYPAL_CLIENT_SECRET="votre-secret-paypal"
PAYPAL_MODE="sandbox" # ou "live" pour production
```

### 4. Initialiser la base de données

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🤖 Import de Produits

Le projet offre **deux méthodes** pour importer des produits depuis AliExpress :

### Méthode 1 : Interface Admin Web (Recommandée ✨)

**Nouvelle fonctionnalité !** Importez directement depuis le dashboard admin :

1. Connectez-vous en tant qu'admin
2. Allez sur `/admin/import`
3. Collez vos liens AliExpress (un par ligne)
4. Cliquez sur "Importer"
5. Les produits sont automatiquement créés avec :
   - Prix calculé avec marge dynamique
   - Images importées
   - Log complet de l'import

**Pricing automatique** :
- €0-10 : ×3.0 (ex: 5€ → 14.99€)
- €10-30 : ×2.5 (ex: 20€ → 49.99€)
- €30-100 : ×2.0 (ex: 45€ → 89.99€)
- €100+ : ×1.5-1.7

Voir [docs/PRODUCT_IMPORT.md](docs/PRODUCT_IMPORT.md) pour la documentation complète.

### Méthode 2 : Outil Python (Avancé)

Pour des imports en masse ou personnalisés :

```bash
cd tools/product-importer
pip install -r requirements.txt
```

1. Créez un fichier `links.txt` avec une URL par ligne
2. Lancez l'import : `python importer.py`
3. Importez dans la base : `node import-to-db.js`

Voir [tools/product-importer/README.md](tools/product-importer/README.md) pour plus de détails.

## 🚀 Déploiement sur Vercel

### Méthode rapide (recommandée)

1. **Push votre code sur GitHub**

2. **Connectez à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Import Project"
   - Sélectionnez votre repository GitHub

3. **Configurez les variables d'environnement** dans Vercel :
   - `DATABASE_URL` (utiliser Vercel Postgres)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`

4. **Déployez** !

### Configuration Vercel Postgres

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Créer une base Postgres
vercel postgres create

# Lier à votre projet
vercel env pull
```

## 📁 Structure du Projet

```
/survivalgear
├── app/                    # Next.js App Router
│   ├── page.tsx           # Page d'accueil
│   ├── layout.tsx         # Layout racine
│   ├── globals.css        # Styles globaux
│   ├── categories/        # Pages catégories
│   ├── products/          # Pages produits
│   ├── cart/              # Panier
│   ├── checkout/          # Checkout
│   ├── account/           # Compte client
│   ├── admin/             # Dashboard admin
│   └── legal/             # Pages légales
├── components/            # Composants React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CookieConsent.tsx
├── lib/                   # Utilitaires
│   ├── prisma.ts         # Client Prisma
│   ├── shipping.ts       # Calcul frais de port
│   ├── pricing.ts        # Calcul de prix dynamique
│   └── scraper.ts        # Utilitaires de scraping
├── prisma/
│   └── schema.prisma     # Schéma de base de données
├── public/
│   └── products/         # Images produits
├── tools/
│   └── product-importer/ # Outil d'import Python
├── i18n/                 # Traductions FR/EN
│   ├── fr.json
│   └── en.json
├── .env.example          # Template variables d'environnement
└── README.md
```

## 🎨 Thème Couleurs

Le design s'inspire de OutdoorLine avec une palette naturelle :

- **Primaire** : `#0F5132` (vert forêt)
- **Secondaire** : `#1B4332`
- **Accent** : `#40916C`
- **Background** : `#FFFFFF`
- **Text** : `#1A1A1A`

## 📱 Pages Implémentées

- [x] **Accueil** (`/`) - Hero, catégories, produits populaires
- [x] **Catégories** (`/categories/[slug]`) - Filtres, grille produits
- [x] **Page Produit** (`/products/[slug]`) - Galerie, variantes, avis
- [x] **Panier** (`/cart`) - Gestion quantités, frais de port
- [x] **Checkout** (`/checkout`) - Formulaire, PayPal
- [x] **Compte** (`/account`) - Login, commandes, wishlist
- [x] **Admin** (`/admin`) - CRUD produits, gestion commandes
- [x] **Pages Légales** - CGV, mentions, confidentialité, retours

## 🔒 Sécurité

- Authentification sécurisée avec NextAuth.js
- Mots de passe hashés avec bcrypt
- Variables d'environnement protégées
- Validation des données côté serveur
- Protection CSRF
- Conformité RGPD avec bannière cookies

## 🌍 Internationalisation

Support FR/EN intégré :
- Fichiers de traduction dans `/i18n`
- Sélecteur de langue dans le header
- Tous les textes traduits

## 📄 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Support

Pour toute question : [votre-email@example.com]

---

Développé avec ❤️ pour les passionnés d'outdoor et de survie
