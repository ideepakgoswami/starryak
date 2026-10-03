"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Plus, Check, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [showQuickSelect, setShowQuickSelect] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If customizable, direct user to personalize on product page
    if (product.customizable) {
      window.location.href = `/product/${product.slug}#personalize`;
      return;
    }

    setIsAdding(true);
    addToCart(product, selectedVariant, 1);
    setTimeout(() => {
      setIsAdding(false);
      setShowQuickSelect(false);
    }, 600);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-md border border-[#E6DED3]/80 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#D5C8B8]">
      {/* Image Container with Badges */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-[#F3ECE2]"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.bestseller && (
            <span className="bg-[#221D1A]/90 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-xs">
              Bestseller
            </span>
          )}
          {product.newArrival && (
            <span className="bg-[#B46036] text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-xs">
              New
            </span>
          )}
          {product.collections.includes("diwali") && (
            <span className="bg-[#C29D57] text-[#1A1614] text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-xs">
              Festive
            </span>
          )}
        </div>

        {/* Customizable Indicator Badge */}
        {product.customizable && (
          <div className="absolute top-3 right-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#73675E] text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#E6DED3] z-10">
            <Sparkles className="w-3 h-3 text-[#B46036]" />
            <span>Customizable</span>
          </div>
        )}

        {/* Scent family subtle pill */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-[#FAF7F2]/90 backdrop-blur-xs text-[#221D1A] text-[10px] px-2.5 py-1 rounded-full border border-[#E6DED3] font-medium">
            {product.scentNotes.family}
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B46036] bg-[#F3ECE2] px-2 py-0.5 rounded-xs">
              {product.category === "jar" && "🫙 Jar"}
              {product.category === "pillar" && "🏛️ Pillar"}
              {product.category === "beeswax" && "🐝 Beeswax"}
              {product.category === "cafe" && "☕ Cafe"}
            </span>

            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#C29D57] text-[#C29D57]" />
              <span className="text-xs font-semibold text-[#221D1A]">
                {product.rating}
              </span>
              <span className="text-[10px] text-[#73675E]">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#B46036] transition-colors">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#221D1A] tracking-tight">
              {product.name}
            </h3>
          </Link>

          {/* Short Tagline / Scent Notes */}
          <p className="text-xs text-[#73675E] line-clamp-1 mt-1 font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Price & Quick CTA */}
        <div className="pt-3 mt-3 border-t border-[#F3ECE2] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold text-[#221D1A]">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.compareAtPrice && (
                <span className="text-xs text-[#8E8379] line-through">
                  ₹{selectedVariant.compareAtPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#73675E] block">
              {selectedVariant.weight} • {selectedVariant.burnTime}
            </span>
          </div>

          {/* Options Link */}
          <Link
            href={`/product/${product.slug}`}
            className="text-xs font-medium bg-[#F3ECE2] hover:bg-[#B46036] text-[#221D1A] hover:text-white px-3 py-1.5 rounded-sm transition-all flex items-center gap-1 group/btn"
          >
            <span>Select Options</span>
            <span className="group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
