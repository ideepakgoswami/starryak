"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isCustomizable?: boolean;
}

export default function ProductGallery({
  images,
  productName,
  isCustomizable,
}: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Large Image Container */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F3ECE2] border border-[#E6DED3] group">
        <Image
          src={images[activeImageIndex] || images[0]}
          alt={`${productName} photograph`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay customizable badge */}
        {isCustomizable && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium text-[#221D1A] border border-[#E6DED3] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B46036]" />
            <span>Customizable Artisan Pour</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 transition-all focus:outline-hidden ${
                activeImageIndex === idx
                  ? "border-[#B46036] shadow-sm scale-95"
                  : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
