import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getAllProducts() {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { active: true },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        variants: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform database products to match ProductCard expected format
    return dbProducts.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      comparePrice: product.comparePrice ?? undefined,
      brand: product.brand ?? undefined,
      images: product.images.map(img => ({
        url: img.url,
        alt: img.alt ?? undefined,
      })),
      variants: product.variants.map(v => ({
        name: v.name,
        value: v.value,
      })),
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-light to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjAgMGEyMCAyMCAwIDEgMCA0MCAwYTIwIDIwIDAgMSAwLTQwIDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-accent font-semibold">Tous nos produits</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">Notre Catalogue</h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Découvrez notre gamme complète d'équipements outdoor et survie
            </p>
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
                  <span className="font-bold text-2xl text-primary">{products.length}</span>
                  <span className="text-gray-600 ml-2">produits disponibles</span>
                </p>
              </div>
              {/* TODO: Implement sorting functionality */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
                  <p className="text-gray-600 text-lg mb-2">Aucun produit disponible pour le moment.</p>
                  <p className="text-gray-500 text-sm">Revenez bientôt pour découvrir notre sélection !</p>
                </div>
              )}
            </div>

            {/* Pagination - TODO: Implement when product count exceeds page limit */}
          </div>
        </div>
      </div>
    </div>
  );
}
