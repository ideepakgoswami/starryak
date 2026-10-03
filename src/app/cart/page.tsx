"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    itemCount,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F3ECE2] flex items-center justify-center mx-auto text-[#73675E]">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#221D1A]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#73675E] max-w-sm mx-auto">
          Explore our hand-poured artisanal scented candles, crafted with pure soy wax in India.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-block bg-[#221D1A] hover:bg-[#3D332B] text-white px-7 py-3 rounded-md text-xs font-medium uppercase tracking-widest transition-colors"
          >
            Explore Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
          Shopping Bag ({itemCount} item{itemCount > 1 ? "s" : ""})
        </h1>
        <p className="text-xs text-[#73675E] mt-1">
          Review your hand-poured selection before proceeding to checkout.
        </p>
      </div>

      {/* Free Shipping Milestone Alert */}
      <div className="p-4 rounded-lg bg-[#F3ECE2] border border-[#E6DED3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#B46036] shrink-0" />
          {amountNeededForFreeShipping > 0 ? (
            <span>
              Add <strong className="text-[#B46036]">₹{amountNeededForFreeShipping}</strong> more to your bag to enjoy <strong>Free Nationwide Delivery</strong>!
            </span>
          ) : (
            <span className="text-[#75836C] font-semibold">
              🎉 Congratulations! You have unlocked Free Express Shipping across India.
            </span>
          )}
        </div>
        <div className="w-full sm:w-48 bg-[#E6DED3] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#B46036] h-full transition-all duration-300 rounded-full"
            style={{
              width: `${Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Cart Items Table */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-lg bg-white border border-[#E6DED3] shadow-2xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              {/* Product Info with Image */}
              <div className="flex gap-4 items-center min-w-0">
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#F3ECE2] shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="font-serif text-base font-semibold text-[#221D1A] hover:text-[#B46036] transition-colors truncate block"
                  >
                    {item.product.name}
                  </Link>

                  <div className="text-xs text-[#73675E] mt-0.5">
                    {item.variant.weight} • {item.variant.name}
                  </div>

                  {(item.selectedColour || item.selectedFragrance) && (
                    <div className="mt-1 flex flex-wrap gap-1 text-[11px]">
                      {item.selectedColour && (
                        <span className="bg-[#FAF7F2] text-[#221D1A] border border-[#E6DED3] px-2 py-0.5 rounded-xs font-medium">
                          Colour: <strong className="font-semibold text-[#B46036]">{item.selectedColour}</strong>
                        </span>
                      )}
                      {item.selectedFragrance && (
                        <span className="bg-[#FAF7F2] text-[#221D1A] border border-[#E6DED3] px-2 py-0.5 rounded-xs font-medium">
                          Scent: <strong className="font-semibold text-[#B46036]">{item.selectedFragrance}</strong>
                        </span>
                      )}
                    </div>
                  )}

                  {item.personalization && (
                    <div className="mt-1 bg-[#FAF7F2] p-2 rounded border border-[#E6DED3] text-[11px] space-y-0.5 max-w-sm">
                      <div className="flex items-center gap-1 text-[#B46036] font-medium text-[10px]">
                        <Sparkles className="w-3 h-3" />
                        <span>Personalized Keepsake Label</span>
                      </div>
                      <div>
                        <strong>For:</strong> {item.personalization.name}
                      </div>
                      {item.personalization.occasion && (
                        <div>
                          <strong>Occasion:</strong> {item.personalization.occasion}
                        </div>
                      )}
                      <div className="italic text-[#73675E] truncate">
                        &ldquo;{item.personalization.message}&rdquo;
                      </div>
                    </div>
                  )}

                  <div className="text-xs font-semibold text-[#221D1A] mt-1 sm:hidden">
                    ₹{item.unitPrice} each
                  </div>
                </div>
              </div>

              {/* Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#F3ECE2]">
                {/* Quantity */}
                <div className="flex items-center border border-[#E6DED3] rounded bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-[#73675E] hover:text-[#221D1A]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-[#221D1A]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-[#73675E] hover:text-[#221D1A]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Total */}
                <div className="text-right min-w-[70px]">
                  <span className="text-sm font-bold text-[#221D1A]">
                    ₹{item.totalPrice}
                  </span>
                  <span className="text-[10px] text-[#8E8379] block">
                    (₹{item.unitPrice} × {item.quantity})
                  </span>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#8E8379] hover:text-red-700 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2 flex justify-between items-center text-xs">
            <Link
              href="/shop"
              className="text-[#B46036] hover:underline font-medium"
            >
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl border border-[#E6DED3] shadow-xs space-y-5 sticky top-28">
            <h3 className="font-serif text-lg font-medium text-[#221D1A] pb-3 border-b border-[#F3ECE2]">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#73675E]">
                <span>Items Subtotal</span>
                <span className="text-[#221D1A] font-semibold">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-[#73675E]">
                <span>Shipping in India</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#75836C] font-semibold">FREE</span>
                  ) : (
                    <span>₹{shippingFee}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-[#73675E]">
                <span>Estimated Taxes (GST)</span>
                <span className="text-[#221D1A]">Included in prices</span>
              </div>

              <div className="pt-3 border-t border-[#F3ECE2] flex justify-between text-base font-bold text-[#221D1A]">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="w-full bg-[#B46036] hover:bg-[#9E502B] text-white py-3.5 rounded-md font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 border-t border-[#F3ECE2] space-y-2 text-[11px] text-[#73675E]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#75836C]" />
                <span>Transit damage replacement guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#75836C]" />
                <span>Pan-India tracked courier delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
