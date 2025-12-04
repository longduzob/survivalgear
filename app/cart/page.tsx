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
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">
            Découvrez nos produits et commencez votre aventure !
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-6 border-b last:border-b-0"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Image</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Couleur: {item.color}</p>
                    <p className="text-lg font-bold text-primary">
                      {item.price.toFixed(2)}€
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        className="w-5 h-5"
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

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-50"
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
              className="inline-block mt-4 text-primary hover:underline"
            >
              ← Continuer mes achats
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Résumé</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">{subtotal.toFixed(2)}€</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium">
                    {shipping === 0 ? "GRATUIT" : `${shipping.toFixed(2)}€`}
                  </span>
                </div>

                <div className="pt-3 border-t">
                  <label className="block text-sm text-gray-600 mb-2">
                    Pays de livraison
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="FR">France (4.99€)</option>
                    <option value="DE">Allemagne (9.99€)</option>
                    <option value="BE">Belgique (9.99€)</option>
                    <option value="ES">Espagne (9.99€)</option>
                    <option value="IT">Italie (9.99€)</option>
                    <option value="US">International (14.99€)</option>
                  </select>
                </div>
              </div>

              {subtotal < 100 && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm">
                  <p className="text-blue-800">
                    🎉 Plus que <strong>{(100 - subtotal).toFixed(2)}€</strong> pour la
                    livraison gratuite !
                  </p>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold mb-6 pt-3 border-t">
                <span>Total</span>
                <span className="text-primary">{total.toFixed(2)}€</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-primary text-white text-center font-semibold py-3 rounded-lg hover:bg-primary-dark transition"
              >
                Passer commande
              </Link>

              <div className="mt-4 pt-4 border-t space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Protection acheteur</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Livraison ~2 semaines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
