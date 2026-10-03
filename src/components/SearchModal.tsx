"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.scentNotes.family.toLowerCase().includes(q) ||
          p.scentNotes.top.some((note) => note.toLowerCase().includes(q)) ||
          p.scentNotes.heart.some((note) => note.toLowerCase().includes(q)) ||
          p.scentNotes.base.some((note) => note.toLowerCase().includes(q)) ||
          p.collections.some((col) => col.toLowerCase().includes(q))
        );
      })
    : [];

  const quickTags = [
    "Sandalwood",
    "Vanilla",
    "Diwali",
    "Mogra Jasmine",
    "Rose & Oud",
    "Customizable",
    "Coffee",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeSearch}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 pb-10">
        <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-xl shadow-2xl border border-[#E6DED3] text-left overflow-hidden z-50 animate-fade-in">
          {/* Search Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E6DED3] bg-white flex items-center gap-3">
            <Search className="w-5 h-5 text-[#73675E] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by candle name, notes (e.g. Sandalwood, Jasmine, Vanilla)..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#221D1A] placeholder-[#8E8379] focus:outline-hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-[#73675E] hover:text-[#221D1A]"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={closeSearch}
              className="p-1.5 text-[#73675E] hover:text-[#221D1A] rounded-full hover:bg-[#FAF7F2]"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-5 py-3 bg-[#F3ECE2]/60 border-b border-[#E6DED3] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#73675E] shrink-0 font-medium">Quick find:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-full bg-white border border-[#E6DED3] text-[#221D1A] hover:border-[#B46036] hover:text-[#B46036] shrink-0 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-5">
            {query.trim() === "" ? (
              <div className="py-8 text-center">
                <p className="text-xs uppercase tracking-wider text-[#73675E] font-medium mb-3">
                  Popular Artisanal Blends
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  {products.slice(0, 4).map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={closeSearch}
                      className="group p-2.5 rounded-lg border border-[#E6DED3] bg-white hover:border-[#B46036] transition-all"
                    >
                      <div className="relative aspect-square rounded overflow-hidden mb-2 bg-[#F3ECE2]">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="150px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="font-serif text-xs font-semibold text-[#221D1A] truncate">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-[#73675E]">
                        From ₹{p.basePrice}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="font-serif text-base text-[#221D1A]">
                  No candles found matching &quot;{query}&quot;
                </p>
                <p className="text-xs text-[#73675E]">
                  Try searching for ingredients like amber, rose, lavender, or explore our occasions.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#73675E] font-medium uppercase tracking-wider">
                  Found {filteredProducts.length} Candle
                  {filteredProducts.length > 1 ? "s" : ""}
                </p>
                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-3.5 p-3 rounded-lg bg-white border border-[#E6DED3] hover:border-[#B46036] hover:shadow-xs transition-all group"
                    >
                      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-[#F3ECE2] shrink-0">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-sm font-medium text-[#221D1A] group-hover:text-[#B46036] transition-colors truncate">
                            {p.name}
                          </h4>
                          {p.customizable && (
                            <span className="text-[9px] bg-[#F3ECE2] text-[#B46036] px-1.5 py-0.5 rounded font-semibold shrink-0">
                              Customizable
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#73675E] truncate">
                          {p.scentNotes.summary}
                        </p>
                        <div className="text-[11px] text-[#73675E] mt-0.5">
                          Notes: {p.scentNotes.top.slice(0, 2).join(", ")}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#221D1A] block">
                          ₹{p.basePrice}
                        </span>
                        <span className="text-[10px] text-[#B46036] flex items-center gap-1 group-hover:underline">
                          <span>View</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
