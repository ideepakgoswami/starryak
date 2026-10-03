"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Gift,
  CheckCircle2,
  ArrowRight,
  Flame,
} from "lucide-react";
import { products } from "@/data/products";
import { Product, ProductVariant, PersonalizedData } from "@/types";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function PersonalizedPage() {
  const customizableProducts = products.filter((p) => p.customizable);
  const { addToCart } = useCart();

  // Interactive Live Personalization Studio State
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    customizableProducts[0]
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    customizableProducts[0].variants[1] || customizableProducts[0].variants[0]
  );
  const [recipientName, setRecipientName] = useState("Deepak");
  const [occasion, setOccasion] = useState("Happy Birthday");
  const [customMessage, setCustomMessage] = useState(
    "Wishing you warmth, light, and endless joy on your special day."
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleProductChange = (prod: Product) => {
    setSelectedProduct(prod);
    setSelectedVariant(prod.variants[1] || prod.variants[0]);
  };

  const handleStudioAddToCart = () => {
    const persData: PersonalizedData = {
      name: recipientName || "Special Someone",
      message: customMessage || "Warmest Wishes",
      occasion: occasion || undefined,
    };
    addToCart(selectedProduct, selectedVariant, 1, persData);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const totalStudioPrice =
    selectedVariant.price +
    (selectedProduct.personalization?.additionalPrice || 150);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Header */}
      <section className="bg-linear-to-b from-[#F3ECE2]/80 to-[#FAF7F2] py-14 sm:py-20 border-b border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold bg-white px-3.5 py-1.5 rounded-full border border-[#E6DED3] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Candle Personalization</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221D1A] font-medium tracking-tight">
            Make Every Candle Uniquely Theirs.
          </h1>

          <p className="text-base sm:text-lg text-[#73675E] mt-4 leading-relaxed">
            Transform an artisanal hand-poured candle into a keepsake treasure.
            Customize the gold-foil front label with your recipient&apos;s name,
            occasion, and a custom message.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-[#73675E]">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E6DED3]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#75836C]" />
              Gold Foil Lettering
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E6DED3]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#75836C]" />
              Luxury Gift Box Included
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E6DED3]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#75836C]" />
              All-India Tracked Transit
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Live Customization Studio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E6DED3] shadow-md p-6 sm:p-10 lg:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-1">
              Interactive Design Studio
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#221D1A]">
              Personalize Your Candle in Real-Time
            </h2>
            <p className="text-xs sm:text-sm text-[#73675E] mt-1">
              Choose your favorite scent, customize the label details, and see how it looks before ordering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Interactive Live Label & Jar Mockup */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative aspect-square w-full max-w-md rounded-xl overflow-hidden border border-[#E6DED3] bg-[#FAF7F2] p-6 flex flex-col justify-center items-center shadow-inner">
                {/* Background product image */}
                <Image
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  fill
                  sizes="400px"
                  className="object-cover opacity-35"
                />

                {/* Rendered Live Candle Label */}
                <div className="relative z-10 w-full max-w-xs bg-white/95 backdrop-blur-md border-2 border-[#C29D57] rounded-lg p-6 shadow-xl text-center space-y-3">
                  <div className="border-b border-[#E6DED3] pb-2">
                    <span className="font-serif text-xs tracking-[0.25em] font-medium text-[#73675E] uppercase block">
                      STARRY AK
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#8E8379]">
                      Artisanal Atelier • India
                    </span>
                  </div>

                  <div className="py-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#B46036] font-bold block mb-1">
                      {occasion || "Auspicious Occasion"}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#221D1A] tracking-tight">
                      {recipientName || "Recipient Name"}
                    </h3>
                    <p className="text-xs text-[#73675E] italic mt-2 leading-relaxed px-2 font-serif">
                      &ldquo;{customMessage || "Your custom heartfelt message will appear here in elegant gold foil"}&rdquo;
                    </p>
                  </div>

                  <div className="border-t border-[#E6DED3] pt-2 flex items-center justify-between text-[9px] text-[#8E8379] uppercase tracking-wider">
                    <span>{selectedProduct.name}</span>
                    <span>{selectedVariant.weight}</span>
                  </div>
                </div>

                <div className="relative z-10 mt-4 bg-[#221D1A]/80 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-full">
                  ✨ High-precision metallic foil label
                </div>
              </div>
            </div>

            {/* Right: Studio Customization Controls */}
            <div className="lg:col-span-6 space-y-5">
              {/* Step 1: Select Scent */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                  1. Choose Scent Formulation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {customizableProducts.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleProductChange(prod)}
                      className={`p-2.5 rounded-lg border text-left transition-all text-xs focus:outline-hidden ${
                        selectedProduct.id === prod.id
                          ? "border-[#B46036] bg-[#FAF7F2] font-semibold text-[#221D1A] shadow-xs"
                          : "border-[#E6DED3] hover:border-[#D5C8B8] text-[#73675E]"
                      }`}
                    >
                      <div className="truncate font-medium">{prod.name}</div>
                      <div className="text-[10px] text-[#8E8379] truncate">
                        {prod.scentNotes.family}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                  2. Choose Jar Size
                </label>
                <div className="flex gap-2">
                  {selectedProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`flex-1 p-2 rounded-md border text-center transition-all text-xs focus:outline-hidden ${
                        selectedVariant.id === v.id
                          ? "border-[#B46036] bg-[#FAF7F2] text-[#221D1A] font-bold"
                          : "border-[#E6DED3] text-[#73675E]"
                      }`}
                    >
                      <div>{v.weight}</div>
                      <div className="text-[11px] text-[#221D1A]">₹{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Enter Personalization Details */}
              <div className="space-y-3 pt-2 border-t border-[#F3ECE2]">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#221D1A]">
                      3. Recipient / Couple Name
                    </label>
                    <span className="text-[10px] text-[#73675E]">
                      {recipientName.length}/25 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={25}
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Deepak or Pooja &amp; Arjun"
                    className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                    Occasion Tag
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                  >
                    <option value="Happy Birthday">Happy Birthday</option>
                    <option value="Shubh Deepavali">Shubh Deepavali</option>
                    <option value="Wedding Blessings">Wedding Blessings</option>
                    <option value="Happy Anniversary">Happy Anniversary</option>
                    <option value="Thinking of You">Thinking of You</option>
                    <option value="With Gratitude">With Gratitude</option>
                    <option value="Warmest Wishes">Warmest Wishes</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#221D1A]">
                      Heartfelt Message
                    </label>
                    <span className="text-[10px] text-[#73675E]">
                      {customMessage.length}/60 characters
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    maxLength={60}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Short personal greeting (e.g. May your days burn bright and warm.)"
                    className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036] resize-none"
                  />
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="pt-3 border-t border-[#E6DED3] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#73675E] block">
                    Total (Candle + Custom Foil Label):
                  </span>
                  <span className="text-xl font-bold text-[#221D1A]">
                    ₹{totalStudioPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleStudioAddToCart}
                  className={`px-6 py-3 rounded-md text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 focus:outline-hidden ${
                    isAdded
                      ? "bg-[#75836C] text-white"
                      : "bg-[#B46036] hover:bg-[#9E502B] text-white shadow-xs"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Add Personalized Candle</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasion Inspiration Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-1">
            Gifting Occasions
          </span>
          <h2 className="font-serif text-3xl font-medium text-[#221D1A]">
            Made for Your Special Milestones
          </h2>
          <p className="text-xs sm:text-sm text-[#73675E] mt-1">
            Browse our recommended pairings for personal celebrations across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-[#E6DED3] space-y-3">
            <span className="text-2xl">🎂</span>
            <h3 className="font-serif text-lg font-medium text-[#221D1A]">
              Birthdays &amp; Milestones
            </h3>
            <p className="text-xs text-[#73675E] leading-relaxed">
              Sweet gourmand or citrus notes like Vanilla Amber or Citrus Bloom.
              Add their name and an inspiring wish to make their birthday feel
              distinctive.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E6DED3] space-y-3">
            <span className="text-2xl">💍</span>
            <h3 className="font-serif text-lg font-medium text-[#221D1A]">
              Weddings &amp; Return Gifts
            </h3>
            <p className="text-xs text-[#73675E] leading-relaxed">
              Regal notes of Damask rose, agarwood, and jasmine mogra. Customized
              with the couple’s monogram and wedding date as unforgettable guest
              favors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E6DED3] space-y-3">
            <span className="text-2xl">🪔</span>
            <h3 className="font-serif text-lg font-medium text-[#221D1A]">
              Diwali &amp; Festive Gifting
            </h3>
            <p className="text-xs text-[#73675E] leading-relaxed">
              Hand-hammered brass vessels infused with Kashmiri saffron and
              cardamom. Auspicious greetings for family, clients, and friends.
            </p>
          </div>
        </div>
      </section>

      {/* Customizable Catalogue Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-1">
              Eligible Blends
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#221D1A]">
              All Customizable Candle Pours
            </h2>
          </div>
          <Link
            href="/custom-orders"
            className="mt-2 sm:mt-0 text-xs font-semibold text-[#B46036] hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <span>Need 20+ pieces? Inquire for bulk pricing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {customizableProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
