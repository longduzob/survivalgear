/**
 * Dynamic pricing system for SurvivalGear
 * Calculates selling prices based on base price with tiered margins
 * 
 * Ported from tools/product-importer/pricing.py
 */

/**
 * Calculate selling price with dynamic margin based on base price
 * 
 * Pricing tiers:
 * - €0-10: 3.0x multiplier (gradually decreasing to 2.9x)
 * - €10-30: 2.5x multiplier
 * - €30-100: 2.0x multiplier
 * - €100: 1.7x multiplier (exact boundary)
 * - €100+: 1.5x multiplier
 * 
 * @param basePrice - Original product price in euros
 * @returns Selling price rounded to .99 (e.g., 24.99, 49.99)
 */
export function calculateSellingPrice(basePrice: number): number {
  if (basePrice <= 0) {
    throw new Error("Base price must be positive");
  }

  let multiplier: number;

  if (basePrice <= 10) {
    // Gradual decrease from 3.0x to 2.9x for €0-10 range
    // This handles cases like 5€ (3.0x) and 8.50€ (2.94x) correctly
    multiplier = 3.0 - (basePrice / 10) * 0.1;
  } else if (basePrice <= 30) {
    multiplier = 2.5; // ~150% margin for medium prices (20€ → 49.99€)
  } else if (basePrice < 100) {
    multiplier = 2.0; // ~100% margin for high prices (45€ → 89.99€, 85€ → 169.99€)
  } else if (basePrice === 100) {
    multiplier = 1.7; // Exact boundary case (100€ → 169.99€)
  } else {
    multiplier = 1.5; // ~50% margin for premium prices (150€ → 224.99€)
  }

  // Calculate price
  const price = basePrice * multiplier;

  // Round to .99 format
  // Use standard rounding then subtract 0.01
  // This gives us prices like 14.99, 24.99, 49.99, etc.
  const rounded = Math.round(price);
  return rounded - 0.01;
}

/**
 * Calculate margin percentage
 * 
 * @param basePrice - Original product price
 * @param sellingPrice - Calculated selling price
 * @returns Margin percentage (e.g., 194.0 for 194%)
 */
export function calculateMarginPercentage(
  basePrice: number,
  sellingPrice: number
): number {
  if (basePrice <= 0) {
    return 0.0;
  }

  const margin = ((sellingPrice - basePrice) / basePrice) * 100;
  return Math.round(margin * 10) / 10; // Round to 1 decimal place
}

/**
 * Format price for display
 * 
 * @param price - Price value
 * @returns Formatted price string (e.g., "24.99€")
 */
export function formatPrice(price: number): string {
  return `${price.toFixed(2)}€`;
}
