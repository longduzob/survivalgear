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
    <div className="min-h-screen bg-background-light">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600 font-medium">
            <Link href="/" className="hover:text-primary transition-smooth">Accueil</Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/categories/tentes-abris" className="hover:text-primary transition-smooth">Tentes & Abris</Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-semibold">{mockProduct.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="relative aspect-square bg-white rounded-2xl shadow-medium mb-4 flex items-center justify-center overflow-hidden group">
              {discount > 0 && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                  -{discount}%
                </div>
              )}
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {mockProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square bg-white rounded-xl flex items-center justify-center text-xs text-gray-400 shadow-sm hover:shadow-md transition-all ${
                    selectedImage === idx ? "ring-2 ring-primary shadow-md" : ""
                  }`}
                >
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="inline-block bg-primary-light/10 text-primary font-bold text-xs uppercase tracking-wide px-3 py-1 rounded-full mb-4">
              {mockProduct.brand}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">{mockProduct.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-xl shadow-soft">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-base font-semibold text-gray-700">
                {averageRating.toFixed(1)} <span className="text-gray-500 font-normal">({mockProduct.reviews.length} avis)</span>
              </span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl p-6 mb-6 border border-primary/10">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-primary">{mockProduct.price.toFixed(2)}€</span>
                {mockProduct.comparePrice && (
                  <div className="flex flex-col">
                    <span className="text-xl text-gray-400 line-through font-medium">
                      {mockProduct.comparePrice.toFixed(2)}€
                    </span>
                    <span className="text-sm text-red-600 font-bold">Économisez {(mockProduct.comparePrice - mockProduct.price).toFixed(2)}€</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">TVA incluse • Livraison calculée à l'étape suivante</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6 flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
              <span className="flex items-center text-sm font-semibold text-green-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                En stock ({mockProduct.stock} disponibles)
              </span>
            </div>

            {/* Color Selection */}
            {mockProduct.variants.colors.length > 0 && (
              <div className="mb-8">
                <p className="font-bold text-gray-900 mb-4">Couleur: <span className="text-primary">{selectedColor}</span></p>
                <div className="flex gap-3">
                  {mockProduct.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-2 rounded-xl font-semibold transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary text-white shadow-md"
                          : "border-gray-300 hover:border-primary text-gray-700 bg-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-bold text-gray-900 mb-4">Quantité</p>
              <div className="flex items-center gap-4 bg-white rounded-xl p-2 shadow-soft w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:border-primary transition-all font-bold text-gray-700"
                >
                  -
                </button>
                <span className="w-16 text-center font-bold text-xl text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(mockProduct.stock, quantity + 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:border-primary transition-all font-bold text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 mb-8">
              <button className="w-full bg-gradient-to-r from-accent to-accent-hover hover:shadow-lg text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Ajouter au panier
              </button>
              <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Acheter maintenant
              </button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-soft space-y-4">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Garanties & Services</h3>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <svg className="w-6 h-6 text-primary-light flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Protection acheteur garantie</p>
                  <p className="text-sm text-gray-600">Satisfait ou remboursé sous 30 jours</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <svg className="w-6 h-6 text-primary-light flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Livraison estimée: ~2 semaines</p>
                  <p className="text-sm text-gray-600">Livraison gratuite dès 100€</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                <svg className="w-6 h-6 text-primary-light flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Caractéristiques</p>
                  <p className="text-sm text-gray-600">Poids: {mockProduct.weight}kg • Haute qualité</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description & Reviews */}
        <div className="mt-20 bg-white rounded-2xl shadow-medium p-8">
          <div className="border-b-2 border-gray-100 mb-8">
            <nav className="flex gap-8">
              <button className="pb-4 border-b-4 border-primary font-bold text-primary text-lg">
                Description
              </button>
              <button className="pb-4 border-b-4 border-transparent font-bold text-gray-500 hover:text-gray-900 text-lg transition-smooth">
                Avis ({mockProduct.reviews.length})
              </button>
            </nav>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-4">
              {mockProduct.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-wrap">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">Avis clients</h3>
              <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-smooth">
                Écrire un avis
              </button>
            </div>
            <div className="space-y-6">
              {mockProduct.reviews.map((review) => (
                <div key={review.id} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{review.user}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
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
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
