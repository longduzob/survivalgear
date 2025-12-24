# BRIEF PROJET - SURVIVAL GEAR SHOPIFY THEME

## 📋 Contexte

**Thème Shopify :** Horizon (export Shopify)  
**Type de boutique :** Dropshipping outdoor  
**Cible principale :** Hommes  
**Date de démarrage :** 23 décembre 2025

## 🎯 Objectifs

Améliorer grandement le thème sur plusieurs axes :

1. **CRO (Conversion Rate Optimization)**
   - Amélioration des call-to-action
   - Trust badges et signaux de confiance
   - Urgence et rareté
   - Social proof

2. **Design**
   - Interface moderne et épurée
   - Cohérence visuelle
   - Expérience utilisateur optimale

3. **Mobile First**
   - Responsive design parfait
   - Touch targets optimisés (min 48px)
   - Navigation fluide

4. **Confiance**
   - Badge TripAdvisor (pages produit uniquement)
   - Garanties visibles
   - Réassurance client

5. **Performance**
   - Optimisation des images
   - Lazy loading
   - CSS/JS optimisés
   - Core Web Vitals

6. **SEO**
   - Structured data
   - Balises meta optimisées
   - Performance technique

## 🚨 Contraintes Importantes

### ✅ À RESPECTER IMPÉRATIVEMENT

- **Garder la compatibilité Shopify** : toutes les modifications doivent rester compatibles avec les mises à jour du thème
- **Ne supprimer AUCUN élément du footer** : conserver tous les contenus et liens existants
- **Approche migration-friendly** : modifications modulaires via snippets, settings et fichiers custom
- **Pas de modifications destructives** : toujours pouvoir revenir en arrière

### ❌ À ÉVITER

- Modifications directes des fichiers core sans backup
- Suppression d'éléments existants du footer
- Code non compatible avec le Theme Editor
- Dépendances externes lourdes

## 🎨 Inspirations

### Site de référence 1 : Outdoor Line
**URL :** https://www.outdoorline.eu/

**Points à retenir :**
- Design épuré et professionnel
- Navigation claire
- Fiches produits détaillées
- Trust badges bien placés

### Site de référence 2 : Source Outdoor
**URL :** https://sourceoutdoor.com/fr/product-category/outdoor-gear-fr/

**Points à retenir :**
- Filtres de collection efficaces
- Cards produits optimisées
- Mise en avant des promotions
- Social proof visible

## 🔧 Modifications Implémentées

### ✅ Widget TripAdvisor (COMPLÉTÉ)

**Fichiers créés/modifiés :**
- ✅ `snippets/tripadvisor-badge.liquid` - Nouveau snippet
- ✅ `blocks/_product-details.liquid` - Ajout du render + settings schema
- ✅ `assets/custom-enhancements.css` - Styles du badge
- ✅ `snippets/stylesheets.liquid` - Chargement du CSS custom

**Configuration dans Theme Editor :**
- Enable/Disable toggle
- locationId configurable
- Visible uniquement sur les pages produit

## 📦 Livrables

### Phase 1 : Widget TripAdvisor ✅
- [x] Snippet tripadvisor-badge.liquid
- [x] Intégration dans product-information
- [x] Settings dans le schema
- [x] CSS propre et responsive

### Phase 2 : Documentation 🔄
- [ ] Plan de modifications fichier par fichier
- [ ] Guide de migration
- [ ] Checklist de tests

### Phase 3 : Améliorations CRO 📝
- [ ] Home page optimizations
- [ ] Collection page enhancements
- [ ] Product page (PDP) improvements
- [ ] Cart drawer upgrades
- [ ] Header optimizations
- [ ] Footer enhancements (sans suppression)

### Phase 4 : Performance 📝
- [ ] Image optimization
- [ ] Lazy loading
- [ ] CSS/JS minification
- [ ] Core Web Vitals optimization

### Phase 5 : SEO 📝
- [ ] Structured data
- [ ] Meta tags optimization
- [ ] Performance SEO
- [ ] Schema markup

## 🗂️ Structure Fichiers Custom

```
/assets/
  ├── custom-enhancements.css       ✅ Créé
  
/snippets/
  ├── tripadvisor-badge.liquid      ✅ Créé
  
/blocks/
  ├── _product-details.liquid       ✅ Modifié
  
/sections/
  ├── product-information.liquid    (Utilise le bloc modifié)
```

## 🚀 Prochaines Étapes

1. Créer le plan détaillé des modifications (PLAN.md)
2. Lister les tâches spécifiques (TASKS.md)
3. Implémenter les améliorations CRO
4. Optimiser les performances
5. Tests et validations

## 📞 Support & Questions

Pour toute question sur l'implémentation, se référer à :
- [PLAN.md](./PLAN.md) - Plan détaillé des modifications
- [TASKS.md](./TASKS.md) - Liste des tâches
- [CHANGELOG.md](./CHANGELOG.md) - Historique des modifications
