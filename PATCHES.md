# GUIDE D'IMPLÉMENTATION RAPIDE - CODEX

Ce guide contient tous les "patches" prêts à l'emploi pour implémenter les fonctionnalités du projet Survival Gear.

---

## 🚀 PROMPT POUR CODEX

```
Analyse ce thème Shopify Horizon. Implémente les améliorations CRO + design + mobile + performance + SEO listées dans BRIEF.md et PLAN.md. 

CONTRAINTES IMPORTANTES :
- Conserve tous les éléments du footer (aucune suppression)
- Ajoute le widget TripAdvisor sur PDP uniquement via snippet + settings
- Utilise une approche migration-safe : modifications minimales des fichiers de base
- Tous les ajouts via snippets / sections / assets custom
- Tous les settings configurables dans Theme Editor

PRIORITÉS :
1. PDP (pages produit) - trust badges, stock urgency
2. Cart drawer - upsells, free shipping progress
3. Header - announcement bar dynamique
4. Collection cards - hover effects, quick view
5. Home hero - CTA amélioré, trust section

Référence le PLAN.md pour la liste complète fichier par fichier.
Référence TASKS.md pour les tâches détaillées.
```

---

## ✅ WIDGET TRIPADVISOR (DÉJÀ IMPLÉMENTÉ)

### `snippets/tripadvisor-badge.liquid`

```liquid
{%- comment -%}
  TripAdvisor Badge (official widget)
  Only displayed when enabled in section settings.
  You must set your own locationId from TripAdvisor listing.
{%- endcomment -%}

{%- if section.settings.enable_tripadvisor_badge and section.settings.tripadvisor_location_id != blank -%}
  <div class="tripadvisor-badge-wrapper" data-tripadvisor-badge>
    <div id="TA_cdsratingsonlynarrow{{ section.id }}" class="TA_cdsratingsonlynarrow">
      <ul class="TA_links">
        <li class="TA_item">
          <a target="_blank" rel="noopener" href="https://www.tripadvisor.com/">
            <img
              src="https://www.tripadvisor.com/img/cdsi/img2/branding/tripadvisor_logo_transp_340x80-18034-2.png"
              alt="TripAdvisor"
              loading="lazy"
              width="170"
              height="40"
            >
          </a>
        </li>
      </ul>
    </div>

    <script
      async
      src="https://www.jscache.com/wejs?wtype=cdsratingsonlynarrow&uniq={{ section.id | slice: -4 }}&locationId={{ section.settings.tripadvisor_location_id }}&lang={{ request.locale.iso_code | default: 'fr' }}&border=true&shadow=true&display_version=2">
    </script>
  </div>
{%- endif -%}
```

### Intégration dans `blocks/_product-details.liquid`

**Déjà fait** : Ajouter après `{% content_for 'blocks' %}` :

```liquid
{% render 'tripadvisor-badge' %}
```

### Settings dans `blocks/_product-details.liquid` schema

**Déjà fait** : Ajouter dans la section "settings" :

```json
{
  "type": "header",
  "content": "Trust badge – TripAdvisor"
},
{
  "type": "checkbox",
  "id": "enable_tripadvisor_badge",
  "label": "Afficher le bandeau TripAdvisor",
  "default": true
},
{
  "type": "text",
  "id": "tripadvisor_location_id",
  "label": "TripAdvisor locationId",
  "info": "Trouve-le via le code widget TripAdvisor (Widgets)."
}
```

### CSS dans `assets/custom-enhancements.css`

**Déjà fait** :

```css
.tripadvisor-badge-wrapper {
  margin: 14px 0 10px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
}

.tripadvisor-badge-wrapper img {
  max-width: 160px;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .tripadvisor-badge-wrapper {
    margin: 12px 0 8px;
    padding: 10px 12px;
  }
}
```

---

## 📝 TRUST BADGES (À IMPLÉMENTER)

### `snippets/trust-badges.liquid`

```liquid
{%- comment -%}
  Trust Badges Component
  Usage: {% render 'trust-badges', style: 'compact', location: 'product' %}
  Styles: 'compact', 'full', 'minimal'
  Locations: 'product', 'cart', 'footer'
{%- endcomment -%}

{%- liquid
  assign style = style | default: 'compact'
  assign location = location | default: 'product'
  
  assign show_shipping = section.settings.show_trust_shipping | default: true
  assign show_payment = section.settings.show_trust_payment | default: true
  assign show_guarantee = section.settings.show_trust_guarantee | default: true
  assign show_support = section.settings.show_trust_support | default: true
-%}

<div class="trust-badges trust-badges--{{ style }} trust-badges--{{ location }}">
  {%- if show_shipping -%}
    <div class="trust-badge">
      <div class="trust-badge__icon">
        {% render 'icon-delivery' %}
      </div>
      <div class="trust-badge__content">
        <div class="trust-badge__title">{{ 'trust.shipping_title' | t | default: 'Livraison gratuite' }}</div>
        <div class="trust-badge__text">{{ 'trust.shipping_text' | t | default: 'Dès 50€ d\'achat' }}</div>
      </div>
    </div>
  {%- endif -%}

  {%- if show_payment -%}
    <div class="trust-badge">
      <div class="trust-badge__icon">
        {% render 'icon-lock' %}
      </div>
      <div class="trust-badge__content">
        <div class="trust-badge__title">{{ 'trust.payment_title' | t | default: 'Paiement sécurisé' }}</div>
        <div class="trust-badge__text">{{ 'trust.payment_text' | t | default: '100% sécurisé' }}</div>
      </div>
    </div>
  {%- endif -%}

  {%- if show_guarantee -%}
    <div class="trust-badge">
      <div class="trust-badge__icon">
        {% render 'icon-checkmark' %}
      </div>
      <div class="trust-badge__content">
        <div class="trust-badge__title">{{ 'trust.guarantee_title' | t | default: 'Satisfait ou remboursé' }}</div>
        <div class="trust-badge__text">{{ 'trust.guarantee_text' | t | default: '30 jours' }}</div>
      </div>
    </div>
  {%- endif -%}

  {%- if show_support -%}
    <div class="trust-badge">
      <div class="trust-badge__icon">
        {% render 'icon-headset' %}
      </div>
      <div class="trust-badge__content">
        <div class="trust-badge__title">{{ 'trust.support_title' | t | default: 'Service client' }}</div>
        <div class="trust-badge__text">{{ 'trust.support_text' | t | default: '7j/7' }}</div>
      </div>
    </div>
  {%- endif -%}
</div>
```

### CSS pour trust-badges (ajouter à `custom-enhancements.css`)

```css
/* ========================================
   TRUST BADGES
   ======================================== */
.trust-badges {
  display: flex;
  gap: 16px;
  padding: 20px 0;
}

.trust-badges--compact {
  flex-wrap: wrap;
  gap: 12px;
}

.trust-badges--full {
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.trust-badge__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(46, 125, 50, 0.1);
  border-radius: 50%;
  color: #2e7d32;
}

.trust-badge__content {
  flex: 1;
  min-width: 0;
}

.trust-badge__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 2px;
}

.trust-badge__text {
  font-size: 0.75rem;
  color: #757575;
}

@media (max-width: 768px) {
  .trust-badges {
    flex-direction: column;
    gap: 12px;
  }
  
  .trust-badges--compact {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .trust-badges--compact .trust-badge {
    flex: 1 1 calc(50% - 6px);
  }
}
```

---

## 📝 STOCK URGENCY (À IMPLÉMENTER)

### `snippets/stock-urgency.liquid`

```liquid
{%- comment -%}
  Stock Urgency Indicator
  Shows urgency message when stock is low
  Usage: {% render 'stock-urgency', variant: current_variant %}
{%- endcomment -%}

{%- liquid
  assign variant = variant | default: product.selected_or_first_available_variant
  assign threshold = section.settings.stock_urgency_threshold | default: 5
  assign show_urgency = section.settings.show_stock_urgency | default: true
-%}

{%- if show_urgency and variant.inventory_management == 'shopify' and variant.inventory_policy == 'deny' -%}
  {%- if variant.inventory_quantity > 0 and variant.inventory_quantity <= threshold -%}
    <div class="stock-urgency" data-stock-urgency>
      <svg class="stock-urgency__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L10.5 6.5H13.5L9 10.5L10.5 15L8 12L5.5 15L7 10.5L2.5 6.5H5.5L8 1.5Z" fill="currentColor"/>
      </svg>
      <span class="stock-urgency__text">
        {%- if variant.inventory_quantity == 1 -%}
          {{ 'stock.last_item' | t | default: 'Dernier article en stock !' }}
        {%- else -%}
          {{ 'stock.low_stock' | t: count: variant.inventory_quantity | default: 'Plus que ' | append: variant.inventory_quantity | append: ' en stock !' }}
        {%- endif -%}
      </span>
    </div>
  {%- endif -%}
{%- endif -%}
```

### CSS stock-urgency (ajouter à `custom-enhancements.css`)

```css
/* ========================================
   STOCK URGENCY
   ======================================== */
.stock-urgency {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #fff3e0;
  border-left: 3px solid #f57c00;
  border-radius: 6px;
  margin: 12px 0;
}

.stock-urgency__icon {
  flex-shrink: 0;
  color: #f57c00;
  animation: pulse-urgency 2s ease-in-out infinite;
}

.stock-urgency__text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e65100;
}

@keyframes pulse-urgency {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .stock-urgency {
    padding: 8px 12px;
  }
}
```

---

## 📝 FREE SHIPPING PROGRESS (À IMPLÉMENTER)

### `snippets/free-shipping-banner.liquid`

```liquid
{%- comment -%}
  Free Shipping Progress Banner
  Shows progress towards free shipping threshold
  Usage: {% render 'free-shipping-banner' %}
{%- endcomment -%}

{%- liquid
  assign threshold = settings.free_shipping_threshold | default: 5000
  assign cart_total = cart.total_price
  assign remaining = threshold | minus: cart_total
  assign percentage = cart_total | times: 100 | divided_by: threshold
  
  if percentage > 100
    assign percentage = 100
  endif
-%}

<div class="free-shipping-banner" data-free-shipping-banner>
  {%- if remaining > 0 -%}
    <div class="free-shipping-banner__message">
      <svg class="free-shipping-banner__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10L8 15L17 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>
        {{ 'shipping.progress_message' | t: amount: remaining | money | default: 'Plus que' }}
        <strong>{{ remaining | money }}</strong>
        {{ 'shipping.for_free' | t | default: 'pour la livraison gratuite !' }}
      </span>
    </div>
  {%- else -%}
    <div class="free-shipping-banner__message free-shipping-banner__message--success">
      <svg class="free-shipping-banner__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/>
        <path d="M6 10L9 13L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>
        <strong>{{ 'shipping.free_unlocked' | t | default: 'Félicitations ! Livraison gratuite débloquée' }}</strong> 🎉
      </span>
    </div>
  {%- endif -%}
  
  <div class="free-shipping-banner__progress">
    <div class="free-shipping-banner__progress-bar" style="width: {{ percentage }}%"></div>
  </div>
</div>
```

### CSS free-shipping (ajouter à `custom-enhancements.css`)

```css
/* ========================================
   FREE SHIPPING BANNER
   ======================================== */
.free-shipping-banner {
  padding: 12px 16px;
  background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%);
  border-radius: 8px;
  margin: 16px 0;
}

.free-shipping-banner__message {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: #2e7d32;
}

.free-shipping-banner__message--success {
  color: #1b5e20;
  font-weight: 600;
}

.free-shipping-banner__icon {
  flex-shrink: 0;
  color: currentColor;
}

.free-shipping-banner__progress {
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.free-shipping-banner__progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #66bb6a 0%, #4caf50 100%);
  border-radius: 3px;
  transition: width 0.5s ease;
}

@media (max-width: 768px) {
  .free-shipping-banner {
    padding: 10px 12px;
  }
  
  .free-shipping-banner__message {
    font-size: 0.8125rem;
  }
}
```

---

## 📝 SETTINGS À AJOUTER

### Dans `config/settings_schema.json` (nouvelle section)

```json
{
  "name": "Trust & CRO",
  "settings": [
    {
      "type": "header",
      "content": "Trust Badges"
    },
    {
      "type": "checkbox",
      "id": "show_trust_shipping",
      "label": "Afficher badge livraison gratuite",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_trust_payment",
      "label": "Afficher badge paiement sécurisé",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_trust_guarantee",
      "label": "Afficher badge satisfait ou remboursé",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_trust_support",
      "label": "Afficher badge service client",
      "default": true
    },
    {
      "type": "header",
      "content": "Free Shipping"
    },
    {
      "type": "number",
      "id": "free_shipping_threshold",
      "label": "Montant minimum pour livraison gratuite (en centimes)",
      "info": "Exemple: 5000 pour 50€",
      "default": 5000
    },
    {
      "type": "header",
      "content": "Stock Urgency"
    },
    {
      "type": "checkbox",
      "id": "show_stock_urgency",
      "label": "Afficher indicateur stock faible",
      "default": true
    },
    {
      "type": "range",
      "id": "stock_urgency_threshold",
      "label": "Seuil stock faible",
      "min": 1,
      "max": 20,
      "step": 1,
      "default": 5,
      "info": "Afficher l'alerte quand stock <= ce nombre"
    }
  ]
}
```

---

## 📝 INTÉGRATIONS À FAIRE

### Dans `blocks/_product-details.liquid`

Après le render tripadvisor-badge, ajouter :

```liquid
{% render 'trust-badges', style: 'compact', location: 'product' %}
{% render 'stock-urgency', variant: product.selected_or_first_available_variant %}
```

### Dans cart drawer (trouver le fichier, probablement `sections/cart-drawer.liquid`)

```liquid
{% render 'free-shipping-banner' %}
{% render 'trust-badges', style: 'minimal', location: 'cart' %}
```

### Dans footer (avant le footer existant)

```liquid
<div class="footer-trust-wrapper">
  {% render 'trust-badges', style: 'full', location: 'footer' %}
</div>
```

---

## 🎨 ICONS MANQUANTS

Si les icons ne sont pas disponibles, créer ces snippets :

### `snippets/icon-delivery.liquid`
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 3H16V13H3V3Z" stroke="currentColor" stroke-width="2"/>
  <path d="M16 6H19L21 9V13H16V6Z" stroke="currentColor" stroke-width="2"/>
  <circle cx="7" cy="16" r="2" stroke="currentColor" stroke-width="2"/>
  <circle cx="17" cy="16" r="2" stroke="currentColor" stroke-width="2"/>
</svg>
```

### `snippets/icon-lock.liquid`
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
  <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" stroke="currentColor" stroke-width="2"/>
  <circle cx="12" cy="15" r="1" fill="currentColor"/>
</svg>
```

### `snippets/icon-headset.liquid`
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 3C7.58 3 4 6.58 4 11V17C4 18.1 4.9 19 6 19H8V12H4V11C4 7.13 7.13 4 11 4H13C16.87 4 20 7.13 20 11V12H16V19H18C19.1 19 20 18.1 20 17V11C20 6.58 16.42 3 12 3Z" fill="currentColor"/>
</svg>
```

---

## 🚀 ORDRE D'IMPLÉMENTATION RECOMMANDÉ

1. ✅ Widget TripAdvisor (FAIT)
2. Trust badges
3. Stock urgency  
4. Free shipping banner
5. Icons manquants
6. Settings dans config
7. Tests Theme Editor
8. Tests responsive
9. Documentation

---

**Note :** Tous ces snippets sont migration-safe et peuvent être activés/désactivés via le Theme Editor sans casser le thème existant.
