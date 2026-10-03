"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Flame,
  Droplets,
  Clock,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import { products } from "@/data/products";
import { ProductVariant, PersonalizedData } from "@/types";
import ProductGallery from "@/components/ProductGallery";
import VariantSelector from "@/components/VariantSelector";
import QuantitySelector from "@/components/QuantitySelector";
import PersonalizationSection from "@/components/PersonalizationSection";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[1] || product.variants[0]
  );
  const [selectedColour, setSelectedColour] = useState(
    product.availableColours?.[0]?.name || "Warm Ivory"
  );
  const [selectedFragrance, setSelectedFragrance] = useState(
    product.availableFragrances?.[0] || "Madagascar Vanilla Amber"
  );
  const [quantity, setQuantity] = useState(1);
  const [personalizationData, setPersonalizationData] =
    useState<PersonalizedData | null>(null);
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${product.name} - Starry AK`,
          text: product.tagline,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from same collection or family
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.scentNotes.family === product.scentNotes.family ||
          p.collections.some((c) => product.collections.includes(c)))
    )
    .slice(0, 4);

  const productFaqs: FAQItem[] = [
    {
      question: "What is this candle made of?",
      answer:
        "We use a 100% plant-based soy and coconut wax blend hand-poured in India. It burns cleaner and slower than petroleum-based paraffin, releasing subtle fragrance without black soot. Our wicks are braided from pure lead-free cotton.",
      category: "Ingredients & Craft",
    },
    {
      question: "How long will this candle burn?",
      answer: `This ${selectedVariant.weight} candle provides approximately ${selectedVariant.burnTime} of fragrance throw when cared for properly with trimmed wicks and uninterrupted melt pools.`,
      category: "Burn Time",
    },
    {
      question: "Can I personalize this candle for an event?",
      answer: product.customizable
        ? "Yes! You can add a personalized gold-foiled label directly on this page. For large wedding, corporate, or party favor orders (20+ pieces), you can also submit a bespoke request via our Bulk Orders page."
        : "This particular limited edition pour comes with its standard artisanal atelier label. For personalized candles, check our 'Personalized' tab for customizable options.",
      category: "Customization",
    },
    {
      question: "How long does shipping take across India?",
      answer:
        "Orders are hand-packed within 24–48 hours from Bengaluru/Mumbai. Metro deliveries typically arrive in 2–3 business days; other Indian locations arrive in 4–6 business days via our tracked courier partners.",
      category: "Shipping in India",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#73675E] flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#221D1A]">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#221D1A]">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop?type=${product.category}`}
          className="hover:text-[#221D1A]"
        >
          {product.category === "jar" && "Jar"}
          {product.category === "pillar" && "Pillar"}
          {product.category === "beeswax" && "Beeswax"}
          {product.category === "cafe" && "Cafe"}
        </Link>
        <span>/</span>
        <span className="text-[#B46036] font-medium">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            isCustomizable={product.customizable}
          />

          {/* Olfactory / Scent Notes Pyramid */}
          <div className="mt-8 bg-white p-6 rounded-xl border border-[#E6DED3] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3ECE2] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B46036] font-semibold block">
                  Olfactory Composition
                </span>
                <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                  Scent Profile &amp; Notes
                </h3>
              </div>
              <span className="text-xs bg-[#FAF7F2] text-[#221D1A] px-2.5 py-1 rounded-full border border-[#E6DED3] font-medium">
                {product.scentNotes.family}
              </span>
            </div>

            <p className="text-xs text-[#73675E] italic">
              {product.scentNotes.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E6DED3]/60">
                <span className="text-[10px] uppercase tracking-wider text-[#B46036] font-bold block mb-1">
                  Top Notes
                </span>
                <ul className="text-xs text-[#221D1A] space-y-0.5">
                  {product.scentNotes.top.map((n) => (
                    <li key={n}>• {n}</li>
                  ))}
                </ul>
                <span className="text-[9px] text-[#8E8379] block mt-1">
                  First 15–20 minutes
                </span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E6DED3]/60">
                <span className="text-[10px] uppercase tracking-wider text-[#B46036] font-bold block mb-1">
                  Heart Notes
                </span>
                <ul className="text-xs text-[#221D1A] space-y-0.5">
                  {product.scentNotes.heart.map((n) => (
                    <li key={n}>• {n}</li>
                  ))}
                </ul>
                <span className="text-[9px] text-[#8E8379] block mt-1">
                  Main fragrance body
                </span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E6DED3]/60">
                <span className="text-[10px] uppercase tracking-wider text-[#B46036] font-bold block mb-1">
                  Base Notes
                </span>
                <ul className="text-xs text-[#221D1A] space-y-0.5">
                  {product.scentNotes.base.map((n) => (
                    <li key={n}>• {n}</li>
                  ))}
                </ul>
                <span className="text-[9px] text-[#8E8379] block mt-1">
                  Deep, lingering warmth
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#73675E] pt-2 border-t border-[#F3ECE2]">
              <span>Intensity: <strong className="text-[#221D1A]">{product.scentNotes.intensity}</strong></span>
              <span>Wax: <strong className="text-[#221D1A]">{product.waxType}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Product Purchase Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#C29D57]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#221D1A]">
                  {product.rating}
                </span>
                <span className="text-xs text-[#73675E]">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="text-xs text-[#73675E] hover:text-[#221D1A] flex items-center gap-1 p-1"
                aria-label="Share this candle"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#75836C]" />
                    <span className="text-[#75836C]">Link copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/shop?type=${product.category}`}
                className="text-[10px] uppercase font-bold tracking-widest text-[#B46036] bg-[#F3ECE2] hover:bg-[#E6DED3] px-2.5 py-0.5 rounded-xs transition-colors"
              >
                {product.category === "jar" && "🫙 Jar"}
                {product.category === "pillar" && "🏛️ Pillar"}
                {product.category === "beeswax" && "🐝 Beeswax"}
                {product.category === "cafe" && "☕ Cafe"}
              </Link>
              {product.bestseller && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-[#221D1A] px-2 py-0.5 rounded-xs">
                  Bestseller
                </span>
              )}
              {product.newArrival && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-[#B46036] px-2 py-0.5 rounded-xs">
                  New Pour
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A] leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-[#73675E] mt-1 italic">
              {product.tagline}
            </p>

            {/* Price Display */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#221D1A]">
                ₹
                {selectedVariant.price +
                  (personalizationData && product.personalization
                    ? product.personalization.additionalPrice
                    : 0)}
              </span>
              {selectedVariant.compareAtPrice && (
                <span className="text-sm text-[#8E8379] line-through">
                  ₹{selectedVariant.compareAtPrice}
                </span>
              )}
              <span className="text-xs text-[#75836C] font-semibold bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E6DED3]">
                Inclusive of all taxes
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#73675E] leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selection */}
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />

          {/* 1. Colour Selection */}
          <div className="space-y-2.5 pt-2 border-t border-[#F3ECE2]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#221D1A]">
                1. Select Colour
              </label>
              <span className="text-xs text-[#B46036] font-semibold">
                {selectedColour}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {product.availableColours.map((c) => {
                const isSelected = selectedColour === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColour(c.name)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#221D1A] text-white border-[#221D1A] shadow-xs"
                        : "bg-white text-[#73675E] hover:text-[#221D1A] border-[#E6DED3] hover:border-[#B46036]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 shadow-2xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Fragrance Selection */}
          <div className="space-y-2.5 pt-2 border-t border-[#F3ECE2]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#221D1A]">
                2. Select Fragrance
              </label>
              <span className="text-xs text-[#B46036] font-semibold truncate max-w-[200px]">
                {selectedFragrance}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.availableFragrances.map((f) => {
                const isSelected = selectedFragrance === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFragrance(f)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-all ${
                      isSelected
                        ? "bg-[#F3ECE2] border-[#B46036] text-[#221D1A] font-semibold shadow-xs ring-1 ring-[#B46036]/50"
                        : "bg-white border-[#E6DED3] text-[#73675E] hover:border-[#B46036]/60 hover:text-[#221D1A]"
                    }`}
                  >
                    <span className="truncate pr-1">{f}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-[#B46036] bg-[#B46036] text-white"
                          : "border-[#D5C8B8] bg-transparent"
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selection Summary Badge */}
          <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E6DED3] text-xs space-y-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#B46036]">
              Your Selection Summary
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[#73675E]">
              <span>Colour: <strong className="text-[#221D1A]">{selectedColour}</strong></span>
              <span>Fragrance: <strong className="text-[#221D1A]">{selectedFragrance}</strong></span>
            </div>
          </div>

          {/* Personalization Section if enabled */}
          {product.customizable && product.personalization && (
            <PersonalizationSection
              config={product.personalization}
              personalizationData={personalizationData}
              onUpdatePersonalization={setPersonalizationData}
            />
          )}

          {/* Quantity Stepper */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A]">
              Quantity
            </label>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(20, q + 1))}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          </div>

          {/* Add to Cart / Buy Now CTAs */}
          <AddToCartButton
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            personalizationData={personalizationData}
            selectedColour={selectedColour}
            selectedFragrance={selectedFragrance}
          />

          {/* Pincode & Delivery Checker for India */}
          <div className="p-4 rounded-lg bg-white border border-[#E6DED3] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#221D1A]">
              <Truck className="w-4 h-4 text-[#B46036]" />
              <span>Check Delivery in India</span>
            </div>

            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, ""));
                  setPincodeChecked(false);
                }}
                placeholder="Enter 6-digit Pincode"
                className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] placeholder-[#8E8379] focus:outline-hidden focus:border-[#B46036]"
              />
              <button
                type="submit"
                className="bg-[#221D1A] text-white px-4 py-2 rounded text-xs font-medium uppercase tracking-wider hover:bg-[#3D332B] transition-colors shrink-0"
              >
                Check
              </button>
            </form>

            {pincodeChecked && (
              <div className="text-xs text-[#75836C] bg-[#FAF7F2] p-2.5 rounded border border-[#E6DED3] animate-fade-in space-y-1">
                <p className="font-semibold">
                  ✓ Delivery available to {pincode}
                </p>
                <p className="text-[11px] text-[#73675E]">
                  Metro delivery: <strong>2–3 business days</strong>. Rest of India: <strong>4–6 days</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs text-[#73675E] pt-2">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#C29D57]" />
              <span>Transit damage replacement guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C29D57]" />
              <span>100% Plant wax &amp; clean wicks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Burn & Care Instructions */}
      <section className="bg-white rounded-xl border border-[#E6DED3] p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-1">
              Prolong Your Scent Experience
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#221D1A]">
              Artisan Candle Care &amp; Burn Guide
            </h2>
            <p className="text-xs text-[#73675E] mt-1">
              Simple rituals to ensure your candle burns cleanly, evenly, and for maximum hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {product.careTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-lg border border-[#E6DED3]"
              >
                <span className="w-6 h-6 rounded-full bg-[#B46036] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs text-[#221D1A] leading-relaxed pt-0.5">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product FAQs */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#221D1A]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#73675E] mt-1">
            Everything you need to know about our pours, wicks, and gifting.
          </p>
        </div>
        <FAQAccordion items={productFaqs} />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-[#E6DED3]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block">
                Complementary Aromas
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#221D1A]">
                You May Also Love
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#B46036] hover:underline uppercase tracking-wider"
            >
              View Catalogue &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
