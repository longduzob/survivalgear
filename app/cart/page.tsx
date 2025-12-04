"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateShipping } from "@/lib/shipping";

// Mock cart data
const mockCartItems = [
  {
    id: "1",
    productId: "1",
    name: "Tente 2 Places Ultra-Légère Pro",
    price: 79.99,
    quantity: 1,
    color: "Green",
    image: "/placeholder-product.jpg",
  },
  {
    id: "2",
    productId: "2",
    name: "Sac à Dos Tactique 40L",
    price: 49.99,
    quantity: 2,
    color: "Black",
    image: "/placeholder-product.jpg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [country, setCountry] = useState("FR");

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = calculateShipping(country, subtotal);
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background-light to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Votre panier est vide</h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Découvrez nos produits premium et commencez votre aventure !
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-hover text-white px-10 py-4 rounded-full font-bold hover:shadow-lg transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-light to-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Votre Panier</h1>
          <p className="text-gray-600">{cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-medium overflow-hidden">
              {cartItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex gap-6 p-6 ${idx !== cartItems.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-smooth`}
                >
                  <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{item.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary-light bg-primary-light/10 px-2 py-1 rounded">Couleur: {item.color}</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {item.price.toFixed(2)}€
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-smooth"
                      title="Supprimer"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>

                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-white hover:border-primary transition-smooth font-bold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-lg text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-white hover:border-primary transition-smooth font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary-dark font-semibold transition-smooth group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continuer mes achats
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-medium p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Résumé de commande</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-bold text-lg text-gray-900">{subtotal.toFixed(2)}€</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-bold text-lg">
                    {shipping === 0 ? (
                      <span className="text-green-600">GRATUIT</span>
                    ) : (
                      <span className="text-gray-900">{shipping.toFixed(2)}€</span>
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Pays de livraison
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary focus:outline-none transition-smooth"
                  >
                    <option value="FR">🇫🇷 France (4.99€)</option>
                    <option value="DE">🇩🇪 Allemagne (9.99€)</option>
                    <option value="BE">🇧🇪 Belgique (9.99€)</option>
                    <option value="ES">🇪🇸 Espagne (9.99€)</option>
                    <option value="IT">🇮🇹 Italie (9.99€)</option>
                    <option value="US">🌍 International (14.99€)</option>
                  </select>
                </div>
              </div>

              {subtotal < 100 && (
                <div className="bg-gradient-to-r from-blue-50 to-primary/5 border-2 border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-blue-900 font-semibold text-sm">
                    🎉 Plus que <span className="text-primary text-lg font-bold">{(100 - subtotal).toFixed(2)}€</span> pour la livraison gratuite !
                  </p>
                  <div className="mt-2 bg-white rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-primary-light h-full transition-all" style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}></div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-xl font-bold mb-6 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-3xl text-primary">{total.toFixed(2)}€</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-gradient-to-r from-accent to-accent-hover text-white text-center font-bold py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 mb-4"
              >
                Passer commande
              </Link>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm">
                  <svg className="w-6 h-6 text-primary-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Paiement sécurisé</p>
                    <p className="text-gray-600 text-xs">SSL & cryptage 256-bit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <svg className="w-6 h-6 text-primary-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Protection acheteur</p>
                    <p className="text-gray-600 text-xs">30 jours satisfait ou remboursé</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <svg className="w-6 h-6 text-primary-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Livraison rapide</p>
                    <p className="text-gray-600 text-xs">Délai moyen ~2 semaines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
