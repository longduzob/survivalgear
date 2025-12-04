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
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
              -{discount}%
            </div>
          )}
          <div className="relative w-full h-full">
            {!product.images[0] ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">No Image</span>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">Image</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          {product.brand && (
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          )}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              {product.price.toFixed(2)}€
            </span>
            {product.comparePrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.comparePrice.toFixed(2)}€
              </span>
            )}
          </div>

          {/* Color Variants */}
          {colors.length > 0 && (
            <div className="flex gap-1 mb-3">
              {colors.slice(0, 5).map((color, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {colors.length > 5 && (
                <span className="text-xs text-gray-500 ml-1">+{colors.length - 5}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Quick Add to Cart */}
      <div className="px-4 pb-4">
        <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded transition">
          Ajouter au panier
        </button>
      </div>

      {/* Buyer Protection Badge */}
      <div className="px-4 pb-3">
        <div className="flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Protection acheteur
        </div>
      </div>
    </div>
  );
}
