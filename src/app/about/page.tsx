import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Flame, Heart, Shield, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Header */}
      <section className="bg-linear-to-b from-[#F3ECE2] to-[#FAF7F2] py-14 sm:py-20 border-b border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold bg-white px-3.5 py-1.5 rounded-full border border-[#E6DED3] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Philosophy &amp; Craft</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221D1A] font-medium tracking-tight">
            Hand-poured candles for moments worth remembering.
          </h1>

          <p className="text-base sm:text-lg text-[#73675E] mt-4 leading-relaxed">
            Starry AK is an independent candle studio born in India. We believe scent is an intimate art form—one that grounds our busy modern days into gentle, restorative pauses.
          </p>
        </div>
      </section>

      {/* Origin Story & Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#E6DED3] shadow-lg bg-[#F3ECE2]">
              <Image
                src="/images/brand_craft.jpg"
                alt="Artisan studio pouring soy wax"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block">
              The Beginning
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A] leading-tight">
              Rooted in Indian Heritage, Designed for Contemporary Living
            </h2>
            <p className="text-sm text-[#73675E] leading-relaxed">
              Growing up in India, fragrance was always woven into the rhythm of daily life—the earthy aroma of wet red clay after the first monsoon rains, fresh jasmine (mogra) woven into hair, the calming incense of morning pujas, and the festive warmth of saffron and cardamom during Diwali.
            </p>
            <p className="text-sm text-[#73675E] leading-relaxed">
              Too many commercial candles in the market were either overwhelmingly synthetic or generic imports that had no connection to our regional memories. Starry AK was established to marry fine global perfumery with authentic Indian botanicals and artisanal craft.
            </p>
          </div>
        </div>
      </section>

      {/* Craft Principles */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-1">
              Transparent Craftsmanship
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#221D1A]">
              How Every Jar is Poured
            </h2>
            <p className="text-xs sm:text-sm text-[#73675E] mt-1">
              Honest ingredients, mindful testing, and meticulous attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-[#FAF7F2] border border-[#E6DED3] space-y-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#B46036] border border-[#E6DED3] flex items-center justify-center font-bold font-serif">
                1
              </div>
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                Plant-Based Wax Blend
              </h3>
              <p className="text-xs text-[#73675E] leading-relaxed">
                We use a custom blend of natural soy and coconut wax that melts cleanly at lower temperatures, ensuring a smooth surface and longer, even burn times without petroleum-based paraffin.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#FAF7F2] border border-[#E6DED3] space-y-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#B46036] border border-[#E6DED3] flex items-center justify-center font-bold font-serif">
                2
              </div>
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                IFRA-Compliant Fragrances
              </h3>
              <p className="text-xs text-[#73675E] leading-relaxed">
                Our fragrance oils are carefully blended with natural essential extracts adhering strictly to the International Fragrance Association (IFRA) safety standards, free from parabens and phthalates.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#FAF7F2] border border-[#E6DED3] space-y-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#B46036] border border-[#E6DED3] flex items-center justify-center font-bold font-serif">
                3
              </div>
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                Heirloom Reusable Vessels
              </h3>
              <p className="text-xs text-[#73675E] leading-relaxed">
                From hand-thrown Indian terracotta pots and hand-hammered brass urlis to apothecary amber glass, our vessels are designed to be thoroughly repurposed for jewelry, planters, or puja accents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
          Ready to bring warmth into your space?
        </h2>
        <p className="text-xs sm:text-sm text-[#73675E] max-w-xl mx-auto">
          Explore our collection of small-batch candle pours or create a personalized keepsake for someone special.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/shop"
            className="bg-[#221D1A] hover:bg-[#3D332B] text-white px-7 py-3 rounded-md text-xs font-medium uppercase tracking-widest transition-colors"
          >
            Explore All Candles
          </Link>
          <Link
            href="/personalized"
            className="bg-[#B46036] hover:bg-[#9E502B] text-white px-7 py-3 rounded-md text-xs font-medium uppercase tracking-widest transition-colors"
          >
            Create Personalized Candle
          </Link>
        </div>
      </section>
    </div>
  );
}
