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
  const [collectionsDropdown, setCollectionsDropdown] = useState(false);
  const [typesDropdown, setTypesDropdown] = useState(false);

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
    setCollectionsDropdown(false);
    setTypesDropdown(false);
  }, [pathname]);

  const navLinks = [
    { label: "Shop All", href: "/shop" },
    { label: "Personalized", href: "/personalized" },
    { label: "Custom Bulk Orders", href: "/custom-orders" },
    { label: "About Our Craft", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

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
              <Link
                href="/shop"
                className={`transition-colors hover:text-[#B46036] tracking-wide ${
                  pathname === "/shop" ? "text-[#B46036] font-semibold" : ""
                }`}
              >
                Shop All
              </Link>

              {/* Candle Types Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setTypesDropdown(true)}
                onMouseLeave={() => setTypesDropdown(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#B46036] transition-colors tracking-wide py-2 focus:outline-hidden"
                >
                  <span>Candle Types</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {typesDropdown && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-[#E6DED3] rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#F3ECE2]">
                      <span className="text-xs uppercase tracking-wider text-[#73675E] font-semibold">
                        Shop by Type
                      </span>
                    </div>
                    {candleCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?type=${cat.id}`}
                        className="block px-4 py-2.5 text-sm hover:bg-[#FAF7F2] hover:text-[#B46036] transition-colors"
                      >
                        <div className="flex items-center gap-2 font-medium">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </div>
                        <div className="text-[11px] text-[#73675E] truncate pl-6">
                          {cat.tagline}
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-[#F3ECE2] mt-1 pt-1">
                      <Link
                        href="/shop"
                        className="block px-4 py-2 text-xs font-semibold text-[#B46036] hover:bg-[#FAF7F2] transition-colors"
                      >
                        Explore Full Catalogue →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Collections Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsDropdown(true)}
                onMouseLeave={() => setCollectionsDropdown(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#B46036] transition-colors tracking-wide py-2 focus:outline-hidden"
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {collectionsDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-[#E6DED3] rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#F3ECE2]">
                      <span className="text-xs uppercase tracking-wider text-[#73675E] font-semibold">
                        Seasonal &amp; Occasions
                      </span>
                    </div>
                    {collections.map((col) => (
                      <Link
                        key={col.slug}
                        href={`/collections/${col.slug}`}
                        className="block px-4 py-2.5 text-sm hover:bg-[#FAF7F2] hover:text-[#B46036] transition-colors"
                      >
                        <div className="font-medium">{col.title}</div>
                        <div className="text-xs text-[#73675E] truncate">
                          {col.subtitle}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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

              <Link
                href="/custom-orders"
                className={`transition-colors hover:text-[#B46036] tracking-wide ${
                  pathname === "/custom-orders"
                    ? "text-[#B46036] font-semibold"
                    : ""
                }`}
              >
                Bulk / Events
              </Link>

              <Link
                href="/about"
                className={`transition-colors hover:text-[#B46036] tracking-wide ${
                  pathname === "/about" ? "text-[#B46036] font-semibold" : ""
                }`}
              >
                About
              </Link>

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

              {/* Mobile Candle Types */}
              <div className="pt-2 border-t border-[#E6DED3]/60">
                <span className="text-xs uppercase tracking-wider text-[#73675E] font-semibold block mb-2">
                  Candle Types
                </span>
                <div className="pl-2 space-y-2">
                  {candleCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?type=${cat.id}`}
                      className="flex items-center gap-2.5 text-sm text-[#221D1A] hover:text-[#B46036] transition-colors py-0.5"
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6DED3]/60">
                <span className="text-xs uppercase tracking-wider text-[#73675E] font-semibold block mb-2">
                  Seasonal Collections
                </span>
                <div className="pl-3 space-y-2.5">
                  {collections.map((col) => (
                    <Link
                      key={col.slug}
                      href={`/collections/${col.slug}`}
                      className="block text-sm text-[#221D1A] hover:text-[#B46036] transition-colors"
                    >
                      {col.title}
                    </Link>
                  ))}
                </div>
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
                  href="/custom-orders"
                  className="block text-base font-medium text-[#221D1A] hover:text-[#B46036]"
                >
                  Bulk &amp; Event Gifting
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
