import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number;
    brand?: string;
    images: { url: string; alt?: string }[];
    variants?: { name: string; value: string }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  // Get unique colors from variants
  const colors = product.variants
    ?.filter((v) => v.name === "Color")
    .map((v) => v.value) || [];

  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 group hover-lift overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 animate-pulse">
              -{discount}%
            </div>
          )}
          {!discount && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary-light text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
              Nouveau
            </div>
          )}
          <div className="relative w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-5">
          {product.brand && (
            <p className="text-xs font-semibold text-primary-light mb-2 uppercase tracking-wide">{product.brand}</p>
          )}
          <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-smooth text-base leading-tight">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-primary">
              {product.price.toFixed(2)}€
            </span>
            {product.comparePrice && (
              <span className="text-sm text-gray-400 line-through font-medium">
                {product.comparePrice.toFixed(2)}€
              </span>
            )}
          </div>

          {/* Color Variants */}
          {colors.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                {colors.slice(0, 4).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full border-2 border-gray-200 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
              {colors.length > 4 && (
                <span className="text-xs text-gray-500 font-medium">+{colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Quick Add to Cart - appears on hover */}
      <div className="px-5 pb-5">
        <button className="w-full bg-gradient-to-r from-accent to-accent-hover hover:shadow-md text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100">
          Ajouter au panier
        </button>
        
        {/* Always visible button for mobile */}
        <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-smooth group-hover:hidden">
          Voir le produit
        </button>
      </div>

      {/* Buyer Protection Badge */}
      <div className="px-5 pb-4 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-center text-xs text-gray-600 font-medium">
          <svg className="w-4 h-4 text-primary-light mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Protection acheteur
        </div>
      </div>
    </div>
  );
}
