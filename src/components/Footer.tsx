"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  ShieldCheck,
  Flame,
  Gift,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { collections } from "@/data/collections";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#1F1B18] text-[#FAF7F2] border-t border-[#332B25] pt-16 pb-12">
      {/* Brand Values Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-[#332B25]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start space-x-3.5">
            <Flame className="w-5 h-5 text-[#C29D57] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium tracking-wide uppercase">
                Hand-Poured
              </h4>
              <p className="text-xs text-[#A89E94] mt-1 leading-relaxed">
                Small-batch crafted with plant soy wax blend and cotton wicks.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <Heart className="w-5 h-5 text-[#C29D57] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium tracking-wide uppercase">
                Thoughtfully Scented
              </h4>
              <p className="text-xs text-[#A89E94] mt-1 leading-relaxed">
                Layered fine fragrances compliant with global IFRA standards.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <Gift className="w-5 h-5 text-[#C29D57] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium tracking-wide uppercase">
                Gift-Ready Boxes
              </h4>
              <p className="text-xs text-[#A89E94] mt-1 leading-relaxed">
                Bespoke rigid boxes tied with ribbon &amp; personalized cards.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <ShieldCheck className="w-5 h-5 text-[#C29D57] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium tracking-wide uppercase">
                Nationwide Delivery
              </h4>
              <p className="text-xs text-[#A89E94] mt-1 leading-relaxed">
                Safely packed in shock-absorbent eco-cushioning across India.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] font-medium text-[#FAF7F2] uppercase">
                STARRY AK
              </span>
              <p className="text-xs tracking-wider text-[#A89E94] mt-1 italic">
                “Hand-poured candles for moments worth remembering.”
              </p>
            </div>

            <p className="text-xs text-[#C5BCB3] leading-relaxed max-w-sm">
              An independent candle atelier born in India. We craft gentle,
              lingering fragrances that turn quiet everyday routines into
              cherished rituals.
            </p>

            {/* Newsletter / VIP club */}
            <div className="pt-2">
              <span className="text-xs font-medium uppercase tracking-wider text-[#FAF7F2] block mb-2">
                Join Our Fragrance Circle
              </span>
              <p className="text-xs text-[#A89E94] mb-3">
                Receive secret pour drops, seasonal previews &amp; festive gifting guides.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#C29D57] bg-[#2A231E] p-3 rounded border border-[#3E342B]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to Starry AK! Your first welcome discount will arrive shortly.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex max-w-sm gap-2"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-[#2B241F] border border-[#44382E] text-xs text-[#FAF7F2] placeholder-[#8E8379] px-3.5 py-2.5 rounded-sm focus:outline-hidden focus:border-[#C29D57] flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-[#B46036] hover:bg-[#9E502B] text-white px-4 py-2.5 rounded-sm text-xs font-medium tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1.5 focus:outline-hidden"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social / WhatsApp links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2B241F] flex items-center justify-center text-[#C5BCB3] hover:text-[#FAF7F2] hover:bg-[#3D332B] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2B241F] flex items-center justify-center text-[#C5BCB3] hover:text-[#FAF7F2] hover:bg-[#3D332B] transition-colors"
                aria-label="Chat with us on WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@starryak.in"
                className="w-8 h-8 rounded-full bg-[#2B241F] flex items-center justify-center text-[#C5BCB3] hover:text-[#FAF7F2] hover:bg-[#3D332B] transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="text-xs text-[#8E8379]">@starryak.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#FAF7F2]">
              Shop &amp; Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BCB3]">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  All Candles
                </Link>
              </li>
              <li>
                <Link
                  href="/personalized"
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <span>Personalized Candles</span>
                  <span className="text-[10px] text-[#C29D57] bg-[#332A22] px-1.5 py-0.5 rounded">
                    Popular
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-orders"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Bulk &amp; Event Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/gifting"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Gift Sets &amp; Hampers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?sort=bestseller"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Seasonal Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#FAF7F2]">
              Occasions
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BCB3]">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="hover:text-[#FAF7F2] transition-colors"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#FAF7F2]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BCB3]">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Our Philosophy &amp; Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Contact &amp; Studio Hours
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  FAQs &amp; Candle Care
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#shipping"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Shipping &amp; Delivery in India
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#returns"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Returns &amp; Replacements
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#privacy"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Privacy Policy &amp; Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#332B25] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E8379]">
          <p>© {new Date().getFullYear()} Starry AK. All rights reserved. Handcrafted in India.</p>
          <div className="flex gap-6">
            <span>Prices inclusive of all taxes</span>
            <span>Secure Indian Payments (UPI, Cards &amp; NetBanking ready)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
