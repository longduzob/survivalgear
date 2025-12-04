"use client";

import { useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex border-b mb-6">
                <button
                  onClick={() => setShowLogin(true)}
                  className={`flex-1 pb-4 font-medium ${
                    showLogin ? "border-b-2 border-primary text-primary" : "text-gray-500"
                  }`}
                >
                  Connexion
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className={`flex-1 pb-4 font-medium ${
                    !showLogin ? "border-b-2 border-primary text-primary" : "text-gray-500"
                  }`}
                >
                  Inscription
                </button>
              </div>

              {showLogin ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(true);
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Mot de passe</label>
                      <input
                        type="password"
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition"
                    >
                      Se connecter
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(true);
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Mot de passe</label>
                      <input
                        type="password"
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition"
                    >
                      S'inscrire
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged in view
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-11-20",
      status: "En transit",
      total: 179.97,
      items: 3,
    },
    {
      id: "ORD-2024-002",
      date: "2024-10-15",
      status: "Livré",
      total: 79.99,
      items: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Mon Compte</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded bg-primary text-white font-medium">
                  Mes commandes
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                  Ma wishlist
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                  Mes adresses
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                  Paramètres
                </button>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-red-600"
                >
                  Déconnexion
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Mes Commandes</h2>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-lg">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          Commandé le {new Date(order.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          order.status === "Livré"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600">
                          {order.items} article{order.items > 1 ? "s" : ""}
                        </p>
                        <p className="font-bold text-primary">{order.total.toFixed(2)}€</p>
                      </div>
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        Voir détails →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
