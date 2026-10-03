"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    itemCount,
  } = useCart();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const handleCheckoutClick = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E6DED3] shadow-2xl flex flex-col z-50 animate-fade-in">
          {/* Header */}
          <div className="p-5 border-b border-[#E6DED3] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#221D1A]" />
              <h2 className="font-serif text-lg font-medium text-[#221D1A]">
                Your Shopping Bag ({itemCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-[#73675E] hover:text-[#221D1A] rounded-full hover:bg-[#FAF7F2] transition-colors focus:outline-hidden"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Indicator */}
          <div className="p-4 bg-[#F3ECE2] border-b border-[#E6DED3] text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-[#221D1A] font-medium mb-1.5">
                Add <span className="font-bold text-[#B46036]">₹{amountNeededForFreeShipping}</span> more to unlock <span className="font-bold">Free Nationwide Delivery</span>!
              </p>
            ) : (
              <p className="text-[#75836C] font-semibold mb-1.5 flex items-center gap-1">
                <span>🎉 You have unlocked Free Nationwide Shipping!</span>
              </p>
            )}
            <div className="w-full bg-[#E6DED3] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#B46036] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#D5C8B8] mx-auto stroke-1" />
                <h3 className="font-serif text-lg text-[#221D1A]">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#73675E] max-w-xs mx-auto">
                  Discover our small-batch candles thoughtfully poured with natural soy wax and evocative fine fragrances.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      router.push("/shop");
                    }}
                    className="inline-block bg-[#221D1A] hover:bg-[#3D332B] text-white text-xs uppercase tracking-wider font-medium px-5 py-2.5 rounded-sm transition-colors"
                  >
                    Explore Candles
                  </button>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-[#E6DED3] shadow-2xs relative"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#F3ECE2] shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm font-medium text-[#221D1A] hover:text-[#B46036] transition-colors truncate block max-w-[180px]"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8E8379] hover:text-red-700 transition-colors p-1"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#73675E] mt-0.5">
                        {item.variant.weight} • {item.variant.name}
                      </div>

                      {/* Selected Colour & Fragrance */}
                      {(item.selectedColour || item.selectedFragrance) && (
                        <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                          {item.selectedColour && (
                            <span className="bg-[#FAF7F2] text-[#221D1A] border border-[#E6DED3] px-1.5 py-0.5 rounded-xs font-medium">
                              Colour: <strong className="font-semibold text-[#B46036]">{item.selectedColour}</strong>
                            </span>
                          )}
                          {item.selectedFragrance && (
                            <span className="bg-[#FAF7F2] text-[#221D1A] border border-[#E6DED3] px-1.5 py-0.5 rounded-xs font-medium">
                              Scent: <strong className="font-semibold text-[#B46036]">{item.selectedFragrance}</strong>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Personalization Details if present */}
                      {item.personalization && (
                        <div className="mt-1.5 bg-[#FAF7F2] p-1.5 rounded border border-[#E6DED3] text-[10px] space-y-0.5">
                          <div className="flex items-center gap-1 text-[#B46036] font-medium">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Custom Keepsake Label (+₹150)</span>
                          </div>
                          <div className="text-[#221D1A] font-semibold truncate">
                            For: {item.personalization.name}
                          </div>
                          {item.personalization.occasion && (
                            <div className="text-[#73675E]">
                              Occasion: {item.personalization.occasion}
                            </div>
                          )}
                          <div className="text-[#73675E] italic truncate">
                            “{item.personalization.message}”
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F3ECE2]">
                      <div className="flex items-center border border-[#E6DED3] rounded bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 text-[#73675E] hover:text-[#221D1A]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-[#221D1A]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 text-[#73675E] hover:text-[#221D1A]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#221D1A]">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E6DED3] bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#73675E]">
                  <span>Subtotal</span>
                  <span className="text-[#221D1A] font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#73675E]">
                  <span>Shipping</span>
                  <span>
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-[#75836C] font-semibold">FREE</span>
                    ) : (
                      "Calculated at checkout (₹99)"
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#221D1A] pt-2 border-t border-[#F3ECE2]">
                  <span>Estimated Total</span>
                  <span>
                    ₹{subtotal >= freeShippingThreshold ? subtotal : subtotal + 99}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full bg-[#B46036] hover:bg-[#9E502B] text-white py-3 px-4 rounded-md font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex justify-center">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="text-xs text-[#73675E] hover:text-[#221D1A] underline transition-colors"
                >
                  View full cart details
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#73675E] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#75836C]" />
                <span>Safe &amp; Secure Checkout • India Wide Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
