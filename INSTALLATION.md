# Guide d'Installation - Survival Gear Pro

## Prérequis
- Un compte Shopify actif
- Accès administrateur à votre boutique
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)

## Installation Rapide

### Étape 1: Télécharger le thème
Assurez-vous d'avoir le fichier `survival-gear-pro-theme.zip` sur votre ordinateur.

### Étape 2: Accéder à l'administration Shopify
1. Connectez-vous à votre boutique Shopify
2. Dans le menu de gauche, allez à **Boutique en ligne** > **Thèmes**

### Étape 3: Importer le thème
1. Dans la section "Bibliothèque de thèmes", cliquez sur **Ajouter un thème**
2. Sélectionnez **Importer un fichier ZIP**
3. Cliquez sur **Choisir un fichier** et sélectionnez `survival-gear-pro-theme.zip`
4. Cliquez sur **Importer**
5. Attendez que l'importation se termine (généralement 1-2 minutes)

### Étape 4: Activer le thème
1. Une fois importé, le thème apparaît dans votre bibliothèque
2. Cliquez sur **Actions** > **Publier** pour l'activer immédiatement
   OU
   Cliquez sur **Personnaliser** pour le configurer avant activation

## Configuration Initiale

### 1. Paramètres Généraux
Dans l'éditeur de thème :
- **Logo** : Téléchargez votre logo (format PNG ou SVG recommandé)
- **Couleurs** : Personnalisez la palette de couleurs
- **Typographie** : Sélectionnez vos polices

### 2. En-tête (Header)
- Configurez le texte de la barre supérieure
- Créez votre menu de navigation (Boutique en ligne > Navigation)
- Ajoutez une image pour le megamenu si souhaité

### 3. Page d'Accueil
Ajoutez et configurez les sections :
1. **Hero Banner** : Image de fond et texte d'accroche
2. **Collections en vedette** : Sélectionnez 3-4 collections
3. **Kit Builder** : Personnalisez les options
4. **Produits en vedette** : Choisissez une collection
5. **Articles de blog** : Sélectionnez votre blog

### 4. Produits
- Activez/désactivez l'affichage du poids, dimensions, etc.
- Configurez les métachamps personnalisés si nécessaire :
  - `custom.weight` : Poids du produit
  - `custom.dimensions` : Dimensions
  - `custom.material` : Matériau
  - `custom.waterproof` : Étanchéité

### 5. Pied de page (Footer)
- Configurez les menus de footer
- Ajoutez vos informations de contact
- Personnalisez le texte de newsletter

## Fonctionnalités Avancées

### Mode Sombre
- Activé par défaut dans Paramètres du thème > Optimisations
- Les visiteurs peuvent basculer avec le bouton dans l'en-tête
- La préférence est sauvegardée localement

### Wishlist (Liste de souhaits)
- Activé par défaut
- Fonctionne sans app tierce
- Stockage local dans le navigateur

### Convertisseur de Devise
- Activé par défaut pour EUR, USD, GBP
- Installation d'une app de conversion recommandée pour les taux réels

### Kit Builder
Section interactive pour aider les clients à composer leur équipement :
- Personnalisez les options dans les paramètres de la section
- Les produits recommandés peuvent être liés via métachamps

## Personnalisation Avancée

### CSS Personnalisé
Ajoutez votre CSS dans : Paramètres du thème > CSS personnalisé
```css
/* Exemple : Changer la couleur primaire */
:root {
  --primary-color: #1a5f3a;
}
```

### JavaScript Personnalisé
Ajoutez dans : Paramètres du thème > JavaScript personnalisé
```javascript
// Votre code JS personnalisé
```

## Applications Recommandées

Pour maximiser les fonctionnalités :
1. **Judge.me** ou **Yotpo** : Avis produits
2. **Wishlist Plus** : Wishlist avancée
3. **Multi Currency Converter** : Conversion de devise
4. **SEO Manager** : Optimisation SEO

## Résolution de Problèmes

### Le thème ne s'importe pas
- Vérifiez la taille du fichier (max 50 MB)
- Assurez-vous que c'est un fichier ZIP valide
- Essayez avec un autre navigateur

### Les images ne s'affichent pas
- Vérifiez que les images sont bien téléchargées
- Format recommandé : JPG ou PNG
- Taille recommandée : 1200x1200 px pour produits

### Le menu ne fonctionne pas
- Allez dans Navigation > Créez un menu "main-menu"
- Assignez-le dans les paramètres du header

## Support

- Documentation Shopify : https://help.shopify.com/
- Forum Communauté : https://community.shopify.com/
- Support technique : support@survivalgear.com

## Mise à Jour

Pour mettre à jour vers une nouvelle version :
1. Importez le nouveau thème comme thème séparé
2. Comparez avec votre thème actuel
3. Copiez vos paramètres personnalisés
4. Testez avant de publier

---

**Bon succès avec votre boutique Survival Gear Pro !** 🏕️
