"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  Package,
  Phone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { products } from "@/data/products";

export default function CustomOrdersPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("Wedding / Reception");
  const [quantity, setQuantity] = useState("50–100 pieces");
  const [requiredDate, setRequiredDate] = useState("");
  const [preferredProduct, setPreferredProduct] = useState("Vanilla Amber");
  const [customizationRequirements, setCustomizationRequirements] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Header */}
      <section className="bg-linear-to-b from-[#F3ECE2] to-[#FAF7F2] py-14 sm:py-20 border-b border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold bg-white px-3.5 py-1.5 rounded-full border border-[#E6DED3] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Atelier Commission</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221D1A] font-medium tracking-tight">
            Made for your moments.
          </h1>

          <p className="text-base sm:text-lg text-[#73675E] mt-4 leading-relaxed">
            Whether welcoming wedding guests, celebrating a milestone anniversary, or thanking valued corporate clients, our small-batch candle studio creates bespoke aromatic favours that leave an unforgettable impression.
          </p>
        </div>
      </section>

      {/* Main Content & Quote Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: What We Offer */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-1">
                Bespoke Capabilities
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#221D1A]">
                Crafted for Every Occasion
              </h2>
              <p className="text-xs sm:text-sm text-[#73675E] mt-2 leading-relaxed">
                From 20 to 1,000+ pieces, we handle formulation, custom foil branding, vessel selection, and safe nationwide delivery.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3.5 p-4 rounded-lg bg-white border border-[#E6DED3]">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#B46036] flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#221D1A]">
                    Weddings &amp; Trousseau Favours
                  </h4>
                  <p className="text-xs text-[#73675E] mt-0.5 leading-relaxed">
                    Custom couple monogram seals, matching ribbing, and luxurious fragrances like Mogra Jasmine &amp; Rose Oud.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 p-4 rounded-lg bg-white border border-[#E6DED3]">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#B46036] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#221D1A]">
                    Corporate Gifting &amp; Executive Hampers
                  </h4>
                  <p className="text-xs text-[#73675E] mt-0.5 leading-relaxed">
                    Elevated corporate gifts for Diwali, year-end celebrations, and brand launches with customized logo sleeves.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 p-4 rounded-lg bg-white border border-[#E6DED3]">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#B46036] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#221D1A]">
                    Birthdays, Baby Showers &amp; Return Gifts
                  </h4>
                  <p className="text-xs text-[#73675E] mt-0.5 leading-relaxed">
                    Sweet memorable tokens for guests with bespoke dates, baby names, or personalized gratitude quotes.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-5 rounded-lg bg-[#FAF7F2] border border-[#E6DED3] flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#221D1A]">
                  Urgent Date or Urgent Query?
                </h4>
                <p className="text-xs text-[#73675E] mt-0.5">
                  Speak directly with our studio coordinator.
                </p>
              </div>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#221D1A] hover:bg-[#3D332B] text-white px-3.5 py-2 rounded text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#C29D57]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E6DED3] shadow-md">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#FAF7F2] text-[#75836C] border border-[#75836C]/40 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#221D1A]">
                    Quote Request Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#73675E] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#221D1A]">{fullName}</strong>! Our studio artisan will review your requirements for <strong>{quantity}</strong> and get back to you with custom pricing and sample options within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-[#B46036] uppercase tracking-wider hover:underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#221D1A]">
                      Request a Custom Quote
                    </h3>
                    <p className="text-xs text-[#73675E] mt-0.5">
                      Tell us about your event and our concierge will provide detailed mockups and volume tiered rates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Deepak Verma"
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="deepak@example.com"
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Occasion *
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      >
                        <option value="Wedding / Reception Favours">Wedding / Reception Favours</option>
                        <option value="Diwali / Festive Corporate Hamper">Diwali / Festive Corporate Hamper</option>
                        <option value="Birthday / Milestone Celebration">Birthday / Milestone Celebration</option>
                        <option value="Anniversary Keepsake">Anniversary Keepsake</option>
                        <option value="Baby Shower / Welcome Baby">Baby Shower / Welcome Baby</option>
                        <option value="Corporate Event / Gifting">Corporate Event / Gifting</option>
                        <option value="Other Bespoke Celebration">Other Bespoke Celebration</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Approximate Quantity *
                      </label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      >
                        <option value="20–50 pieces">20–50 pieces (Small Gathering)</option>
                        <option value="50–100 pieces">50–100 pieces (Intimate Wedding / Parties)</option>
                        <option value="100–250 pieces">100–250 pieces (Standard Wedding / Corporate)</option>
                        <option value="250–500 pieces">250–500 pieces (Large Celebration)</option>
                        <option value="500+ pieces">500+ pieces (Grand Gala / Corporate Suite)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Required Delivery Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={requiredDate}
                        onChange={(e) => setRequiredDate(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                      Preferred Scent / Candle Style
                    </label>
                    <select
                      value={preferredProduct}
                      onChange={(e) => setPreferredProduct(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.scentNotes.family})
                        </option>
                      ))}
                      <option value="Curated Assortment of Multiple Scents">
                        Curated Assortment of Multiple Scents
                      </option>
                      <option value="Custom Bespoke Fragrance Formulation">
                        Custom Bespoke Fragrance Formulation
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                      Customization Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={customizationRequirements}
                      onChange={(e) => setCustomizationRequirements(e.target.value)}
                      placeholder="e.g. Gold foil couple names &amp; date, custom burgundy silk ribbon, corporate logo card..."
                      className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                      Additional Message / Destination City
                    </label>
                    <textarea
                      rows={2}
                      value={additionalMessage}
                      onChange={(e) => setAdditionalMessage(e.target.value)}
                      placeholder="Destination city in India, budget expectations, or specific packaging requests."
                      className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B46036] hover:bg-[#9E502B] text-white py-3.5 rounded-md font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#73675E]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#75836C]" />
                    <span>No obligation quote • Volume discounts start at 20 units</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
