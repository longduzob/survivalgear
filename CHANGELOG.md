# CHANGELOG - SURVIVAL GEAR THEME

Toutes les modifications notables du thème seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Unreleased]

### À venir
- Trust badges système complet
- Stock urgency indicators
- Free shipping progress bar
- Collection page improvements
- Cart drawer enhancements
- Performance optimizations

---

## [0.2.0] - 2025-12-23

### Ajouté ✨
- **Documentation complète du projet**
  - `BRIEF.md` : Brief détaillé du projet
  - `PLAN.md` : Plan technique fichier par fichier
  - `TASKS.md` : Liste exhaustive des tâches
  - `CHANGELOG.md` : Ce fichier
  
- **CSS Custom**
  - `assets/custom-enhancements.css` : Fichier CSS pour toutes les améliorations custom
  - Styles TripAdvisor badge
  - Base CRO enhancements
  - Mobile optimizations
  - Trust elements styles
  - Performance optimizations (GPU acceleration, smooth scroll)
  - Accessibility improvements
  - Responsive design utilities

### Modifié 🔧
- `snippets/stylesheets.liquid` : Ajout du chargement de custom-enhancements.css

### Documentation 📚
- Structure complète de documentation créée
- Guide d'architecture du projet
- Roadmap de développement
- Métriques de succès définies

---

## [0.1.0] - 2025-12-23

### Ajouté ✨
- **Widget TripAdvisor**
  - `snippets/tripadvisor-badge.liquid` : Snippet pour afficher le widget TripAdvisor officiel
  - Widget configurable (enable/disable + locationId)
  - Script officiel TripAdvisor (jscache.com/wejs)
  - Support multi-langue (via request.locale)
  - Affichage conditionnel sur pages produit uniquement

### Modifié 🔧
- **blocks/_product-details.liquid**
  - Ajout du render du snippet tripadvisor-badge
  - Ajout de 2 settings dans le schema :
    - `enable_tripadvisor_badge` : Checkbox pour activer/désactiver
    - `tripadvisor_location_id` : Champ texte pour le locationId TripAdvisor
  - Settings placés dans section "Trust badge – TripAdvisor"

### Styles 🎨
- Styles du badge TripAdvisor dans custom-enhancements.css
- Design moderne avec backdrop-filter blur
- Border radius arrondi (14px)
- Responsive mobile (ajustements padding/margin)
- Optimisations accessibilité (loading lazy, dimensions explicites)

### Technique ⚙️
- Architecture migration-safe respectée
- Tous les ajouts sont modulaires et réversibles
- Compatibilité Theme Editor complète
- Pas de modifications destructives

---

## Structure des versions

### Format de version : MAJOR.MINOR.PATCH

- **MAJOR** : Changements incompatibles avec les versions précédentes
- **MINOR** : Ajout de fonctionnalités compatibles avec les versions précédentes
- **PATCH** : Corrections de bugs compatibles avec les versions précédentes

---

## Types de changements

- **Ajouté** (✨) : Nouvelles fonctionnalités
- **Modifié** (🔧) : Changements dans des fonctionnalités existantes
- **Déprécié** (⚠️) : Fonctionnalités bientôt supprimées
- **Supprimé** (🗑️) : Fonctionnalités supprimées
- **Corrigé** (🐛) : Corrections de bugs
- **Sécurité** (🔒) : Correctifs de sécurité
- **Documentation** (📚) : Modifications de documentation uniquement
- **Styles** (🎨) : Changements de styles/CSS
- **Performance** (⚡) : Améliorations de performance
- **Technique** (⚙️) : Changements techniques/infrastructure

---

## Notes de migration

### Migration 0.1.0 → 0.2.0
Pas d'action requise. Ajouts de documentation uniquement.

### Installation initiale 0.1.0

1. **Fichiers à créer/copier :**
   - `snippets/tripadvisor-badge.liquid`
   - `assets/custom-enhancements.css`

2. **Fichiers à modifier :**
   - `blocks/_product-details.liquid`
     - Ajouter `{% render 'tripadvisor-badge' %}` après le content_for 'blocks'
     - Ajouter les settings TripAdvisor dans le schema
   - `snippets/stylesheets.liquid`
     - Ajouter `{{ 'custom-enhancements.css' | asset_url | stylesheet_tag }}`

3. **Configuration Theme Editor :**
   - Aller dans la section Product information
   - Activer "Afficher le bandeau TripAdvisor"
   - Renseigner le locationId TripAdvisor

4. **Obtenir le locationId TripAdvisor :**
   - Se connecter à TripAdvisor Management Center
   - Aller dans "Widgets"
   - Choisir le widget approprié
   - Copier le locationId du code fourni

---

## Roadmap

### Version 0.3.0 (Planifiée)
- [ ] Trust badges système
- [ ] Stock urgency indicators
- [ ] Free shipping progress bar
- [ ] Product badges (new, promo, best-seller)

### Version 0.4.0 (Planifiée)
- [ ] Collection page improvements
- [ ] Product cards enhanced
- [ ] Quick view functionality
- [ ] Filters improvements

### Version 0.5.0 (Planifiée)
- [ ] Cart drawer enhancements
- [ ] Cart upsells
- [ ] Header improvements
- [ ] Footer trust section

### Version 0.6.0 (Planifiée)
- [ ] Performance optimizations
- [ ] Image optimizations
- [ ] CSS/JS optimizations
- [ ] Lazy loading

### Version 1.0.0 (Release)
- [ ] SEO optimizations complètes
- [ ] Analytics & tracking
- [ ] Documentation complète
- [ ] Tests validés
- [ ] Déploiement production

---

## Support

Pour toute question ou problème :
1. Consulter la documentation (BRIEF.md, PLAN.md, TASKS.md)
2. Vérifier les issues connues ci-dessous
3. Contacter le développeur

---

## Issues connues

### v0.1.0
- ⚠️ Widget TripAdvisor nécessite un locationId valide pour s'afficher
- ⚠️ Le script TripAdvisor est chargé de façon asynchrone (peut y avoir un délai d'affichage)
- ℹ️ Le badge ne s'affiche que si `enable_tripadvisor_badge` est activé ET `tripadvisor_location_id` est renseigné

### v0.2.0
Aucune issue connue.

---

## Contributeurs

- **Développeur principal** : [À renseigner]
- **Client** : Survival Gear
- **Thème de base** : Shopify Horizon

---

## Licence

Thème propriétaire - Tous droits réservés

---

**Dernière mise à jour :** 23 décembre 2025
