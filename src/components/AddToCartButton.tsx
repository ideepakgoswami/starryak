"use client";

import React, { useState } from "react";
import { ShoppingBag, Check, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product, ProductVariant, PersonalizedData } from "@/types";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  personalizationData: PersonalizedData | null;
  selectedColour?: string;
  selectedFragrance?: string;
  showBuyNow?: boolean;
}

export default function AddToCartButton({
  product,
  selectedVariant,
  quantity,
  personalizationData,
  selectedColour,
  selectedFragrance,
  showBuyNow = true,
}: AddToCartButtonProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const persPrice =
    personalizationData && product.personalization?.additionalPrice
      ? product.personalization.additionalPrice
      : 0;
  const unitPrice = selectedVariant.price + persPrice;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(
      product,
      selectedVariant,
      quantity,
      personalizationData || undefined,
      selectedColour,
      selectedFragrance
    );
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 400);
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      selectedVariant,
      quantity,
      personalizationData || undefined,
      selectedColour,
      selectedFragrance
    );
    router.push("/checkout");
  };

  return (
    <div className="space-y-2.5">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Main Add to Cart */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={isAdding}
          className={`flex-1 h-12 rounded-md font-medium text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 focus:outline-hidden ${
            justAdded
              ? "bg-[#75836C] text-white"
              : "bg-[#221D1A] hover:bg-[#3D332B] text-white shadow-xs"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Bag</span>
            </>
          ) : isAdding ? (
            <span>Adding...</span>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span>Add to Bag • ₹{totalPrice}</span>
            </>
          )}
        </button>

        {/* Buy Now Direct Checkout */}
        {showBuyNow && (
          <button
            type="button"
            onClick={handleBuyNow}
            className="sm:w-44 h-12 rounded-md font-medium text-sm tracking-wider uppercase bg-[#B46036] hover:bg-[#9E502B] text-white transition-colors flex items-center justify-center gap-1.5 focus:outline-hidden shadow-xs"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Buy Now</span>
          </button>
        )}
      </div>

      <p className="text-[11px] text-[#73675E] text-center">
        ✨ Free domestic shipping above ₹999 • Eco-cushioned transit guarantee
      </p>
    </div>
  );
}
