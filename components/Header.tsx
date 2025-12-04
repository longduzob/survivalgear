"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locale, setLocale] = useState("fr");

  const categories = [
    { name: "Tentes & Abris", slug: "tentes-abris" },
    { name: "Sacs à Dos", slug: "sacs-dos" },
    { name: "Outils & Couteaux", slug: "outils-couteaux" },
    { name: "Éclairage", slug: "eclairage" },
    { name: "Cuisine & Eau", slug: "cuisine-eau" },
  ];

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white text-center py-2 text-sm font-medium">
        <div className="container mx-auto px-4">
          <span>🎉 Livraison gratuite dès 100€ d'achat | Protection acheteur garantie</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-glass border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-primary-dark hover:text-primary transition-smooth">
              SurvivalGear
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="relative text-gray-700 hover:text-primary font-medium transition-smooth group"
                >
                  {category.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <button
                onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
                className="text-sm font-semibold text-gray-700 hover:text-primary transition-smooth px-2 py-1 rounded hover:bg-gray-100"
              >
                {locale.toUpperCase()}
              </button>

              {/* Search */}
              <button className="text-gray-700 hover:text-primary transition-smooth p-2 rounded-full hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Account */}
              <Link href="/account" className="text-gray-700 hover:text-primary transition-smooth p-2 rounded-full hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative text-gray-700 hover:text-primary transition-smooth p-2 rounded-full hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  0
                </span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-smooth"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="block py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-smooth font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
