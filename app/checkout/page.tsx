"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateShipping, getEstimatedDelivery } from "@/lib/shipping";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "FR",
    phone: "",
  });

  // Mock cart data
  const cartItems = [
    { name: "Tente 2 Places Ultra-Légère Pro", price: 79.99, quantity: 1 },
    { name: "Sac à Dos Tactique 40L", price: 49.99, quantity: 2 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = calculateShipping(formData.country, subtotal);
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PayPal integration would go here
    alert("PayPal integration - à implémenter avec les credentials");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Passer commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Adresse</label>
                    <input
                      type="text"
                      required
                      value={formData.address1}
                      onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Complément d'adresse (optionnel)
                    </label>
                    <input
                      type="text"
                      value={formData.address2}
                      onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ville</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Code postal</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pays</label>
                    <select
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                      <option value="FR">France</option>
                      <option value="DE">Allemagne</option>
                      <option value="BE">Belgique</option>
                      <option value="ES">Espagne</option>
                      <option value="IT">Italie</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Paiement</h2>
                <div className="border border-gray-300 rounded p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="radio"
                      id="paypal"
                      name="payment"
                      defaultChecked
                      className="text-primary"
                    />
                    <label htmlFor="paypal" className="font-medium">PayPal</label>
                    <div className="ml-auto">
                      <img
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                        alt="PayPal"
                        className="h-6"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Paiement sécurisé via PayPal. Vous serez redirigé pour finaliser votre achat.
                  </p>
                </div>

                {/* PayPal Button would go here */}
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <p className="text-sm text-yellow-800">
                    Le bouton PayPal apparaîtra ici une fois les credentials configurés dans .env
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition"
              >
                Payer {total.toFixed(2)}€
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Votre commande</h2>

              <div className="space-y-4 mb-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium">
                    {shipping === 0 ? "GRATUIT" : `${shipping.toFixed(2)}€`}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-bold mb-4">
                <span>Total</span>
                <span className="text-primary">{total.toFixed(2)}€</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                <p className="font-medium mb-1">Livraison estimée</p>
                <p>{getEstimatedDelivery()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
