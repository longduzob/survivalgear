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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-xl text-gray-200">{category.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">{mockProducts.length}</span> produits trouvés
              </p>
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm">
                <option>Pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  Précédent
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  Suivant
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
