"use client";

import React from "react";
import { ProductVariant } from "@/types";
import { Check } from "lucide-react";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold uppercase tracking-wider text-[#221D1A]">
          Select Size / Vessel
        </span>
        <span className="text-[#73675E]">{selectedVariant.burnTime} burn</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {variants.map((v) => {
          const isSelected = selectedVariant.id === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectVariant(v)}
              className={`p-3 rounded-md text-left border transition-all relative flex flex-col justify-between focus:outline-hidden ${
                isSelected
                  ? "border-[#B46036] bg-[#FAF7F2] shadow-xs"
                  : "border-[#E6DED3] bg-white hover:border-[#D5C8B8]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#221D1A]">
                    {v.weight}
                  </span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-[#B46036] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#73675E] line-clamp-1 mt-0.5">
                  {v.name}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-[#F3ECE2] flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-[#221D1A]">
                  ₹{v.price}
                </span>
                {v.compareAtPrice && (
                  <span className="text-[10px] text-[#8E8379] line-through">
                    ₹{v.compareAtPrice}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
