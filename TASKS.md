# TÂCHES - SURVIVAL GEAR THEME IMPROVEMENTS

## 📋 Légende des statuts

- ✅ **Complété** : Tâche terminée et testée
- 🔄 **En cours** : Tâche en cours de réalisation
- 📝 **À faire** : Tâche planifiée mais non démarrée
- ⏸️ **En attente** : Bloqué ou en attente de validation
- 🔥 **Priorité haute** : À faire en priorité

---

## 🎯 PHASE 1 : WIDGET TRIPADVISOR & SETUP

### Widget TripAdvisor
- [x] Créer `snippets/tripadvisor-badge.liquid` ✅
- [x] Intégrer dans `blocks/_product-details.liquid` ✅
- [x] Ajouter settings dans schema (enable/disable + locationId) ✅
- [x] Créer CSS dans `assets/custom-enhancements.css` ✅
- [x] Charger CSS dans `snippets/stylesheets.liquid` ✅
- [ ] Tester sur page produit réelle 📝
- [ ] Obtenir locationId TripAdvisor réel 📝
- [ ] Valider responsive mobile/tablette 📝

### Documentation & Structure
- [x] Créer BRIEF.md ✅
- [x] Créer PLAN.md ✅
- [x] Créer TASKS.md (ce fichier) ✅
- [ ] Créer CHANGELOG.md 📝
- [ ] Créer guide de migration 📝

---

## 🎯 PHASE 2 : TRUST & CRO ELEMENTS 🔥

### Snippets de confiance

#### `snippets/trust-badges.liquid` 📝
- [ ] Créer le snippet
- [ ] Design des badges (livraison, paiement, garantie, SAV)
- [ ] Rendre configurable via settings
- [ ] CSS responsive
- [ ] Intégrer sur :
  - [ ] Pages produit (sous prix)
  - [ ] Cart drawer
  - [ ] Footer (nouvelle section)

#### `snippets/stock-urgency.liquid` 📝
- [ ] Créer le snippet
- [ ] Logic stock < 5 unités
- [ ] Messages personnalisables
- [ ] CSS urgency style
- [ ] Intégrer sur pages produit
- [ ] Tests avec différents niveaux de stock

#### `snippets/free-shipping-banner.liquid` 📝
- [ ] Créer le snippet
- [ ] Calcul montant restant pour livraison gratuite
- [ ] Barre de progression visuelle
- [ ] Messages dynamiques :
  - "Plus que X€ pour la livraison gratuite"
  - "Félicitations, livraison gratuite !"
- [ ] CSS animations
- [ ] Intégrer dans :
  - [ ] Header (announcement bar)
  - [ ] Cart drawer
  - [ ] Page panier

#### `snippets/product-badge.liquid` 📝
- [ ] Créer le snippet
- [ ] Types de badges :
  - Nouveau (< 30 jours)
  - Promo (prix comparé)
  - Best-seller (via tags)
  - Stock limité
- [ ] CSS des badges
- [ ] Position sur product cards
- [ ] Tests avec différents produits

### Social Proof

#### `snippets/reviews-summary.liquid` 📝
- [ ] Créer le snippet
- [ ] Intégration app reviews (Judge.me / Loox)
- [ ] Affichage étoiles + nombre d'avis
- [ ] CSS inline avec produit
- [ ] Schema markup pour SEO

#### `snippets/recently-viewed.liquid` 📝
- [ ] Créer le snippet
- [ ] JavaScript pour tracking (localStorage)
- [ ] Affichage slider produits vus
- [ ] Intégrer sur pages produit
- [ ] Tests multi-sessions

---

## 🎯 PHASE 3 : PAGES PRODUIT (PDP) OPTIMIZATIONS

### Product Information

#### Améliorations générales 📝
- [ ] Sticky add-to-cart mobile
- [ ] Breadcrumbs améliorés (avec schema)
- [ ] Partage social visible
- [ ] Quantity selector amélioré
- [ ] Variant picker style pills/swatches

#### Bloc Product Details 📝
- [ ] Ajouter bloc "Pourquoi nous choisir"
- [ ] Ajouter bloc FAQ produit (accordion)
- [ ] Ajouter shipping calculator
- [ ] Ajouter size guide modal
- [ ] Améliorer product description (tabs vs accordion)

#### Product Gallery 📝
- [ ] Zoom amélioré (mobile pinch-to-zoom)
- [ ] Video support thumbnail
- [ ] Image gallery navigation (dots + arrows)
- [ ] Lightbox modal
- [ ] Lazy loading images

### Sections produit additionnelles 🔥

#### Section "Produits similaires" 📝
- [ ] Créer `sections/product-related.liquid`
- [ ] Logic produits de la même collection
- [ ] Slider responsive
- [ ] Quick add to cart
- [ ] Intégrer dans template produit

#### Section "Récemment consultés" 📝
- [ ] Utiliser snippet recently-viewed
- [ ] Créer section dédiée
- [ ] Settings enable/disable
- [ ] Intégrer dans template produit

#### Section Trust/Reassurance 📝
- [ ] Créer `sections/product-trust.liquid`
- [ ] Blocs configurables (garanties, livraison, retours)
- [ ] Icons + textes
- [ ] Placement avant add-to-cart

---

## 🎯 PHASE 4 : COLLECTIONS & NAVIGATION

### Collection Page

#### Filtres & Tri 📝
- [ ] Améliorer style filtres (pills modernes)
- [ ] Filtres collapsibles mobile
- [ ] Clear all filters button
- [ ] Active filters display
- [ ] Tri rapide (prix, popularité, nouveautés)
- [ ] Résultats count visible

#### Product Cards 📝 🔥
- [ ] Hover effect images (2e image)
- [ ] Quick view button on hover
- [ ] Quick add to cart
- [ ] Variant selector sur card (si 1 variant type)
- [ ] Compare checkbox
- [ ] Wishlist heart icon
- [ ] Trust badges sur cards (si promo)

#### Quick View Modal 📝
- [ ] Créer `sections/quick-view-modal.liquid`
- [ ] Affichage rapide produit
- [ ] Sélection variante
- [ ] Add to cart direct
- [ ] JavaScript modal handler

#### Collection Banner 📝
- [ ] Section hero collection personnalisée
- [ ] Image + titre + description
- [ ] CTA vers produit phare
- [ ] Configurable par collection

### Navigation

#### Header Improvements 📝 🔥
- [ ] Free shipping announcement dynamique (snippet)
- [ ] Sticky header optimisé
- [ ] Cart icon avec mini preview on hover
- [ ] Search autocomplete amélioré
- [ ] Mobile hamburger menu smooth
- [ ] Mega menu desktop (si besoin)

#### Search 📝
- [ ] Predictive search amélioré
- [ ] Product images dans suggestions
- [ ] Collections suggestions
- [ ] Popular searches
- [ ] No results message + suggestions

---

## 🎯 PHASE 5 : CART & CHECKOUT

### Cart Drawer Improvements 📝 🔥

#### Fonctionnalités
- [ ] Free shipping progress bar
- [ ] Upsells / Cross-sells
- [ ] Discount code field stylé
- [ ] Trust badges dans drawer
- [ ] Sticky footer avec total + CTA
- [ ] Empty cart state amélioré
- [ ] Remove item confirmation

#### Cart Upsells 📝
- [ ] Créer `snippets/cart-upsells.liquid`
- [ ] Logic produits recommandés
- [ ] Quick add depuis cart
- [ ] "Souvent achetés ensemble"
- [ ] Settings configurables

#### Notes & Gift Options 📝
- [ ] Note commande expandable
- [ ] Gift message option
- [ ] Gift wrapping option (si applicable)
- [ ] Special instructions

### Main Cart Page 📝
- [ ] Améliorer layout
- [ ] Trust badges section
- [ ] Continue shopping CTA
- [ ] Recommended products
- [ ] Checkout button sticky mobile

---

## 🎯 PHASE 6 : HOMEPAGE

### Hero Section 📝 🔥

#### Améliorations hero.liquid
- [ ] Video background support
- [ ] CTA plus visible (size + color)
- [ ] Trust badges sous le hero
- [ ] Countdown timer option (pour promos)
- [ ] Overlay optimisé pour lisibilité
- [ ] Mobile responsive text

### Collection Featured 📝
- [ ] Améliorer section collection-list
- [ ] Cards avec hover effects
- [ ] CTA sur chaque collection
- [ ] Grid responsive (2/3/4 colonnes)

### Trust Section 📝
- [ ] Créer `sections/trust-home.liquid`
- [ ] 4 colonnes (livraison, retours, paiement, SAV)
- [ ] Icons + texte
- [ ] Configurable Theme Editor
- [ ] Placement après hero

### Testimonials/Reviews 📝
- [ ] Créer `sections/testimonials.liquid`
- [ ] Slider reviews clients
- [ ] Étoiles + texte + nom/photo
- [ ] Social proof (nombre clients)
- [ ] Intégration app reviews

### Instagram Feed 📝
- [ ] Créer `sections/instagram-feed.liquid`
- [ ] Affichage derniers posts
- [ ] Grid 4-6 images
- [ ] Lien vers Instagram
- [ ] Hashtag customizable

---

## 🎯 PHASE 7 : FOOTER

### ⚠️ Contrainte : NE PAS SUPPRIMER d'éléments existants

#### Ajouts AVANT le footer 📝

##### Section Trust Pre-Footer
- [ ] Créer `sections/footer-trust.liquid`
- [ ] Trust badges full width
- [ ] Paiement sécurisé icons
- [ ] Garanties visibles
- [ ] Placement avant footer existant

##### Newsletter Section 📝
- [ ] Améliorer section newsletter
- [ ] Incentive clair (ex: "10% sur première commande")
- [ ] Design moderne
- [ ] RGPD compliant
- [ ] Thank you message

#### Footer existant 📝
- [ ] Vérifier tous les liens fonctionnent
- [ ] Améliorer typographie si besoin
- [ ] Ajouter icons réseaux sociaux (si manquants)
- [ ] Mobile responsive check

---

## 🎯 PHASE 8 : ASSETS & SCRIPTS

### JavaScript Custom 📝

#### `assets/custom-enhancements.js`
- [ ] Créer le fichier
- [ ] Module: StockUrgency
  - [ ] Countdown en temps réel
  - [ ] Update via AJAX
- [ ] Module: ExitIntent
  - [ ] Détection exit
  - [ ] Popup modal
  - [ ] Discount offer
- [ ] Module: QuickView
  - [ ] Modal handler
  - [ ] Product fetch
  - [ ] Add to cart
- [ ] Module: CartUpsells
  - [ ] Recommendations logic
  - [ ] Display in cart drawer
- [ ] Module: ShippingProgress
  - [ ] Calcul montant restant
  - [ ] Update bar
- [ ] Module: RecentlyViewed
  - [ ] localStorage management
  - [ ] Display products
- [ ] Charger dans theme.liquid

### CSS Extensions 📝

#### `assets/custom-animations.css`
- [ ] Créer le fichier
- [ ] Hover effects produits
- [ ] Loading spinners
- [ ] Scroll animations (AOS-like)
- [ ] Button micro-interactions
- [ ] Transition smoothes
- [ ] Charger dans stylesheets.liquid

#### Extensions `custom-enhancements.css` 📝
- [ ] Collection grid styles
- [ ] Cart drawer amélioré
- [ ] Header sticky styles
- [ ] Footer trust section
- [ ] Product gallery zoom
- [ ] Quick add animations
- [ ] Mobile optimizations supplémentaires

---

## 🎯 PHASE 9 : PERFORMANCE OPTIMIZATION ⚡

### Images 📝
- [ ] Audit toutes les images
- [ ] Lazy loading native + JS fallback
- [ ] Conversion WebP avec fallback
- [ ] Responsive images (srcset)
- [ ] Compression optimale (TinyPNG)
- [ ] Preload hero image
- [ ] Dimensions width/height explicites

### CSS Optimization 📝
- [ ] Critical CSS inline
- [ ] Non-critical CSS async load
- [ ] Purge unused CSS
- [ ] Minification
- [ ] Combine fichiers si possible

### JavaScript Optimization 📝
- [ ] Defer non-critical scripts
- [ ] Async loading
- [ ] Bundle et minify
- [ ] Tree shaking
- [ ] Remove console.logs

### Liquid Optimization 📝
- [ ] Review assign vs capture usage
- [ ] Minimize nested loops
- [ ] Use `{% liquid %}` blocks
- [ ] Optimize `{% render %}` calls
- [ ] Cache où possible

### Shopify Performance 📝
- [ ] Optimize theme.liquid
- [ ] Section rendering audit
- [ ] Reduce app scripts
- [ ] HTTP/2 Push hints
- [ ] Preconnect external domains

### Testing Performance 📝
- [ ] Google PageSpeed Insights
  - [ ] Mobile score > 80
  - [ ] Desktop score > 90
- [ ] GTmetrix audit
- [ ] WebPageTest analysis
- [ ] Lighthouse CI
- [ ] Real User Monitoring

---

## 🎯 PHASE 10 : SEO OPTIMIZATION 🔍

### Structured Data 📝
- [ ] Product schema
  - [ ] Price
  - [ ] Availability
  - [ ] Reviews/ratings
  - [ ] Brand
  - [ ] SKU
- [ ] Breadcrumb schema
- [ ] Organization schema
- [ ] Review schema (aggregate)
- [ ] FAQ schema (si applicable)
- [ ] Video schema (si videos produit)

### Meta Tags 📝
- [ ] Meta descriptions dynamiques
  - [ ] Homepage
  - [ ] Collections
  - [ ] Produits
  - [ ] Pages
- [ ] OpenGraph tags
  - [ ] og:title
  - [ ] og:description
  - [ ] og:image
  - [ ] og:type
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Hreflang (si multi-langue)

### Content SEO 📝
- [ ] H1 unique par page
- [ ] Hiérarchie headings (H1>H2>H3)
- [ ] Alt text images
- [ ] Internal linking strategy
- [ ] Breadcrumbs visible + schema

### Technical SEO 📝
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] 404 page optimisée
- [ ] Redirect gestion
- [ ] Mobile-friendly test
- [ ] Core Web Vitals
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

---

## 🎯 PHASE 11 : MOBILE OPTIMIZATIONS 📱

### Touch & Interactions 📝
- [ ] Tous touch targets >= 48x48px
- [ ] Swipe product gallery
- [ ] Pull-to-refresh (si applicable)
- [ ] Haptic feedback (iOS)
- [ ] Prevent zoom on inputs

### Layout Mobile 📝
- [ ] Sticky header optimisé
- [ ] Sticky add-to-cart
- [ ] Bottom navigation bar (optionnel)
- [ ] Hamburger menu smooth
- [ ] Full-width images
- [ ] Readable font sizes (min 16px)

### Performance Mobile 📝
- [ ] Reduce mobile payload
- [ ] Mobile-specific images
- [ ] Defer offscreen content
- [ ] Optimize for 3G networks

### Testing Devices 📝
- [ ] iPhone SE (320px)
- [ ] iPhone 14 Pro (390px)
- [ ] Samsung Galaxy (360px)
- [ ] iPad (768px)
- [ ] Test landscape orientation

---

## 🎯 PHASE 12 : SETTINGS & CONFIGURATION

### Theme Settings 📝

#### `config/settings_schema.json` ajouts
- [ ] Section "Trust & CRO"
  - [ ] Enable trust badges
  - [ ] Free shipping threshold
  - [ ] Stock urgency threshold
- [ ] Section "Colors Custom"
  - [ ] Trust badge color
  - [ ] Urgency color
  - [ ] Success color
- [ ] Section "Typography Custom"
  - [ ] CTA font weight
  - [ ] Heading letter spacing
- [ ] Section "Performance"
  - [ ] Enable lazy loading
  - [ ] Enable animations
  - [ ] Enable quick view

### Section Settings 📝
- [ ] Toutes sections ont des settings utiles
- [ ] Labels en français
- [ ] Info/help text clairs
- [ ] Defaults sensibles
- [ ] Visible_if conditions propres

---

## 🎯 PHASE 13 : TESTING & QA 🧪

### Tests Fonctionnels 📝

#### Pages principales
- [ ] Homepage
  - [ ] Hero display
  - [ ] Sections chargent
  - [ ] Links fonctionnent
- [ ] Collection page
  - [ ] Filtres
  - [ ] Tri
  - [ ] Product cards
  - [ ] Pagination
- [ ] Product page
  - [ ] Images gallery
  - [ ] Variant selection
  - [ ] Add to cart
  - [ ] TripAdvisor widget
- [ ] Cart
  - [ ] Add/remove items
  - [ ] Quantity update
  - [ ] Discount codes
  - [ ] Checkout

#### Navigations
- [ ] Header links
- [ ] Footer links
- [ ] Mobile menu
- [ ] Search
- [ ] Breadcrumbs

### Tests Responsive 📝
- [ ] Mobile portrait
- [ ] Mobile landscape
- [ ] Tablet portrait
- [ ] Tablet landscape
- [ ] Desktop small (1366px)
- [ ] Desktop large (1920px+)

### Tests Cross-Browser 📝
- [ ] Chrome
- [ ] Safari (macOS)
- [ ] Safari (iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet

### Tests Performance 📝
- [ ] PageSpeed Mobile
- [ ] PageSpeed Desktop
- [ ] GTmetrix
- [ ] WebPageTest
- [ ] Lighthouse audit

### Tests Accessibility 📝
- [ ] Keyboard navigation
- [ ] Screen reader (NVDA/JAWS)
- [ ] Color contrast
- [ ] Focus visible
- [ ] ARIA labels
- [ ] Alt text images

---

## 🎯 PHASE 14 : ANALYTICS & TRACKING 📊

### Google Analytics 4 📝
- [ ] Installation GA4
- [ ] E-commerce tracking
- [ ] Custom events:
  - [ ] Add to cart
  - [ ] Remove from cart
  - [ ] Begin checkout
  - [ ] Purchase
  - [ ] Quick view open
  - [ ] Filter used

### Facebook Pixel 📝
- [ ] Installation pixel
- [ ] Events tracking
- [ ] Conversion tracking

### Hotjar / Clarity 📝
- [ ] Installation tracking
- [ ] Heatmaps setup
- [ ] Session recordings
- [ ] Surveys (optionnel)

### Conversion Tracking 📝
- [ ] Goals setup
- [ ] Funnel analysis
- [ ] A/B test tracking

---

## 🎯 PHASE 15 : DOCUMENTATION FINALE 📚

### Documentation technique 📝
- [ ] Compléter README.md
- [ ] Guide installation
- [ ] Guide configuration
- [ ] Troubleshooting guide

### Documentation utilisateur 📝
- [ ] Guide Theme Editor
- [ ] Comment configurer TripAdvisor
- [ ] Comment ajouter produits
- [ ] Comment gérer collections

### Documentation développeur 📝
- [ ] Architecture overview
- [ ] Code conventions
- [ ] Git workflow
- [ ] Deployment process

### CHANGELOG 📝
- [ ] Toutes modifications documentées
- [ ] Versioning semantic
- [ ] Breaking changes notés

---

## 🎯 PHASE 16 : DEPLOYMENT & LAUNCH 🚀

### Pre-Launch Checklist 📝
- [ ] Backup thème actuel
- [ ] Tests complets sur thème preview
- [ ] Validation client
- [ ] Analytics installés
- [ ] SSL configuré
- [ ] Domaine configuré

### Launch 📝
- [ ] Publier thème
- [ ] Monitor analytics première heure
- [ ] Check erreurs console
- [ ] Test transactions réelles
- [ ] Monitor performance

### Post-Launch 📝
- [ ] Monitor 24h
- [ ] Corriger bugs urgents
- [ ] Collecter feedback
- [ ] Optimisations continues

---

## 📊 MÉTRIQUES À SUIVRE

### KPIs CRO
- [ ] Taux d'ajout au panier
- [ ] Taux de conversion
- [ ] Taux de rebond
- [ ] Pages/session
- [ ] Durée session
- [ ] Valeur moyenne commande

### KPIs Performance
- [ ] PageSpeed score
- [ ] LCP
- [ ] FID
- [ ] CLS
- [ ] Time to Interactive

### KPIs SEO
- [ ] Positions mots-clés
- [ ] Trafic organique
- [ ] Impressions
- [ ] CTR
- [ ] Pages indexées

---

## 🔥 PRIORITÉS IMMÉDIATES (Quick Wins)

1. **Trust badges** (impact CRO élevé) 🔥
2. **Stock urgency** (FOMO) 🔥
3. **Free shipping banner** (motivation achat) 🔥
4. **Product cards hover effects** (engagement) 🔥
5. **Cart drawer upsells** (augmente panier moyen) 🔥
6. **Mobile sticky add-to-cart** (facilite conversion mobile) 🔥

---

## ✅ CHECKLIST FINALE AVANT DÉPLOIEMENT

- [ ] Tous les tests passent
- [ ] Performance scores OK
- [ ] Responsive validé
- [ ] Cross-browser validé
- [ ] Analytics installés
- [ ] Documentation complète
- [ ] Backup créé
- [ ] Client a validé
- [ ] Plan de rollback prêt
- [ ] Support client informé

---

**Dernière mise à jour :** 23 décembre 2025  
**Statut global :** Phase 1 complétée ✅ | Phases 2-16 en planification 📝
