"use client";

import { useState } from "react";

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const brands = ["OutdoorPro", "TacGear", "SurvivalKing", "BrightLight", "CampMaster"];
  const colors = ["Black", "Green", "Orange", "Blue", "Camo"];
  const sizes = ["S", "M", "L", "XL"];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Prix</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>0€</span>
            <span>{priceRange[1]}€</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Marque</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3">Disponibilité</h3>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm">En stock uniquement</span>
        </label>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold mb-3">Couleur</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`px-3 py-1 text-sm rounded border ${
                selectedColors.includes(color)
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-3">Taille</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className="w-12 h-12 border border-gray-300 rounded hover:border-gray-400"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Weight Range */}
      <div>
        <h3 className="font-semibold mb-3">Poids</h3>
        <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
          <option value="">Tous</option>
          <option value="0-500">0 - 500g</option>
          <option value="500-1000">500g - 1kg</option>
          <option value="1000-2000">1kg - 2kg</option>
          <option value="2000+">Plus de 2kg</option>
        </select>
      </div>

      {/* Reset Filters */}
      <button className="w-full py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium">
        Réinitialiser les filtres
      </button>
    </div>
  );
}
