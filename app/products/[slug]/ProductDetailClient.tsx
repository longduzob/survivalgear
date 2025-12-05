"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  order: number;
}

interface ProductDetailClientProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductDetailClient({ images, productName }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {images.map((img, idx) => (
        <button
          key={img.id}
          onClick={() => setSelectedImage(idx)}
          className={`aspect-square bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative ${
            selectedImage === idx ? "ring-2 ring-primary shadow-md" : ""
          }`}
        >
          <Image
            src={img.url}
            alt={img.alt || productName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 25vw, 12vw"
          />
        </button>
      ))}
    </div>
  );
}
