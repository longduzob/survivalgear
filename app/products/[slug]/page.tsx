import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = 'force-dynamic';

async function getProductBySlug(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        variants: true,
        category: true,
      },
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  // Group variants by type
  const colorVariants = product.variants
    ? product.variants
        .filter((v) => v.name.toLowerCase() === 'color' || v.name.toLowerCase() === 'couleur')
        .map((v) => v.value)
    : [];
  
  const sizeVariants = product.variants
    ? product.variants
        .filter((v) => v.name.toLowerCase() === 'size' || v.name.toLowerCase() === 'taille')
        .map((v) => v.value)
    : [];

  return (
    <div className="min-h-screen bg-background-light">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600 font-medium">
            <Link href="/" className="hover:text-primary transition-smooth">Accueil</Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/categories/${product.category.slug}`} className="hover:text-primary transition-smooth">
              {product.category.name}
            </Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="relative aspect-square bg-white rounded-2xl shadow-medium mb-4 flex items-center justify-center overflow-hidden group">
              {discount > 0 && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                  -{discount}%
                </div>
              )}
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <ProductDetailClient images={product.images} productName={product.name} />
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.brand && (
              <div className="inline-block bg-primary-light/10 text-primary font-bold text-xs uppercase tracking-wide px-3 py-1 rounded-full mb-4">
                {product.brand}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl p-6 mb-6 border border-primary/10">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-primary">{product.price.toFixed(2)}€</span>
                {product.comparePrice && (
                  <div className="flex flex-col">
                    <span className="text-xl text-gray-400 line-through font-medium">
                      {product.comparePrice.toFixed(2)}€
                    </span>
                    <span className="text-sm text-red-600 font-bold">Économisez {(product.comparePrice - product.price).toFixed(2)}€</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">TVA incluse • Livraison calculée à l'étape suivante</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6 flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
              <span className="flex items-center text-sm font-semibold text-green-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                En stock ({product.stock} disponibles)
              </span>
            </div>

            {/* Color Selection */}
            {colorVariants.length > 0 && (
              <div className="mb-8">
                <p className="font-bold text-gray-900 mb-4">Couleurs disponibles:</p>
                <div className="flex gap-3 flex-wrap">
                  {colorVariants.map((color) => (
                    <div
                      key={color}
                      className="px-4 py-2 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 bg-white"
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {sizeVariants.length > 0 && (
              <div className="mb-8">
                <p className="font-bold text-gray-900 mb-4">Tailles disponibles:</p>
                <div className="flex gap-3 flex-wrap">
                  {sizeVariants.map((size) => (
                    <div
                      key={size}
                      className="px-4 py-2 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 bg-white"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4 mb-8">
              <button className="w-full bg-gradient-to-r from-accent to-accent-hover hover:shadow-lg text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Ajouter au panier
              </button>
              <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Acheter maintenant
              </button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-soft space-y-4">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Garanties & Services</h3>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <svg className="w-6 h-6 text-primary-light flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Protection acheteur garantie</p>
                  <p className="text-sm text-gray-600">Satisfait ou remboursé sous 30 jours</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <svg className="w-6 h-6 text-primary-light flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Livraison estimée: ~2 semaines</p>
                  <p className="text-sm text-gray-600">Livraison gratuite dès 100€</p>
                </div>
              </div>
              {product.weight && (
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                  <svg className="w-6 h-6 text-primary-light flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Caractéristiques</p>
                    <p className="text-sm text-gray-600">Poids: {product.weight}kg • Haute qualité</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-20 bg-white rounded-2xl shadow-medium p-8">
          <div className="border-b-2 border-gray-100 mb-8">
            <h2 className="pb-4 border-b-4 border-primary font-bold text-primary text-2xl inline-block">
              Description
            </h2>
          </div>

          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-4">
              {product.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-wrap">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
