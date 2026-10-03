"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, HelpCircle, MessageSquare } from "lucide-react";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const allFaqs: (FAQItem & { categoryKey: string })[] = [
    // Shipping
    {
      categoryKey: "shipping",
      category: "Shipping & Delivery",
      question: "Do you ship across all pin codes in India?",
      answer:
        "Yes, we ship nationwide across India through our verified express courier partners (Blue Dart, Delhivery, and DTDC). Orders are delivered to over 27,000+ Indian postal codes.",
    },
    {
      categoryKey: "shipping",
      category: "Shipping & Delivery",
      question: "What are the shipping charges and delivery timelines?",
      answer:
        "We offer complimentary Free Shipping across India on all orders of ₹999 and above. For orders below ₹999, a flat standard delivery fee of ₹99 applies. Metro cities typically arrive in 2–3 business days; other locations take 4–6 business days.",
    },
    {
      categoryKey: "shipping",
      category: "Shipping & Delivery",
      question: "How do you protect glass and terracotta candles during transit?",
      answer:
        "Every candle is wrapped in biodegradable honeycomb eco-cushioning and nestled inside corrugated reinforced outer boxes. In the rare event of transit damage, simply send a photo on WhatsApp within 48 hours and we immediately dispatch a fresh replacement at no extra charge.",
    },

    // Candle Care
    {
      categoryKey: "care",
      category: "Candle Care & Safety",
      question: "Why is the first burn so important?",
      answer:
        "Soy wax has a 'memory'. On your initial burn, let the candle burn for 2 to 3 consecutive hours until the melted wax pool reaches the entire perimeter of the jar. This prevents 'tunneling' and ensures you get the full stated burn time from your candle.",
    },
    {
      categoryKey: "care",
      category: "Candle Care & Safety",
      question: "How should I trim the wick?",
      answer:
        "Always trim the cotton wick to 1/4 inch (about 5mm) before relighting. This keeps the flame steady, prevents black smoke, and extends the overall life of the candle.",
    },
    {
      categoryKey: "care",
      category: "Candle Care & Safety",
      question: "Can I repurpose the candle jars?",
      answer:
        "Absolutely! Once 1/4 inch of wax remains, gently scrape it out or wash with warm soapy water. Our terracotta cups make charming plant pots, while our amber apothecary glass and ceramic containers are ideal for holding brushes, pens, or bedside trinkets.",
    },

    // Personalization & Gifting
    {
      categoryKey: "custom",
      category: "Personalization & Bulk",
      question: "How does candle personalization work?",
      answer:
        "On customizable candle pages, toggle the 'Make it Personal' option. You can enter the recipient's name, choose an occasion, and include a heartfelt short note. We print your custom text in metallic gold foil directly onto our artisan label before packing.",
    },
    {
      categoryKey: "custom",
      category: "Personalization & Bulk",
      question: "Do you offer bulk discounts for weddings or corporate hampers?",
      answer:
        "Yes! We offer tiered volume discounts starting at 20 units for weddings, anniversaries, Diwali corporate gifting, and baby showers. Visit our 'Bulk / Events' page or contact our WhatsApp concierge to request a tailored quote.",
    },

    // Ingredients
    {
      categoryKey: "ingredients",
      category: "Ingredients & Craft",
      question: "What kind of wax do you use?",
      answer:
        "We use a 100% plant-based soy and coconut wax formulation. Unlike paraffin wax derived from petroleum, plant soy wax burns at a cooler temperature, produces cleaner combustion, and holds nuanced fragrance oils gracefully.",
    },
    {
      categoryKey: "ingredients",
      category: "Ingredients & Craft",
      question: "Are your fragrance oils safe and IFRA compliant?",
      answer:
        "Yes. All of our fine fragrance oils are certified compliant with the International Fragrance Association (IFRA) standards. They are free from parabens, phthalates, and animal testing.",
    },
  ];

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "shipping", label: "Shipping in India" },
    { id: "care", label: "Candle Care" },
    { id: "custom", label: "Personalization & Bulk" },
    { id: "ingredients", label: "Ingredients & Wax" },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? allFaqs
      : allFaqs.filter((f) => f.categoryKey === activeCategory);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="bg-linear-to-b from-[#F3ECE2] to-[#FAF7F2] py-14 sm:py-20 border-b border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold bg-white px-3.5 py-1.5 rounded-full border border-[#E6DED3] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center &amp; Guides</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#221D1A] font-medium tracking-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-base text-[#73675E] mt-3">
            Find quick answers regarding our artisanal pours, transit safety across India, and candle care rituals.
          </p>
        </div>
      </section>

      {/* Categories Filter Tabs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap focus:outline-hidden ${
                activeCategory === c.id
                  ? "bg-[#221D1A] text-white shadow-xs"
                  : "bg-white text-[#73675E] hover:text-[#221D1A] border border-[#E6DED3]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <FAQAccordion items={filteredFaqs} defaultOpenIndex={0} />

        {/* Still Have Questions Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-white border border-[#E6DED3] text-center space-y-3 max-w-2xl mx-auto shadow-xs">
          <h3 className="font-serif text-xl font-medium text-[#221D1A]">
            Have a question that isn&apos;t answered here?
          </h3>
          <p className="text-xs text-[#73675E]">
            Our concierge team is always glad to assist you via WhatsApp or email.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#221D1A] hover:bg-[#3D332B] text-white px-5 py-2.5 rounded text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C29D57]" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[#221D1A] border border-[#E6DED3] px-5 py-2.5 rounded text-xs font-medium uppercase tracking-wider transition-colors"
            >
              Send an Email
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
