import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  // Mock data - will be replaced with real data from database
  const categories = [
    { id: 1, name: "Tentes & Abris", slug: "tentes-abris", image: "/placeholder-tent.jpg" },
    { id: 2, name: "Sacs à Dos", slug: "sacs-dos", image: "/placeholder-backpack.jpg" },
    { id: 3, name: "Outils & Couteaux", slug: "outils-couteaux", image: "/placeholder-knife.jpg" },
    { id: 4, name: "Éclairage", slug: "eclairage", image: "/placeholder-light.jpg" },
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Tente 2 Places Ultra-Légère",
      slug: "tente-2-places-ultra-legere",
      price: 79.99,
      comparePrice: 129.99,
      brand: "OutdoorPro",
      images: [{ url: "/placeholder-product.jpg", alt: "Tente 2 places" }],
      variants: [
        { name: "Color", value: "Green" },
        { name: "Color", value: "Orange" },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxwYXRoIGQ9Ik0tMTAgMTBoNjBNLTEwIDMwaDYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-accent font-semibold">✨ Équipements Premium pour Aventuriers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Équipez Votre
              <span className="block text-accent">Prochaine Aventure</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100 leading-relaxed max-w-2xl mx-auto">
              Découvrez notre sélection premium de matériel outdoor et survie. 
              Qualité professionnelle pour vos explorations en pleine nature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/categories/all"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Découvrir nos produits
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 border border-white/30"
              >
                En savoir plus
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">100+</div>
                <div className="text-sm text-gray-200">Produits Premium</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm text-gray-200">Support Client</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-gray-200">Satisfait ou Remboursé</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F9FA"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Explorez nos Catégories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trouvez l'équipement parfait pour votre prochaine aventure
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group hover-lift"
              >
                <div className="relative aspect-square bg-gradient-to-br from-primary-dark to-primary rounded-2xl overflow-hidden shadow-medium">
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjAgMGEyMCAyMCAwIDEgMCA0MCAwYTIwIDIwIDAgMSAwLTQwIDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-40"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl drop-shadow-lg">
                        {category.name}
                      </span>
                    </div>
                  </div>
                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center group-hover:bg-accent/80 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-b from-background-light to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Produits Populaires</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les équipements préférés de nos aventuriers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/categories/all"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-smooth shadow-md hover:shadow-lg"
            >
              Voir tous les produits
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary-light/5 transition-all duration-300 hover-lift group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-shadow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Protection Acheteur</h3>
              <p className="text-gray-600 leading-relaxed">Vos achats sont protégés. Satisfait ou remboursé sous 30 jours.</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary-light/5 transition-all duration-300 hover-lift group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-hover rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-shadow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Livraison Gratuite</h3>
              <p className="text-gray-600 leading-relaxed">Profitez de la livraison gratuite dès 100€ d'achat.</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary-light/5 transition-all duration-300 hover-lift group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-shadow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Livraison Rapide</h3>
              <p className="text-gray-600 leading-relaxed">Délai moyen de livraison d'environ 2 semaines.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
