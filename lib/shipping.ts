export function calculateShipping(country: string, total: number): number {
  // Free shipping for orders over 100€
  if (total >= 100) {
    return 0;
  }

  // France
  if (country === 'FR') {
    return 4.99;
  }

  // EU countries
  const euCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'DE',
    'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL',
    'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
  ];

  if (euCountries.includes(country)) {
    return 9.99;
  }

  // International (rest of world)
  return 14.99;
}

export function getEstimatedDelivery(locale: string = 'fr-FR'): string {
  const today = new Date();
  const minDays = 10;
  const maxDays = 20;

  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);

  return `${minDate.toLocaleDateString(locale, { day: 'numeric', month: 'long' })} - ${maxDate.toLocaleDateString(locale, { day: 'numeric', month: 'long' })}`;
}
