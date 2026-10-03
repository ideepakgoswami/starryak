"use client";

import React from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = "No candles found matching your selection.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-lg border border-[#E6DED3] p-8 max-w-md mx-auto my-8">
        <Sparkles className="w-8 h-8 text-[#C29D57] mx-auto mb-3" />
        <h3 className="font-serif text-lg font-medium text-[#221D1A]">
          No Candles Found
        </h3>
        <p className="text-xs text-[#73675E] mt-1">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={idx < 4}
        />
      ))}
    </div>
  );
}
