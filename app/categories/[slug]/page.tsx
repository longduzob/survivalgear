import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";

// Mock data - will be replaced with database queries
const categories = {
  "tentes-abris": { name: "Tentes & Abris", description: "Équipement de camping et abris" },
  "sacs-dos": { name: "Sacs à Dos", description: "Sacs pour toutes vos aventures" },
  "outils-couteaux": { name: "Outils & Couteaux", description: "Outils de survie essentiels" },
  "eclairage": { name: "Éclairage", description: "Lampes et solutions d'éclairage" },
  "cuisine-eau": { name: "Cuisine & Eau", description: "Matériel de cuisine et purification d'eau" },
};

const mockProducts = [
  {
    id: "1",
    name: "Tente 2 Places Ultra-Légère Pro",
    slug: "tente-2-places-ultra-legere-pro",
    price: 79.99,
    comparePrice: 129.99,
    brand: "OutdoorPro",
    images: [{ url: "/placeholder-product.jpg", alt: "Tente 2 places" }],
    variants: [
      { name: "Color", value: "Green" },
      { name: "Color", value: "Orange" },
    ],
  },
  {
    id: "2",
    name: "Sac à Dos Tactique 40L",
    slug: "sac-dos-tactique-40l",
    price: 49.99,
    comparePrice: 89.99,
    brand: "TacGear",
    images: [{ url: "/placeholder-product.jpg", alt: "Sac à dos" }],
    variants: [
      { name: "Color", value: "Black" },
      { name: "Color", value: "Camo" },
    ],
  },
  {
    id: "3",
    name: "Couteau de Survie Multifonction",
    slug: "couteau-survie-multifonction",
    price: 34.99,
    brand: "SurvivalKing",
    images: [{ url: "/placeholder-product.jpg", alt: "Couteau de survie" }],
    variants: [],
  },
  {
    id: "4",
    name: "Lampe Frontale LED Rechargeable",
    slug: "lampe-frontale-led-rechargeable",
    price: 24.99,
    comparePrice: 39.99,
    brand: "BrightLight",
    images: [{ url: "/placeholder-product.jpg", alt: "Lampe frontale" }],
    variants: [
      { name: "Color", value: "Black" },
      { name: "Color", value: "Red" },
    ],
  },
];

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categories[params.slug as keyof typeof categories];

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-light to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjAgMGEyMCAyMCAwIDEgMCA0MCAwYTIwIDIwIDAgMSAwLTQwIDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-accent font-semibold">Collection Premium</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">{category.name}</h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-medium p-6 sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <p className="text-gray-900 text-lg">
                  <span className="font-bold text-2xl text-primary">{mockProducts.length}</span>
                  <span className="text-gray-600 ml-2">produits disponibles</span>
                </p>
              </div>
              <select className="border-2 border-gray-300 rounded-xl px-5 py-3 text-sm font-semibold focus:border-primary focus:outline-none transition-smooth bg-white shadow-sm">
                <option>Pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
                <option>Meilleures ventes</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-5 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-smooth flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Précédent
                </button>
                <button className="px-5 py-3 bg-primary text-white rounded-xl font-bold shadow-md">1</button>
                <button className="px-5 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-smooth">
                  2
                </button>
                <button className="px-5 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-smooth">
                  3
                </button>
                <button className="px-5 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-smooth flex items-center gap-2">
                  Suivant
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for known categories
export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }));
}
