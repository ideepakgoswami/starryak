"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 20,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-[#E6DED3] bg-white rounded-md overflow-hidden h-11 w-32 shadow-2xs">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-10 h-full flex items-center justify-center text-[#73675E] hover:text-[#221D1A] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-hidden"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="flex-1 text-center text-sm font-semibold text-[#221D1A]">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-10 h-full flex items-center justify-center text-[#73675E] hover:text-[#221D1A] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-hidden"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
