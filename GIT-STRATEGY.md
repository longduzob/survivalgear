# PLAN GIT & PR STRATEGY - SURVIVAL GEAR REFONTE

**Date**: 24 décembre 2025  
**Projet**: Refonte thème Shopify Horizon → Outdoor Premium  
**Repo**: longduzob/survivalgear

---

## 🌳 STRATÉGIE DE BRANCHES

### Structure Git

```
main (production-ready)
  ├── develop (integration)
  │   ├── feature/pdp-cro
  │   ├── feature/cart-drawer-premium
  │   ├── feature/header-outdoor
  │   ├── feature/collection-premium
  │   ├── feature/homepage-premium
  │   ├── feature/footer-trust
  │   └── feature/performance
  └── hotfix/* (si nécessaire)
```

### Workflow

1. **Créer branch develop** depuis main
2. **Créer feature branches** depuis develop
3. **Développer atomiquement** (1 feature = 1 branch)
4. **PR vers develop** (review + tests)
5. **Merge develop → main** (release)

---

## 📝 FEATURE BRANCHES DÉTAILLÉES

### 1️⃣ `feature/pdp-cro` (Priorité MAXIMALE 🔥🔥🔥)

**Objectif**: Optimiser la page produit pour la conversion

#### Commits atomiques prévus:

```bash
feat(pdp): add sticky add-to-cart mobile component
feat(pdp): add trust badges section with icons
feat(pdp): implement stock urgency indicator
feat(pdp): add free shipping badge
feat(pdp): create FAQ accordion component
feat(pdp): enhance cross-sell section
style(pdp): add outdoor premium styling
docs(pdp): update CHANGELOG for PDP improvements
```

#### Fichiers à créer:

```
/assets/
  ├── custom-outdoor-pdp.css
  └── custom-outdoor-pdp.js

/snippets/
  ├── outdoor-sticky-atc.liquid
  ├── outdoor-pdp-trust-badges.liquid
  ├── outdoor-stock-urgency.liquid
  ├── outdoor-free-shipping-badge.liquid
  ├── outdoor-faq-accordion.liquid
  └── outdoor-product-cross-sell.liquid
```

#### Fichiers à modifier:

```
/blocks/
  └── _product-details.liquid (ajouter renders + settings)

/sections/
  └── product-information.liquid (inclure snippets)
```

#### Settings à ajouter (schema JSON):

```json
{
  "type": "header",
  "content": "🎯 CRO Optimizations"
},
{
  "type": "checkbox",
  "id": "enable_sticky_atc_mobile",
  "label": "Sticky Add-to-Cart (Mobile)",
  "default": true
},
{
  "type": "checkbox",
  "id": "enable_pdp_trust_badges",
  "label": "Show trust badges",
  "default": true
},
{
  "type": "checkbox",
  "id": "enable_stock_urgency",
  "label": "Show stock urgency",
  "default": true
},
{
  "type": "range",
  "id": "stock_urgency_threshold",
  "label": "Stock urgency threshold",
  "min": 1,
  "max": 20,
  "default": 5
},
{
  "type": "checkbox",
  "id": "enable_faq_accordion",
  "label": "Show FAQ accordion",
  "default": true
},
{
  "type": "richtext",
  "id": "faq_content",
  "label": "FAQ content"
}
```

#### Tests requis:
- [ ] Sticky ATC fonctionne scroll down/up
- [ ] Trust badges responsive
- [ ] Stock urgency s'update dynamiquement
- [ ] FAQ accordion accessible
- [ ] Cross-sell fetch produits corrects
- [ ] Mobile < 768px perfect
- [ ] Tablet 768-1024px
- [ ] Desktop > 1024px

#### Estimation: **2-3 jours**

---

### 2️⃣ `feature/cart-drawer-premium` (Priorité HAUTE 🔥🔥🔥)

**Objectif**: Cart drawer avec free shipping progress, upsells, trust

#### Commits atomiques:

```bash
feat(cart): add free shipping progress bar
feat(cart): implement delivery estimation
feat(cart): create upsell slider component
feat(cart): add trust badges in drawer footer
feat(cart): enhance promo code UI
feat(cart): display total savings
style(cart): outdoor premium cart styling
test(cart): add cart interactions tests
docs(cart): update cart drawer documentation
```

#### Fichiers à créer:

```
/assets/
  ├── custom-outdoor-cart.css
  └── custom-outdoor-cart.js

/snippets/
  ├── outdoor-shipping-progress.liquid
  ├── outdoor-delivery-estimate.liquid
  ├── outdoor-cart-upsell.liquid
  ├── outdoor-cart-trust-badges.liquid
  └── outdoor-promo-code-ui.liquid
```

#### Fichiers à modifier:

```
/snippets/
  └── cart-drawer.liquid (intégrer nouveaux snippets)

/assets/
  └── cart-drawer.js (ajouter logique progress + upsells)
```

#### Logique JavaScript pour progress bar:

```javascript
// custom-outdoor-cart.js
class FreeShippingProgress {
  constructor(threshold = 5000) {
    this.threshold = threshold; // 50€ en centimes
    this.init();
  }

  init() {
    this.updateProgress();
    document.addEventListener('cart:update', () => this.updateProgress());
  }

  updateProgress() {
    const cartTotal = this.getCartTotal();
    const remaining = Math.max(0, this.threshold - cartTotal);
    const percentage = Math.min(100, (cartTotal / this.threshold) * 100);

    this.renderProgress(remaining, percentage);
  }

  getCartTotal() {
    // Fetch from cart API
    return fetch('/cart.js')
      .then(res => res.json())
      .then(cart => cart.total_price);
  }

  renderProgress(remaining, percentage) {
    const bar = document.querySelector('[data-shipping-progress-bar]');
    const message = document.querySelector('[data-shipping-progress-message]');
    
    if (bar) bar.style.width = `${percentage}%`;
    
    if (message) {
      if (remaining > 0) {
        message.innerHTML = `Plus que <strong>${(remaining/100).toFixed(2)}€</strong> pour la livraison gratuite !`;
      } else {
        message.innerHTML = `<strong>Félicitations !</strong> Livraison gratuite débloquée 🎉`;
      }
    }
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  new FreeShippingProgress(5000);
});
```

#### Settings à ajouter:

```json
{
  "type": "header",
  "content": "🛒 Cart Drawer Premium"
},
{
  "type": "number",
  "id": "free_shipping_threshold",
  "label": "Free shipping threshold (cents)",
  "default": 5000,
  "info": "50€ = 5000 cents"
},
{
  "type": "checkbox",
  "id": "show_shipping_progress",
  "label": "Show free shipping progress",
  "default": true
},
{
  "type": "checkbox",
  "id": "show_delivery_estimate",
  "label": "Show delivery estimate",
  "default": true
},
{
  "type": "text",
  "id": "delivery_time",
  "label": "Delivery time",
  "default": "2-4 jours ouvrés"
},
{
  "type": "checkbox",
  "id": "enable_cart_upsell",
  "label": "Enable cart upsells",
  "default": true
},
{
  "type": "collection",
  "id": "cart_upsell_collection",
  "label": "Upsell collection"
}
```

#### Tests:
- [ ] Progress bar s'update add/remove items
- [ ] Upsell fetch OK
- [ ] Delivery estimate affiche
- [ ] Trust badges visibles
- [ ] Promo code apply fonctionne
- [ ] Mobile drawer full-screen
- [ ] Animations smooth

#### Estimation: **2 jours**

---

### 3️⃣ `feature/header-outdoor` (Priorité HAUTE 🔥🔥)

**Objectif**: Header premium avec free shipping bar, nav outdoor, search améliorée

#### Commits atomiques:

```bash
feat(header): add free shipping announcement bar
feat(header): enhance navigation with icons
feat(header): implement search with product preview
feat(header): add cart preview on hover
feat(header): optimize sticky header shrink
style(header): outdoor premium header styling
refactor(header): improve mobile menu UX
perf(header): defer non-critical header scripts
docs(header): document header customization
```

#### Fichiers à créer:

```
/assets/
  ├── custom-outdoor-header.css
  └── custom-outdoor-header.js

/snippets/
  ├── outdoor-announcement-bar.liquid
  ├── outdoor-nav-icons.liquid
  ├── outdoor-search-preview.liquid
  └── outdoor-cart-preview.liquid

/sections/
  └── custom-header-announcements.liquid (ou modifier existant)
```

#### Fichiers à modifier:

```
/sections/
  └── header.liquid (intégrer announcement bar)

/blocks/
  └── _header-menu.liquid (ajouter icons)

/assets/
  └── header.js (cart preview logic)
```

#### Announcement Bar HTML:

```liquid
{%- comment -%} snippets/outdoor-announcement-bar.liquid {%- endcomment -%}

{%- if section.settings.enable_announcement_bar -%}
<div class="outdoor-announcement-bar" data-announcement-bar>
  <div class="outdoor-announcement-bar__content">
    <div class="outdoor-announcement-bar__message">
      {% if section.settings.announcement_icon %}
        <svg class="outdoor-announcement-bar__icon" width="20" height="20">
          <use href="#icon-{{ section.settings.announcement_icon }}"></use>
        </svg>
      {% endif %}
      
      <span class="outdoor-announcement-bar__text">
        {{ section.settings.announcement_text | default: "🚚 Livraison GRATUITE dès 50€ d'achat" }}
      </span>
    </div>
    
    {% if section.settings.announcement_link %}
      <a href="{{ section.settings.announcement_link }}" class="outdoor-announcement-bar__cta">
        {{ section.settings.announcement_cta_text | default: "En savoir plus" }}
      </a>
    {% endif %}
  </div>
</div>
{%- endif -%}
```

#### CSS pour announcement bar:

```css
/* custom-outdoor-header.css */
.outdoor-announcement-bar {
  background: linear-gradient(135deg, #2d5016 0%, #1a3d0a 100%);
  color: #ffffff;
  padding: 10px 20px;
  text-align: center;
  position: relative;
  z-index: 100;
}

.outdoor-announcement-bar__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  max-width: 1400px;
  margin: 0 auto;
}

.outdoor-announcement-bar__message {
  display: flex;
  align-items: center;
  gap: 8px;
}

.outdoor-announcement-bar__icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.outdoor-announcement-bar__text {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.outdoor-announcement-bar__cta {
  color: #d4af37;
  text-decoration: underline;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.outdoor-announcement-bar__cta:hover {
  color: #ffffff;
}

@media (max-width: 768px) {
  .outdoor-announcement-bar {
    padding: 8px 16px;
  }
  
  .outdoor-announcement-bar__content {
    flex-direction: column;
    gap: 8px;
  }
  
  .outdoor-announcement-bar__text {
    font-size: 12px;
  }
}
```

#### Settings:

```json
{
  "type": "header",
  "content": "🎯 Announcement Bar"
},
{
  "type": "checkbox",
  "id": "enable_announcement_bar",
  "label": "Show announcement bar",
  "default": true
},
{
  "type": "text",
  "id": "announcement_text",
  "label": "Announcement text",
  "default": "🚚 Livraison GRATUITE dès 50€ d'achat"
},
{
  "type": "select",
  "id": "announcement_icon",
  "label": "Icon",
  "options": [
    {"value": "truck", "label": "Truck"},
    {"value": "gift", "label": "Gift"},
    {"value": "star", "label": "Star"}
  ]
},
{
  "type": "url",
  "id": "announcement_link",
  "label": "Link (optional)"
},
{
  "type": "text",
  "id": "announcement_cta_text",
  "label": "CTA text",
  "default": "En savoir plus"
}
```

#### Tests:
- [ ] Announcement bar visible
- [ ] Nav icons s'affichent
- [ ] Search preview fonctionne
- [ ] Cart preview on hover OK
- [ ] Sticky shrink smooth
- [ ] Mobile menu amélioré
- [ ] Cross-browser OK

#### Estimation: **2-3 jours**

---

### 4️⃣ `feature/collection-premium` (Priorité MOYENNE 🔥🔥)

**Objectif**: Collections avec product cards premium, quick view, filters

#### Commits atomiques:

```bash
feat(collection): enhance product cards with hover effects
feat(collection): add quick view modal
feat(collection): implement quick add button
feat(collection): improve mobile filters drawer
feat(collection): create badge system (NEW/SALE/BESTSELLER)
feat(collection): enhance sort dropdown
style(collection): outdoor premium collection styling
test(collection): add collection interactions tests
docs(collection): document collection customization
```

#### Fichiers à créer:

```
/assets/
  ├── custom-outdoor-collection.css
  └── custom-outdoor-collection.js

/snippets/
  ├── outdoor-product-card-enhanced.liquid
  ├── outdoor-quick-view-modal.liquid
  ├── outdoor-quick-add-button.liquid
  ├── outdoor-product-badge.liquid
  └── outdoor-filters-drawer.liquid
```

#### Fichiers à modifier:

```
/sections/
  └── main-collection.liquid (intégrer snippets)

/blocks/
  └── filters.liquid (améliorer mobile drawer)

/snippets/
  └── product-card.liquid (ou créer override)
```

#### Product Card Enhanced:

```liquid
{%- comment -%} snippets/outdoor-product-card-enhanced.liquid {%- endcomment -%}

<div class="outdoor-product-card" data-product-id="{{ product.id }}">
  {%- comment -%} Badges {%- endcomment -%}
  {% render 'outdoor-product-badge', product: product %}
  
  {%- comment -%} Image with hover {%- endcomment -%}
  <div class="outdoor-product-card__image-wrapper">
    <a href="{{ product.url }}" class="outdoor-product-card__link">
      {% if product.featured_image %}
        <img 
          src="{{ product.featured_image | image_url: width: 600 }}"
          alt="{{ product.featured_image.alt | escape }}"
          class="outdoor-product-card__image outdoor-product-card__image--primary"
          loading="lazy"
          width="600"
          height="750"
        >
      {% endif %}
      
      {%- comment -%} 2nd image on hover {%- endcomment -%}
      {% if product.images[1] %}
        <img 
          src="{{ product.images[1] | image_url: width: 600 }}"
          alt="{{ product.images[1].alt | escape }}"
          class="outdoor-product-card__image outdoor-product-card__image--hover"
          loading="lazy"
          width="600"
          height="750"
        >
      {% endif %}
    </a>
    
    {%- comment -%} Quick view button {%- endcomment -%}
    {% if settings.enable_quick_view %}
      <button 
        class="outdoor-product-card__quick-view"
        data-quick-view="{{ product.handle }}"
        aria-label="Quick view {{ product.title }}"
      >
        <svg width="20" height="20"><use href="#icon-eye"></use></svg>
        <span>Aperçu rapide</span>
      </button>
    {% endif %}
  </div>
  
  {%- comment -%} Product info {%- endcomment -%}
  <div class="outdoor-product-card__info">
    <h3 class="outdoor-product-card__title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>
    
    {%- comment -%} Reviews (if app installed) {%- endcomment -%}
    {% if settings.enable_reviews %}
      <div class="outdoor-product-card__reviews" data-product-reviews="{{ product.id }}">
        {%- comment -%} Reviews app placeholder {%- endcomment -%}
      </div>
    {% endif %}
    
    {%- comment -%} Price {%- endcomment -%}
    <div class="outdoor-product-card__price">
      {% if product.compare_at_price > product.price %}
        <span class="outdoor-product-card__price-compare">
          {{ product.compare_at_price | money }}
        </span>
        <span class="outdoor-product-card__price-current outdoor-product-card__price--sale">
          {{ product.price | money }}
        </span>
        <span class="outdoor-product-card__price-savings">
          -{{ product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price }}%
        </span>
      {% else %}
        <span class="outdoor-product-card__price-current">
          {{ product.price | money }}
        </span>
      {% endif %}
    </div>
    
    {%- comment -%} Swatches {%- endcomment -%}
    {% if settings.enable_swatches and product.has_only_default_variant == false %}
      {% render 'outdoor-product-swatches', product: product %}
    {% endif %}
    
    {%- comment -%} Quick add button {%- endcomment -%}
    {% if settings.enable_quick_add %}
      {% render 'outdoor-quick-add-button', product: product %}
    {% endif %}
  </div>
</div>
```

#### CSS Product Cards:

```css
/* custom-outdoor-collection.css */
.outdoor-product-card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.outdoor-product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.outdoor-product-card__image-wrapper {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #f5f5f0;
}

.outdoor-product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.outdoor-product-card__image--hover {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.outdoor-product-card:hover .outdoor-product-card__image--hover {
  opacity: 1;
}

.outdoor-product-card__quick-view {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.outdoor-product-card:hover .outdoor-product-card__quick-view {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.outdoor-product-card__quick-view:hover {
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.outdoor-product-card__info {
  padding: 16px;
}

.outdoor-product-card__title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
}

.outdoor-product-card__title a {
  color: #1a1a1a;
  text-decoration: none;
}

.outdoor-product-card__title a:hover {
  color: #2d5016;
}

.outdoor-product-card__price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.outdoor-product-card__price-compare {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
}

.outdoor-product-card__price-current {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.outdoor-product-card__price--sale {
  color: #c41e3a;
}

.outdoor-product-card__price-savings {
  background: #c41e3a;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .outdoor-product-card__quick-view span {
    display: none;
  }
  
  .outdoor-product-card__quick-view {
    width: 44px;
    height: 44px;
    padding: 0;
    justify-content: center;
    border-radius: 50%;
  }
}
```

#### Settings:

```json
{
  "type": "header",
  "content": "🏷️ Product Cards"
},
{
  "type": "checkbox",
  "id": "enable_quick_view",
  "label": "Enable quick view",
  "default": true
},
{
  "type": "checkbox",
  "id": "enable_quick_add",
  "label": "Enable quick add",
  "default": true
},
{
  "type": "checkbox",
  "id": "enable_swatches",
  "label": "Show color swatches",
  "default": true
},
{
  "type": "checkbox",
  "id": "enable_second_image_hover",
  "label": "Show 2nd image on hover",
  "default": true
},
{
  "type": "checkbox",
  "id": "show_badges",
  "label": "Show product badges",
  "default": true
}
```

#### Tests:
- [ ] Hover effects smooth
- [ ] Quick view modal fonctionne
- [ ] Quick add button OK
- [ ] Badges s'affichent correctement
- [ ] 2nd image hover
- [ ] Swatches cliquables
- [ ] Mobile responsive
- [ ] Touch targets > 48px

#### Estimation: **3 jours**

---

### 5️⃣ `feature/homepage-premium` (Priorité MOYENNE 🔥)

**Objectif**: Homepage avec hero premium, trust, testimonials, best sellers

#### Commits atomiques:

```bash
feat(home): create premium hero section
feat(home): add trust badges row
feat(home): implement "Why Us" section
feat(home): add best sellers carousel
feat(home): create testimonials section
feat(home): add Instagram feed
feat(home): enhance newsletter section
style(home): outdoor premium home styling
docs(home): document homepage sections
```

#### Fichiers à créer:

```
/assets/
  ├── custom-outdoor-home.css
  └── custom-outdoor-home.js

/sections/
  ├── custom-outdoor-hero.liquid
  ├── custom-outdoor-trust-row.liquid
  ├── custom-outdoor-why-us.liquid
  ├── custom-outdoor-testimonials.liquid
  └── custom-outdoor-instagram-feed.liquid

/snippets/
  ├── outdoor-hero-content.liquid
  ├── outdoor-trust-icon.liquid
  └── outdoor-testimonial-card.liquid
```

#### Tests:
- [ ] Hero responsive
- [ ] Video BG fonctionne (si activé)
- [ ] Trust badges visibles
- [ ] Testimonials slider OK
- [ ] Instagram feed charge
- [ ] Newsletter subscribe OK

#### Estimation: **2 jours**

---

### 6️⃣ `feature/footer-trust` (Priorité BASSE)

**Objectif**: Footer amélioré + pre-footer trust section

#### Commits atomiques:

```bash
feat(footer): add pre-footer trust section
feat(footer): improve footer layout
feat(footer): enhance newsletter UI
style(footer): outdoor premium footer styling
docs(footer): document footer customization
```

#### Contrainte STRICTE:
- ❌ **NE SUPPRIMER AUCUN ÉLÉMENT EXISTANT**
- ✅ Seulement améliorer layout, spacing, style
- ✅ Ajouter section pre-footer (AVANT footer existant)

#### Estimation: **1 jour**

---

### 7️⃣ `feature/performance` (Continu ⚡)

**Objectif**: Optimisations performance continues

#### Commits atomiques:

```bash
perf: implement lazy loading for images
perf: add WebP support with fallback
perf: optimize CSS delivery (critical inline)
perf: defer non-critical JavaScript
perf: add font-display swap
perf: optimize third-party scripts
perf: implement resource hints (preload/prefetch)
test(perf): add Lighthouse CI
docs(perf): document performance optimizations
```

#### Tests:
- [ ] PageSpeed > 80 mobile
- [ ] PageSpeed > 90 desktop
- [ ] LCP < 2.5s desktop, < 3.5s mobile
- [ ] FID < 100ms
- [ ] CLS < 0.1

#### Estimation: **Continu**

---

## 🔄 WORKFLOW DÉTAILLÉ

### Créer la structure de branches

```bash
# 1. Créer branch develop
git checkout -b develop
git push -u origin develop

# 2. Créer toutes les feature branches
git checkout -b feature/pdp-cro develop
git push -u origin feature/pdp-cro

git checkout -b feature/cart-drawer-premium develop
git push -u origin feature/cart-drawer-premium

git checkout -b feature/header-outdoor develop
git push -u origin feature/header-outdoor

git checkout -b feature/collection-premium develop
git push -u origin feature/collection-premium

git checkout -b feature/homepage-premium develop
git push -u origin feature/homepage-premium

git checkout -b feature/footer-trust develop
git push -u origin feature/footer-trust

git checkout -b feature/performance develop
git push -u origin feature/performance
```

### Travailler sur une feature

```bash
# Exemple: PDP CRO
git checkout feature/pdp-cro

# Commit atomique 1
git add snippets/outdoor-sticky-atc.liquid
git add assets/custom-outdoor-pdp.css
git add assets/custom-outdoor-pdp.js
git commit -m "feat(pdp): add sticky add-to-cart mobile component

- Create outdoor-sticky-atc.liquid snippet
- Add CSS for sticky positioning
- Add JS for show/hide on scroll
- Mobile-first responsive design
- Touch-friendly 48px height"

# Commit atomique 2
git add snippets/outdoor-pdp-trust-badges.liquid
git commit -m "feat(pdp): add trust badges section with icons

- Create trust badges snippet
- 4 badges: livraison, paiement, garantie, SAV
- Responsive grid layout
- Icon + text format
- Configurable via settings"

# Continue...

# Push vers origin
git push origin feature/pdp-cro
```

### Créer une Pull Request

```bash
# Sur GitHub:
# 1. Aller sur le repo
# 2. Cliquer "Compare & pull request"
# 3. Base: develop <- Compare: feature/pdp-cro
# 4. Remplir le template PR
```

#### Template PR:

```markdown
## 🎯 Objectif

[Description de la feature]

## ✅ Checklist

- [ ] Tests desktop (Chrome, Safari, Firefox)
- [ ] Tests mobile (iOS, Android)
- [ ] Tests tablette
- [ ] PageSpeed test (mobile > 80)
- [ ] Accessibility check (WAVE)
- [ ] Settings Theme Editor testés
- [ ] Documentation mise à jour
- [ ] Changelog mis à jour

## 📸 Screenshots

[Before/After screenshots]

## 🧪 Comment tester

1. [Étapes pour tester]

## 📊 Metrics

- Baseline: [metrics avant]
- Target: [objectifs]

## 🔗 Liens

- Issue: #XX
- Documentation: [lien]
```

### Review & Merge

```bash
# Après review approuvée:
git checkout develop
git merge --no-ff feature/pdp-cro -m "Merge feature/pdp-cro into develop"
git push origin develop

# Optionnel: supprimer la feature branch
git branch -d feature/pdp-cro
git push origin --delete feature/pdp-cro
```

### Release vers main

```bash
# Quand develop est stable (toutes features mergées):
git checkout main
git merge --no-ff develop -m "Release v1.0.0 - Outdoor Premium Refonte"
git tag -a v1.0.0 -m "Version 1.0.0 - Complete outdoor premium refonte"
git push origin main --tags
```

---

## 📋 PR CHECKLIST COMPLÈTE

### Avant de créer la PR:

- [ ] Code fonctionne en local
- [ ] Commits atomiques et bien nommés
- [ ] Pas de console.log ou debug code
- [ ] Pas de trailing spaces
- [ ] Settings schema JSON valide
- [ ] Documentation mise à jour

### Tests obligatoires:

#### Desktop
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

#### Mobile
- [ ] iPhone Safari (iOS 15+)
- [ ] Chrome Android (latest)
- [ ] Orientation portrait
- [ ] Orientation landscape

#### Tablet
- [ ] iPad Safari
- [ ] Android tablet

#### Performance
- [ ] PageSpeed Insights mobile > 80
- [ ] PageSpeed Insights desktop > 90
- [ ] LCP < 2.5s (desktop) / < 3.5s (mobile)
- [ ] FID < 100ms
- [ ] CLS < 0.1

#### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader (NVDA/JAWS)
- [ ] Color contrast (WCAG AA)
- [ ] Focus visible
- [ ] ARIA labels
- [ ] Alt text images

#### Shopify
- [ ] Theme preview works
- [ ] Settings Theme Editor fonctionnels
- [ ] No breaking changes
- [ ] Compatible avec apps communes

---

## 📊 TRACKING PROGRESS

### Dashboard GitHub Projects

Créer un projet GitHub avec colonnes:

```
📝 To Do
🏗️ In Progress
👀 In Review
✅ Done
```

### Labels suggérés:

- `priority: critical` 🔥🔥🔥
- `priority: high` 🔥🔥
- `priority: medium` 🔥
- `priority: low`
- `type: feature` ✨
- `type: bugfix` 🐛
- `type: enhancement` 💎
- `type: performance` ⚡
- `type: docs` 📚
- `area: pdp` 🛍️
- `area: cart` 🛒
- `area: header` 🎯
- `area: collection` 📦
- `area: home` 🏠

---

## 🚀 TIMELINE ESTIMÉE

### Sprint 1 (Semaine 1): CRO Critiques
- **Jours 1-3**: `feature/pdp-cro` ✅
- **Jours 4-5**: `feature/cart-drawer-premium` ✅

### Sprint 2 (Semaine 2): Navigation & Discovery
- **Jours 6-8**: `feature/header-outdoor` ✅
- **Jours 9-11**: `feature/collection-premium` ✅

### Sprint 3 (Semaine 3): Polish & Performance
- **Jours 12-13**: `feature/homepage-premium` ✅
- **Jour 14**: `feature/footer-trust` ✅
- **Continu**: `feature/performance` ⚡

### Sprint 4 (Semaine 4): Tests & Release
- **Jours 15-16**: QA complète
- **Jour 17**: Fixes bugs
- **Jour 18**: Release v1.0.0 🎉

**Total: ~4 semaines (18 jours ouvrés)**

---

## 📝 NOTES IMPORTANTES

### Conventions de code:

#### Naming:
- CSS classes: `outdoor-component-name__element--modifier`
- JS functions: `camelCase`
- Liquid snippets: `outdoor-component-name.liquid`
- Files: `custom-outdoor-area.ext`

#### Commits:
```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

#### Documentation:
- Commenter code complexe
- Mettre à jour CHANGELOG.md
- Documenter settings Theme Editor
- Screenshots before/after

---

**Plan créé le**: 24 décembre 2025  
**Prêt à commencer**: ✅ OUI  
**Prochaine étape**: Créer branch `develop` et première feature `feature/pdp-cro`
