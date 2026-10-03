"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  Search,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Check,
} from "lucide-react";
import { products } from "@/data/products";
import { candleCategories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import { ScentFamily, CandleCategory } from "@/types";

const scentFamilies: ScentFamily[] = [
  "Warm & Woody",
  "Floral",
  "Fresh & Citrus",
  "Gourmand & Spicy",
  "Earthy & Herbal",
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialSort = searchParams.get("sort") || "featured";
  const initialCollection = searchParams.get("collection") || "all";
  const initialOccasion = searchParams.get("occasion") || "all";
  const initialType = searchParams.get("type") || searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [selectedCandleType, setSelectedCandleType] = useState<string>(initialType);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [selectedScentFamily, setSelectedScentFamily] = useState("all");
  const [priceTier, setPriceTier] = useState<"all" | "under500" | "500-800" | "above800">("all");
  const [sortBy, setSortBy] = useState(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active Category Meta
  const activeCategoryMeta = useMemo(() => {
    return candleCategories.find((c) => c.id === selectedCandleType);
  }, [selectedCandleType]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.scentNotes.family.toLowerCase().includes(q) ||
          p.scentNotes.top.some((n) => n.toLowerCase().includes(q)) ||
          p.scentNotes.heart.some((n) => n.toLowerCase().includes(q)) ||
          p.scentNotes.base.some((n) => n.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Candle Category / Type
      if (selectedCandleType !== "all" && p.category !== selectedCandleType) {
        return false;
      }

      // Collection
      if (selectedCollection !== "all" && !p.collections.includes(selectedCollection)) {
        return false;
      }

      // Occasion
      if (selectedOccasion !== "all" && !p.occasions.includes(selectedOccasion as any)) {
        return false;
      }

      // Scent Family
      if (selectedScentFamily !== "all" && p.scentNotes.family !== selectedScentFamily) {
        return false;
      }

      // Price Tier
      if (priceTier === "under500" && p.basePrice >= 500) return false;
      if (priceTier === "500-800" && (p.basePrice < 500 || p.basePrice > 800)) return false;
      if (priceTier === "above800" && p.basePrice <= 800) return false;

      return true;
    });
  }, [
    search,
    selectedCandleType,
    selectedCollection,
    selectedOccasion,
    selectedScentFamily,
    priceTier,
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.basePrice - b.basePrice);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.basePrice - a.basePrice);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "bestseller") {
      return list.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    }
    // Default featured
    return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [filteredProducts, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCandleType("all");
    setSelectedCollection("all");
    setSelectedOccasion("all");
    setSelectedScentFamily("all");
    setPriceTier("all");
    setSortBy("featured");
  };

  const hasActiveFilters =
    search !== "" ||
    selectedCandleType !== "all" ||
    selectedCollection !== "all" ||
    selectedOccasion !== "all" ||
    selectedScentFamily !== "all" ||
    priceTier !== "all";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold bg-[#F3ECE2] px-3.5 py-1 rounded-full border border-[#E6DED3] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Starry AK Candle Atelier</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221D1A] font-medium tracking-tight">
          Handcrafted Scented Candles
        </h1>
        <p className="text-xs sm:text-sm text-[#73675E] mt-2">
          Poured in small batches in India. 100% natural soy, pure Indian beeswax &amp; coconut wax formulations with fine IFRA-certified aromas.
        </p>
      </div>

      {/* Primary Candle Category Navigation Tabs */}
      <div className="mb-8">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setSelectedCandleType("all")}
            className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap focus:outline-hidden flex items-center gap-1.5 ${
              selectedCandleType === "all"
                ? "bg-[#221D1A] text-white shadow-xs"
                : "bg-white text-[#73675E] hover:text-[#221D1A] border border-[#E6DED3]"
            }`}
          >
            <span>All Candles</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCandleType === "all"
                  ? "bg-white/20 text-white"
                  : "bg-[#F3ECE2] text-[#73675E]"
              }`}
            >
              {products.length}
            </span>
          </button>

          {candleCategories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCandleType === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCandleType(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap focus:outline-hidden flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#221D1A] text-white shadow-xs"
                    : "bg-white text-[#73675E] hover:text-[#221D1A] border border-[#E6DED3]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#F3ECE2] text-[#73675E]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Spotlight Card (When a specific category is chosen) */}
      {activeCategoryMeta && (
        <div className="mb-8 p-5 sm:p-6 bg-gradient-to-r from-[#FAF7F2] to-[#F3ECE2] rounded-lg border border-[#E6DED3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeCategoryMeta.icon}</span>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#221D1A]">
                {activeCategoryMeta.name}
              </h2>
              <span className="text-[10px] uppercase font-semibold tracking-wider bg-[#B46036]/10 text-[#B46036] px-2.5 py-0.5 rounded-full">
                {activeCategoryMeta.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#73675E] max-w-2xl">
              {activeCategoryMeta.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedCandleType("all")}
            className="text-xs text-[#B46036] hover:underline self-start sm:self-center font-medium shrink-0 flex items-center gap-1"
          >
            <span>View All Categories</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      {/* Main Layout: Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Mobile Filter Toggle & Search Bar */}
        <div className="lg:hidden col-span-1 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#73675E]" />
              <input
                type="text"
                placeholder="Search scents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#E6DED3] rounded-md text-xs text-[#221D1A] placeholder-[#8E8379] focus:outline-hidden focus:border-[#B46036]"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="px-3.5 py-2 bg-white border border-[#E6DED3] rounded-md text-xs font-medium text-[#221D1A] flex items-center gap-1.5 shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters && "•"}</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#73675E]">
            <span>{sortedProducts.length} candles available</span>
            <div className="flex items-center gap-1">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-[#221D1A] text-xs focus:outline-hidden"
              >
                <option value="featured">Featured</option>
                <option value="bestseller">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-lg border border-[#E6DED3] space-y-6 shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F3ECE2]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#221D1A]" />
                <h3 className="font-serif text-base font-semibold text-[#221D1A]">
                  Filter Catalogue
                </h3>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] text-[#B46036] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#73675E]" />
                <input
                  type="text"
                  placeholder="e.g. Vanilla, Latte, Beeswax..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E6DED3] rounded-md text-xs text-[#221D1A] placeholder-[#8E8379] focus:outline-hidden focus:border-[#B46036]"
                />
              </div>
            </div>

            {/* Candle Category / Type Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                Candle Type
              </label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCandleType("all")}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                    selectedCandleType === "all"
                      ? "bg-[#F3ECE2] font-semibold text-[#221D1A]"
                      : "text-[#73675E] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <span>All Candle Types</span>
                  <span className="text-[10px] text-[#8E8379]">({products.length})</span>
                </button>
                {candleCategories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCandleType(cat.id)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                        selectedCandleType === cat.id
                          ? "bg-[#F3ECE2] font-semibold text-[#221D1A]"
                          : "text-[#73675E] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-[10px] text-[#8E8379]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scent Family */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                Fragrance Family
              </label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedScentFamily("all")}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded transition-colors ${
                    selectedScentFamily === "all"
                      ? "bg-[#F3ECE2] font-semibold text-[#221D1A]"
                      : "text-[#73675E] hover:bg-[#FAF7F2]"
                  }`}
                >
                  All Fragrance Families
                </button>
                {scentFamilies.map((fam) => (
                  <button
                    key={fam}
                    type="button"
                    onClick={() => setSelectedScentFamily(fam)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                      selectedScentFamily === fam
                        ? "bg-[#F3ECE2] font-semibold text-[#221D1A]"
                        : "text-[#73675E] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <span>{fam}</span>
                    <span className="text-[10px] text-[#8E8379]">
                      ({products.filter((p) => p.scentNotes.family === fam).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                Occasion / Season
              </label>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
              >
                <option value="all">All Occasions</option>
                <option value="gift-boxes-for-her">🎁 Gift Boxes for Her</option>
                <option value="gift-boxes-for-him">🎁 Gift Boxes for Him</option>
                <option value="diwali">Diwali Radiance</option>
                <option value="christmas">Christmas &amp; Winter</option>
                <option value="birthday">Birthday Keepsake</option>
                <option value="wedding">Weddings &amp; Trousseau</option>
                <option value="gifting">Gift Hampers</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                Price Tier
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "all", label: "Any Price" },
                  { id: "under500", label: "Under ₹500" },
                  { id: "500-800", label: "₹500 — ₹800" },
                  { id: "above800", label: "Above ₹800" },
                ].map((tier) => (
                  <label
                    key={tier.id}
                    className="flex items-center gap-2 text-xs text-[#73675E] cursor-pointer hover:text-[#221D1A]"
                  >
                    <input
                      type="radio"
                      name="priceTier"
                      checked={priceTier === tier.id}
                      onChange={() => setPriceTier(tier.id as any)}
                      className="text-[#B46036] focus:ring-[#B46036]"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Desktop Toolbar */}
          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-[#E6DED3]">
            <span className="text-xs text-[#73675E]">
              Showing <span className="font-semibold text-[#221D1A]">{sortedProducts.length}</span> candles
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#73675E]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E6DED3] text-xs text-[#221D1A] rounded px-3 py-1.5 focus:outline-hidden focus:border-[#B46036]"
              >
                <option value="featured">Featured Pours</option>
                <option value="bestseller">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#73675E]">Active:</span>

              {selectedCandleType !== "all" && activeCategoryMeta && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E6DED3] text-xs px-2.5 py-0.5 rounded-full text-[#221D1A]">
                  Type: {activeCategoryMeta.icon} {activeCategoryMeta.name}
                  <button type="button" onClick={() => setSelectedCandleType("all")}>
                    <X className="w-3 h-3 text-[#73675E]" />
                  </button>
                </span>
              )}


              {search && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E6DED3] text-xs px-2.5 py-0.5 rounded-full text-[#221D1A]">
                  &quot;{search}&quot;
                  <button type="button" onClick={() => setSearch("")}>
                    <X className="w-3 h-3 text-[#73675E]" />
                  </button>
                </span>
              )}

              {selectedScentFamily !== "all" && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E6DED3] text-xs px-2.5 py-0.5 rounded-full text-[#221D1A]">
                  Family: {selectedScentFamily}
                  <button type="button" onClick={() => setSelectedScentFamily("all")}>
                    <X className="w-3 h-3 text-[#73675E]" />
                  </button>
                </span>
              )}

              {selectedOccasion !== "all" && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E6DED3] text-xs px-2.5 py-0.5 rounded-full text-[#221D1A]">
                  Occasion: {selectedOccasion}
                  <button type="button" onClick={() => setSelectedOccasion("all")}>
                    <X className="w-3 h-3 text-[#73675E]" />
                  </button>
                </span>
              )}

              {priceTier !== "all" && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E6DED3] text-xs px-2.5 py-0.5 rounded-full text-[#221D1A]">
                  Price: {priceTier}
                  <button type="button" onClick={() => setPriceTier("all")}>
                    <X className="w-3 h-3 text-[#73675E]" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#B46036] hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="py-20 text-center bg-white rounded-lg border border-[#E6DED3] p-8 max-w-md mx-auto">
              <Sparkles className="w-8 h-8 text-[#C29D57] mx-auto mb-3" />
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                No matching candles found
              </h3>
              <p className="text-xs text-[#73675E] mt-1 mb-4">
                Try widening your price range, clearing scent filters, or selecting All Candles.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="bg-[#221D1A] text-white text-xs uppercase tracking-wider px-4 py-2 rounded-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF7F2] p-5 shadow-2xl flex flex-col z-50 animate-fade-in border-l border-[#E6DED3]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6DED3]">
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                Filter Catalogue
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#73675E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {/* Candle Category / Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                  Candle Type
                </label>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCandleType("all")}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded flex items-center justify-between ${
                      selectedCandleType === "all"
                        ? "bg-[#F3ECE2] font-semibold text-[#221D1A]"
                        : "text-[#73675E]"
                    }`}
                  >
                    <span>All Types</span>
                    <span className="text-[10px] text-[#8E8379]">({products.length})</span>
                  </button>
                  {candleCategories.map((cat) => {
                    const count = products.filter((p) => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCandleType(cat.id)}
                        className={`w-full text-left text-xs px-2.5 py-1.5 rounded flex items-center justify-between ${
                          selectedCandleType === cat.id
                            ? "bg-[#F3ECE2] font-semibold text-[#221D1A]"
                            : "text-[#73675E]"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                        <span className="text-[10px] text-[#8E8379]">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scent family */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                  Fragrance Family
                </label>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedScentFamily("all")}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded ${
                      selectedScentFamily === "all"
                        ? "bg-[#F3ECE2] font-semibold text-[#221D1A]"
                        : "text-[#73675E]"
                    }`}
                  >
                    All Families
                  </button>
                  {scentFamilies.map((fam) => (
                    <button
                      key={fam}
                      type="button"
                      onClick={() => setSelectedScentFamily(fam)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded ${
                        selectedScentFamily === fam
                          ? "bg-[#F3ECE2] font-semibold text-[#221D1A]"
                          : "text-[#73675E]"
                      }`}
                    >
                      {fam}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                  Occasion / Season
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full bg-white border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A]"
                >
                  <option value="all">All Occasions</option>
                  <option value="gift-boxes-for-her">🎁 Gift Boxes for Her</option>
                  <option value="gift-boxes-for-him">🎁 Gift Boxes for Him</option>
                  <option value="diwali">Diwali Radiance</option>
                  <option value="christmas">Christmas &amp; Winter</option>
                  <option value="birthday">Birthday Keepsake</option>
                  <option value="wedding">Weddings &amp; Trousseau</option>
                  <option value="gifting">Gift Hampers</option>
                </select>
              </div>

              {/* Price Tier */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-2">
                  Price Tier
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: "all", label: "Any Price" },
                    { id: "under500", label: "Under ₹500" },
                    { id: "500-800", label: "₹500 — ₹800" },
                    { id: "above800", label: "Above ₹800" },
                  ].map((tier) => (
                    <label
                      key={tier.id}
                      className="flex items-center gap-2 text-xs text-[#73675E]"
                    >
                      <input
                        type="radio"
                        name="mobilePriceTier"
                        checked={priceTier === tier.id}
                        onChange={() => setPriceTier(tier.id as any)}
                        className="text-[#B46036]"
                      />
                      <span>{tier.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6DED3] space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#B46036] text-white py-2.5 rounded text-xs uppercase tracking-wider font-medium"
              >
                Apply Filters ({sortedProducts.length})
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full text-xs text-[#73675E] py-1 underline"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
