"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

// Mock product data
const mockProduct = {
  id: "1",
  name: "Tente 2 Places Ultra-Légère Pro",
  slug: "tente-2-places-ultra-legere-pro",
  price: 79.99,
  comparePrice: 129.99,
  brand: "OutdoorPro",
  description: `Tente ultra-légère conçue pour les aventuriers exigeants. Parfaite pour le trekking et les randonnées longue distance.

Caractéristiques principales:
- Poids: seulement 1.2kg
- Résistante aux intempéries (3000mm)
- Montage rapide en 5 minutes
- Tissu respirant anti-condensation
- Double toit avec vestibule
- Sac de transport compact inclus

Idéale pour 2 personnes avec équipement léger.`,
  stock: 45,
  weight: 1.2,
  images: [
    { url: "/placeholder-product.jpg", alt: "Vue principale" },
    { url: "/placeholder-product.jpg", alt: "Vue intérieure" },
    { url: "/placeholder-product.jpg", alt: "Vue montée" },
  ],
  variants: {
    colors: ["Green", "Orange", "Blue"],
    sizes: [],
  },
  reviews: [
    {
      id: "1",
      user: "Jean D.",
      rating: 5,
      date: "2024-11-15",
      comment: "Excellente tente, très légère et facile à monter. Parfaite pour mes randonnées !",
    },
    {
      id: "2",
      user: "Marie L.",
      rating: 4,
      date: "2024-11-10",
      comment: "Bon rapport qualité/prix. Un peu juste pour 2 personnes avec beaucoup d'équipement.",
    },
  ],
};

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(mockProduct.variants.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const discount = mockProduct.comparePrice
    ? Math.round(((mockProduct.comparePrice - mockProduct.price) / mockProduct.comparePrice) * 100)
    : 0;

  const averageRating = 
    mockProduct.reviews.reduce((sum, review) => sum + review.rating, 0) / mockProduct.reviews.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/categories/tentes-abris" className="hover:text-primary">Tentes & Abris</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{mockProduct.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded z-10">
                  -{discount}%
                </div>
              )}
              <span className="text-gray-400">Image Produit</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {mockProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 ${
                    selectedImage === idx ? "ring-2 ring-primary" : ""
                  }`}
                >
                  Img {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-gray-500 mb-2">{mockProduct.brand}</p>
            <h1 className="text-3xl font-bold mb-4">{mockProduct.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({mockProduct.reviews.length} avis)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">{mockProduct.price.toFixed(2)}€</span>
              {mockProduct.comparePrice && (
                <span className="text-xl text-gray-400 line-through">
                  {mockProduct.comparePrice.toFixed(2)}€
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className="inline-flex items-center text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                En stock ({mockProduct.stock} disponibles)
              </span>
            </div>

            {/* Color Selection */}
            {mockProduct.variants.colors.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-3">Couleur: {selectedColor}</p>
                <div className="flex gap-2">
                  {mockProduct.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded ${
                        selectedColor === color
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-medium mb-3">Quantité</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(mockProduct.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 mb-8">
              <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition">
                Ajouter au panier
              </button>
              <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-lg transition">
                Acheter maintenant
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Protection acheteur garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span>Livraison estimée: ~2 semaines</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                </svg>
                <span>Poids: {mockProduct.weight}kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description & Reviews */}
        <div className="mt-16">
          <div className="border-b mb-6">
            <nav className="flex gap-8">
              <button className="pb-4 border-b-2 border-primary font-medium">
                Description
              </button>
              <button className="pb-4 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-900">
                Avis ({mockProduct.reviews.length})
              </button>
            </nav>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans">{mockProduct.description}</pre>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Avis clients</h3>
            <div className="space-y-6">
              {mockProduct.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.user}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
