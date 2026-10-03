"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Sparkles,
  User,
  Heart,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { collections } from "@/data/collections";
import { candleCategories } from "@/data/categories";

export default function Header() {
  const pathname = usePathname();
  const { itemCount, openCart, openSearch } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [concernDropdown, setConcernDropdown] = useState(false);
  const [mobileConcernOpen, setMobileConcernOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setConcernDropdown(false);
  }, [pathname]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#221D1A] text-[#FAF7F2] text-xs py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C29D57] animate-pulse" />
        <span>Hand-Poured in India • Free Delivery Across India on Orders Above ₹999</span>
        <Sparkles className="w-3.5 h-3.5 text-[#C29D57] animate-pulse" />
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-[#E6DED3]"
            : "bg-[#FAF7F2] border-[#E6DED3]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#221D1A] hover:text-[#B46036] transition-colors focus:outline-hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
              <button
                type="button"
                onClick={openSearch}
                className="p-2 text-[#221D1A] hover:text-[#B46036] transition-colors focus:outline-hidden"
                aria-label="Search candles"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link href="/" className="inline-block group focus:outline-hidden">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-medium text-[#221D1A] group-hover:text-[#B46036] transition-colors uppercase">
                  STARRY AK
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#73675E] uppercase -mt-0.5">
                  Artisanal Pours • India
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#221D1A]">
              {/* 1st Item: Shop All */}
              <Link
                href="/shop"
                className={`transition-colors hover:text-[#B46036] tracking-wide ${
                  pathname === "/shop" && !concernDropdown ? "text-[#B46036] font-semibold" : ""
                }`}
              >
                Shop All
              </Link>

              {/* 2nd Item: Shop by Concern Dropdown (Contains Collection & Type inside it) */}
              <div
                className="relative"
                onMouseEnter={() => setConcernDropdown(true)}
                onMouseLeave={() => setConcernDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => setConcernDropdown(!concernDropdown)}
                  className={`flex items-center gap-1.5 hover:text-[#B46036] transition-colors tracking-wide py-2 focus:outline-hidden ${
                    concernDropdown || pathname.startsWith("/collections")
                      ? "text-[#B46036] font-semibold"
                      : ""
                  }`}
                  aria-expanded={concernDropdown}
                >
                  <span>Shop by Concern</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      concernDropdown ? "rotate-180 text-[#B46036]" : "opacity-70"
                    }`}
                  />
                </button>

                {concernDropdown && (
                  <div className="absolute top-full -left-12 w-[620px] bg-white border border-[#E6DED3] rounded-xl shadow-xl p-5 z-50 animate-fade-in">
                    <div className="grid grid-cols-2 gap-6 divide-x divide-[#F3ECE2]">
                      {/* Left Column: By Candle Type */}
                      <div className="space-y-3">
                        <div className="pb-2 border-b border-[#F3ECE2]">
                          <span className="text-[11px] uppercase tracking-wider text-[#B46036] font-bold block">
                            By Candle Type
                          </span>
                          <span className="text-[11px] text-[#73675E]">
                            4 distinct artisanal formats
                          </span>
                        </div>

                        <div className="space-y-1">
                          {candleCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/shop?type=${cat.id}`}
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
                            >
                              <span className="text-xl p-1 bg-[#FAF7F2] group-hover:bg-[#F3ECE2] rounded-md transition-colors shrink-0">
                                {cat.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-[#221D1A] group-hover:text-[#B46036] transition-colors flex items-center justify-between">
                                  <span>{cat.name}</span>
                                  <span className="text-[10px] text-[#8E8379] font-normal">4 pours</span>
                                </div>
                                <div className="text-[11px] text-[#73675E] truncate">
                                  {cat.tagline}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: By Collection & Concern */}
                      <div className="pl-6 space-y-3">
                        <div className="pb-2 border-b border-[#F3ECE2]">
                          <span className="text-[11px] uppercase tracking-wider text-[#B46036] font-bold block">
                            By Collection &amp; Occasion
                          </span>
                          <span className="text-[11px] text-[#73675E]">
                            Formulated for vibe, ritual &amp; gifting
                          </span>
                        </div>

                        <div className="space-y-1 max-h-[250px] overflow-y-auto pr-1">
                          {collections.map((col) => (
                            <Link
                              key={col.slug}
                              href={`/collections/${col.slug}`}
                              className="group block p-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
                            >
                              <div className="text-xs font-semibold text-[#221D1A] group-hover:text-[#B46036] transition-colors">
                                {col.title}
                              </div>
                              <div className="text-[11px] text-[#73675E] truncate">
                                {col.subtitle}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-[#F3ECE2] mt-4 pt-3 flex items-center justify-between text-xs bg-[#FAF7F2]/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                      <span className="text-[11px] text-[#73675E]">
                        All 16 handcrafted candles with custom colour &amp; scent selection
                      </span>
                      <Link
                        href="/shop"
                        className="font-semibold text-[#B46036] hover:text-[#221D1A] transition-colors flex items-center gap-1"
                      >
                        <span>View All 16 Candles</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3rd Item: Personalized */}
              <Link
                href="/personalized"
                className={`transition-colors hover:text-[#B46036] tracking-wide flex items-center gap-1.5 ${
                  pathname === "/personalized"
                    ? "text-[#B46036] font-semibold"
                    : ""
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C29D57]" />
                <span>Personalized</span>
              </Link>

              {/* 4th Item: About */}
              <Link
                href="/about"
                className={`transition-colors hover:text-[#B46036] tracking-wide ${
                  pathname === "/about" ? "text-[#B46036] font-semibold" : ""
                }`}
              >
                About
              </Link>

              {/* 5th Item: Contact */}
              <Link
                href="/contact"
                className={`transition-colors hover:text-[#B46036] tracking-wide ${
                  pathname === "/contact" ? "text-[#B46036] font-semibold" : ""
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Desktop Search Trigger */}
              <button
                type="button"
                onClick={openSearch}
                className="hidden lg:flex items-center gap-2 text-sm text-[#73675E] hover:text-[#221D1A] bg-[#F3ECE2]/80 hover:bg-[#F3ECE2] px-3.5 py-1.5 rounded-full transition-all border border-[#E6DED3] focus:outline-hidden"
              >
                <Search className="w-4 h-4 stroke-[1.5]" />
                <span className="text-xs">Search scents...</span>
              </button>

              {/* Account Placeholder */}
              <div className="relative group hidden sm:block">
                <button
                  type="button"
                  className="p-2 text-[#221D1A] hover:text-[#B46036] transition-colors focus:outline-hidden"
                  title="My Account (Prototype Placeholder)"
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                </button>
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-[#221D1A] text-white text-[11px] py-1 px-2.5 rounded whitespace-nowrap shadow-md z-50">
                  Account Sign-in (Ready for Auth)
                </div>
              </div>

              {/* Cart Button */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-[#221D1A] hover:text-[#B46036] transition-colors focus:outline-hidden group"
                aria-label={`View shopping bag with ${itemCount} items`}
              >
                <ShoppingBag className="w-6 h-6 stroke-[1.5] group-hover:scale-105 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-0.5 bg-[#B46036] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in shadow-xs">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl flex flex-col z-50 animate-fade-in border-r border-[#E6DED3]">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E6DED3] flex items-center justify-between">
              <div>
                <span className="font-serif text-xl tracking-[0.2em] font-medium text-[#221D1A] uppercase">
                  STARRY AK
                </span>
                <span className="block text-[9px] tracking-widest text-[#73675E] uppercase">
                  Artisanal Pours
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#73675E] hover:text-[#221D1A] focus:outline-hidden"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-5">
              <Link
                href="/shop"
                className="block text-lg font-medium text-[#221D1A] hover:text-[#B46036] transition-colors"
              >
                Shop All Candles
              </Link>

              {/* Mobile "Shop by Concern" with Type and Collection inside it */}
              <div className="pt-2 border-t border-[#E6DED3]/60">
                <button
                  type="button"
                  onClick={() => setMobileConcernOpen(!mobileConcernOpen)}
                  className="w-full flex items-center justify-between text-xs uppercase tracking-wider text-[#B46036] font-bold py-1 focus:outline-hidden"
                >
                  <span>Shop by Concern</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileConcernOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileConcernOpen && (
                  <div className="space-y-3 pt-2">
                    {/* Candle Types inside Shop by Concern */}
                    <div className="bg-[#F3ECE2]/60 p-3 rounded-lg border border-[#E6DED3]">
                      <span className="text-[10px] uppercase tracking-wider text-[#73675E] font-bold block mb-2">
                        By Candle Type
                      </span>
                      <div className="space-y-1.5">
                        {candleCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?type=${cat.id}`}
                            className="flex items-center justify-between text-xs text-[#221D1A] hover:text-[#B46036] transition-colors py-0.5"
                          >
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              <span className="font-medium">{cat.name}</span>
                            </span>
                            <span className="text-[10px] text-[#8E8379]">4 pours</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Collections inside Shop by Concern */}
                    <div className="bg-[#F3ECE2]/60 p-3 rounded-lg border border-[#E6DED3]">
                      <span className="text-[10px] uppercase tracking-wider text-[#73675E] font-bold block mb-2">
                        By Collection &amp; Occasion
                      </span>
                      <div className="space-y-2">
                        {collections.map((col) => (
                          <Link
                            key={col.slug}
                            href={`/collections/${col.slug}`}
                            className="block text-xs text-[#221D1A] hover:text-[#B46036] transition-colors"
                          >
                            <div className="font-medium">{col.title}</div>
                            <div className="text-[10px] text-[#73675E] truncate">
                              {col.subtitle}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#E6DED3]/60 space-y-4">
                <Link
                  href="/personalized"
                  className="flex items-center gap-2 text-base font-medium text-[#221D1A] hover:text-[#B46036]"
                >
                  <Sparkles className="w-4 h-4 text-[#C29D57]" />
                  <span>Personalized Candles</span>
                </Link>

                <Link
                  href="/about"
                  className="block text-base font-medium text-[#221D1A] hover:text-[#B46036]"
                >
                  Our Story &amp; Craft
                </Link>

                <Link
                  href="/contact"
                  className="block text-base font-medium text-[#221D1A] hover:text-[#B46036]"
                >
                  Contact &amp; Studio
                </Link>

                <Link
                  href="/faq"
                  className="block text-base font-medium text-[#221D1A] hover:text-[#B46036]"
                >
                  FAQ &amp; Candle Care
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-[#E6DED3] bg-[#F3ECE2]/50 text-xs text-[#73675E] space-y-2">
              <p>🇮🇳 Made with care in India</p>
              <div className="flex gap-4 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B46036] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B46036] transition-colors text-emerald-800 font-medium"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
