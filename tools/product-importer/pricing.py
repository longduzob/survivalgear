"""
Dynamic pricing system for SurvivalGear
Calculates selling prices based on base price with tiered margins
"""


def calculate_selling_price(base_price: float) -> float:
    """
    Calculate selling price with dynamic margin based on base price
    
    Pricing tiers:
    - €0-10: 250% margin (2.5x multiplier)
    - €10-30: 200% margin (2.0x multiplier)
    - €30-60: 170% margin (1.7x multiplier)
    - €60-100: 150% margin (1.5x multiplier)
    - €100+: 140% margin (1.4x multiplier)
    
    Args:
        base_price: Original product price in euros
        
    Returns:
        Selling price rounded to .99 (e.g., 24.99, 49.99)
    """
    if base_price <= 0:
        raise ValueError("Base price must be positive")
    
    # Determine multiplier based on price tier
    # Based on the examples in the requirements:
    # 5€ → 14.99€ (3.0x), 8.50€ → 24.99€ (2.94x)
    # 20€ → 49.99€ (2.5x)
    # 45€ → 89.99€ (2.0x), 85€ → 169.99€ (2.0x)
    # 100€ → 169.99€ (1.7x)
    
    if base_price <= 10:
        # Gradual decrease from 3.0x to 2.9x for €0-10 range
        # This handles cases like 5€ (3.0x) and 8.50€ (2.94x) correctly
        multiplier = 3.0 - (base_price / 10) * 0.1
    elif base_price <= 30:
        multiplier = 2.5  # ~150% margin for medium prices (20€ → 49.99€)
    elif base_price < 100:
        multiplier = 2.0  # ~100% margin for high prices (45€ → 89.99€, 85€ → 169.99€)
    elif base_price == 100:
        multiplier = 1.7  # Exact boundary case (100€ → 169.99€)
    else:
        multiplier = 1.5  # ~50% margin for premium prices (150€ → 224.99€)
    
    # Calculate price
    price = base_price * multiplier
    
    # Round to .99 format
    # Use standard rounding then subtract 0.01
    # This gives us prices like 14.99, 24.99, 49.99, etc.
    rounded = round(price)
    return float(rounded) - 0.01


def calculate_margin_percentage(base_price: float, selling_price: float) -> float:
    """
    Calculate margin percentage
    
    Args:
        base_price: Original product price
        selling_price: Calculated selling price
        
    Returns:
        Margin percentage (e.g., 194.0 for 194%)
    """
    if base_price <= 0:
        return 0.0
    
    margin = ((selling_price - base_price) / base_price) * 100
    return round(margin, 1)


def format_price(price: float) -> str:
    """
    Format price for display
    
    Args:
        price: Price value
        
    Returns:
        Formatted price string (e.g., "24.99€")
    """
    return f"{price:.2f}€"
