# 🚀 Guide de Déploiement SurvivalGear sur Vercel

Ce guide vous explique comment déployer SurvivalGear sur Vercel en quelques étapes simples.

## Prérequis

- Un compte GitHub avec le repository SurvivalGear
- Un compte Vercel (gratuit: https://vercel.com/signup)
- Un compte PayPal Developer (pour les paiements)
- Une base de données PostgreSQL (Vercel Postgres recommandé)

## Étape 1: Préparer la Base de Données

### Option A: Vercel Postgres (Recommandé)

1. Connectez-vous à https://vercel.com
2. Allez dans votre projet → Storage → Create Database
3. Sélectionnez "Postgres"
4. Donnez un nom à votre base (ex: "survivalgear-db")
5. Copiez la variable `DATABASE_URL` qui sera générée

### Option B: Autre Provider PostgreSQL

Vous pouvez utiliser:
- **Supabase** (https://supabase.com) - Gratuit, facile à configurer
- **Railway** (https://railway.app) - Gratuit jusqu'à 5$
- **Neon** (https://neon.tech) - Serverless PostgreSQL gratuit

Copiez la connection string PostgreSQL fournie.

## Étape 2: Configuration PayPal

1. Allez sur https://developer.paypal.com
2. Créez une application dans "My Apps & Credentials"
3. Mode Sandbox pour les tests, Live pour la production
4. Copiez le **Client ID** et le **Secret**

## Étape 3: Déployer sur Vercel

### Méthode Simple (Interface Web)

1. **Connectez votre Repository**
   - Allez sur https://vercel.com/new
   - Sélectionnez "Import Git Repository"
   - Choisissez votre repository GitHub `survivalgear`
   - Cliquez sur "Import"

2. **Configurez les Variables d'Environnement**
   
   Dans les paramètres du projet, ajoutez ces variables:

   ```env
   # Database
   DATABASE_URL="votre-connection-string-postgres"
   
   # NextAuth
   NEXTAUTH_SECRET="[générez avec: openssl rand -base64 32]"
   NEXTAUTH_URL="https://votre-domaine.vercel.app"
   
   # PayPal
   NEXT_PUBLIC_PAYPAL_CLIENT_ID="votre-client-id"
   PAYPAL_CLIENT_SECRET="votre-secret"
   PAYPAL_MODE="sandbox"  # ou "live" pour production
   
   # Site
   NEXT_PUBLIC_SITE_URL="https://votre-domaine.vercel.app"
   NEXT_PUBLIC_DEFAULT_LOCALE="fr"
   ```

3. **Déployez**
   - Cliquez sur "Deploy"
   - Attendez la fin du build (environ 2-3 minutes)
   - Votre site est en ligne! 🎉

### Méthode CLI (Avancé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivez les instructions à l'écran
```

## Étape 4: Initialiser la Base de Données

Après le premier déploiement:

```bash
# Depuis votre machine locale avec DATABASE_URL configuré
npx prisma migrate deploy
npx prisma db seed  # Si vous avez un fichier seed
```

Ou utilisez Prisma Studio:

```bash
npx prisma studio
```

## Étape 5: Importer les Premiers Produits

### Utiliser l'Outil d'Import

1. Localement, créez `tools/product-importer/links.txt`:
   ```
   https://www.aliexpress.com/item/...
   https://www.aliexpress.com/item/...
   ```

2. Lancez l'import:
   ```bash
   cd tools/product-importer
   pip install -r requirements.txt
   python importer.py
   ```

3. Importez dans la base:
   ```bash
   cd ../..
   node tools/product-importer/import-to-db.js
   ```

### Ou Manuellement via l'Admin

1. Allez sur `https://votre-site.vercel.app/admin`
2. Connectez-vous (créez d'abord un compte admin dans la DB)
3. Ajoutez vos produits via l'interface

## Étape 6: Tester PayPal

En mode Sandbox:

1. Créez des comptes de test sur https://developer.paypal.com/dashboard/accounts
2. Utilisez ces comptes pour tester les paiements
3. Les vrais paiements ne seront pas effectués

En mode Live:

1. Changez `PAYPAL_MODE` à "live"
2. Utilisez vos vraies credentials PayPal
3. Les paiements réels seront traités

## Étape 7: Configurer un Domaine Personnalisé (Optionnel)

1. Dans Vercel, allez dans Settings → Domains
2. Ajoutez votre domaine (ex: survivalgear.com)
3. Suivez les instructions pour configurer les DNS
4. Mettez à jour `NEXTAUTH_URL` et `NEXT_PUBLIC_SITE_URL`

## 🔧 Dépannage

### Erreur de Build

**Problème**: "Failed to compile"
**Solution**: 
- Vérifiez les logs de build dans Vercel
- Assurez-vous que toutes les dépendances sont dans package.json
- Exécutez `npm run build` localement pour identifier l'erreur

### Erreur de Base de Données

**Problème**: "Can't reach database server"
**Solution**:
- Vérifiez que `DATABASE_URL` est correcte
- Assurez-vous que la base est accessible depuis internet
- Vérifiez les whitelist IP si nécessaire

### Erreur PayPal

**Problème**: "PayPal SDK failed to load"
**Solution**:
- Vérifiez que `NEXT_PUBLIC_PAYPAL_CLIENT_ID` est défini
- Vérifiez le mode (sandbox vs live)
- Consultez la console navigateur pour plus de détails

### Prisma Client Error

**Problème**: "Prisma Client not generated"
**Solution**:
```bash
npx prisma generate
```

## 📊 Monitoring et Logs

- **Build logs**: Vercel Dashboard → Deployments → [votre deployment]
- **Runtime logs**: Vercel Dashboard → Logs
- **Database**: Utilisez Prisma Studio pour inspecter les données

## 🔐 Sécurité

Avant de passer en production:

1. ✅ Changez tous les secrets par des valeurs sécurisées
2. ✅ Activez HTTPS (automatique sur Vercel)
3. ✅ Configurez les CORS si nécessaire
4. ✅ Testez tous les flux de paiement
5. ✅ Vérifiez la conformité RGPD
6. ✅ Configurez les sauvegardes de base de données

## 🎯 Checklist de Lancement

- [ ] Base de données configurée et accessible
- [ ] Variables d'environnement définies
- [ ] PayPal configuré et testé
- [ ] Produits importés
- [ ] Pages légales complétées
- [ ] Design testé sur mobile et desktop
- [ ] Flux de commande complet testé
- [ ] Emails de confirmation configurés (à implémenter)
- [ ] Analytics installé (optionnel)
- [ ] SEO optimisé (meta tags, sitemap)

## 📞 Support

- Documentation Next.js: https://nextjs.org/docs
- Documentation Vercel: https://vercel.com/docs
- Documentation Prisma: https://www.prisma.io/docs
- Documentation PayPal: https://developer.paypal.com/docs

## 🚀 Commandes Utiles

```bash
# Développement local
npm run dev

# Build production
npm run build

# Démarrer en production
npm run start

# Prisma
npx prisma studio          # Interface graphique DB
npx prisma migrate dev     # Créer migration
npx prisma migrate deploy  # Appliquer migrations
npx prisma generate        # Générer client

# Vercel
vercel                     # Déployer
vercel env pull            # Récupérer les variables d'env
vercel logs               # Voir les logs
```

Bon déploiement! 🎉
