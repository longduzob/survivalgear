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
      <section className="relative bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              Équipement Outdoor & Survie
            </h1>
            <p className="text-xl mb-8">
              Découvrez notre sélection de matériel de qualité pour vos aventures en plein air
            </p>
            <Link
              href="/categories/all"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-md transition"
            >
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Produits Populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Protection Acheteur</h3>
              <p className="text-gray-600">Vos achats sont protégés</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Livraison Gratuite</h3>
              <p className="text-gray-600">Dès 100€ d'achat</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Livraison ~2 semaines</h3>
              <p className="text-gray-600">Délai moyen de livraison</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
