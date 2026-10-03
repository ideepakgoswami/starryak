import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Heart,
  Gift,
  Shield,
  Phone,
  CheckCircle,
} from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { candleCategories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import CollectionCard from "@/components/CollectionCard";
import ReviewSection from "@/components/ReviewSection";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestsellerProducts = products.filter((p) => p.bestseller).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 bg-linear-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F3ECE2]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#F3ECE2] text-[#221D1A] px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#E6DED3]">
                <Sparkles className="w-3.5 h-3.5 text-[#B46036]" />
                <span className="tracking-wide">Small-Batch Indian Atelier</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221D1A] font-medium leading-[1.15] tracking-tight">
                Light up the moments that matter.
              </h1>

              <p className="text-base sm:text-lg text-[#73675E] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Hand-poured scented candles crafted to make everyday spaces feel a little more special.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto bg-[#221D1A] hover:bg-[#3D332B] text-white px-7 py-3.5 rounded-md font-medium text-xs uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg text-center"
                >
                  Shop Candles
                </Link>

                <Link
                  href="/personalized"
                  className="w-full sm:w-auto bg-white hover:bg-[#FAF7F2] text-[#221D1A] border border-[#E6DED3] hover:border-[#B46036] px-7 py-3.5 rounded-md font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B46036]" />
                  <span>Explore Personalized</span>
                </Link>
              </div>

              {/* Social trust badge */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#73675E]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#75836C]" />
                  <span>Plant soy wax blend</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#75836C]" />
                  <span>Pan-India transit care</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 sm:aspect-5/4 rounded-2xl overflow-hidden shadow-2xl border border-[#E6DED3] bg-[#F3ECE2]">
                <Image
                  src="/images/hero_candle.jpg"
                  alt="Starry AK Artisanal Amber Candle with glowing flame"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10" />

                {/* Floating Product Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E6DED3] shadow-lg flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0 bg-[#F3ECE2]">
                    <Image
                      src="/images/vanilla_amber.jpg"
                      alt="Vanilla Amber Petite"
                      fill
                      sizes="50px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#B46036] font-semibold block">
                      Signature Pour
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#221D1A] truncate">
                      Jar 1 - Amber Glass
                    </h4>
                    <span className="text-xs font-bold text-[#221D1A]">₹699</span>
                  </div>
                  <Link
                    href="/product/jar-1"
                    className="p-2 rounded-full bg-[#FAF7F2] hover:bg-[#B46036] hover:text-white text-[#221D1A] transition-colors"
                    aria-label="View Jar 1"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Candle Type (4 Types: Jar, Pillar, Beeswax, Cafe) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atelier Formats</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
              Shop by Candle Type
            </h2>
            <p className="text-xs sm:text-sm text-[#73675E] mt-1">
              Select from classic jars, architectural pillars, pure beeswax, and realistic café pours.
            </p>
          </div>
          <Link
            href="/shop"
            className="mt-3 md:mt-0 text-xs font-semibold text-[#B46036] hover:text-[#9E502B] uppercase tracking-wider flex items-center gap-1.5 group"
          >
            <span>Browse All Catalogue ({products.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {candleCategories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/shop?type=${cat.id}`}
                className="group relative bg-white rounded-xl border border-[#E6DED3] p-4 flex flex-col justify-between hover:shadow-md hover:border-[#B46036]/50 transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DED3] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#221D1A] group-hover:text-[#B46036] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#73675E] line-clamp-2 mt-1 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#F3ECE2] flex items-center justify-between text-[11px] font-medium text-[#B46036]">
                  <span>{count} Pours</span>
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
              Featured Candles
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-3 md:mt-0 text-xs font-semibold text-[#B46036] hover:text-[#9E502B] uppercase tracking-wider flex items-center gap-1.5 group"
          >
            <span>View All Candles ({products.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-2">
            Moments Worth Remembering
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-[#73675E] mt-2">
            Every festival and personal milestone carries its own distinct aroma. Explore our occasion-tailored collections.
          </p>
        </div>

        {/* Curated Gift Boxes Feature Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {collections.slice(0, 2).map((col) => (
            <CollectionCard key={col.slug} collection={col} />
          ))}
        </div>

        {/* Seasonal & Milestone Collections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.slice(2, 5).map((col) => (
            <CollectionCard key={col.slug} collection={col} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {collections.slice(5).map((col) => (
            <CollectionCard key={col.slug} collection={col} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop?sort=bestseller"
            className="mt-3 md:mt-0 text-xs font-semibold text-[#B46036] hover:text-[#9E502B] uppercase tracking-wider flex items-center gap-1.5 group"
          >
            <span>Explore Most Loved</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellerProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#F3ECE2]/60 py-16 sm:py-20 border-y border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-2">
              Our Commitment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
              Why Choose Starry AK
            </h2>
            <p className="text-xs sm:text-sm text-[#73675E] mt-2">
              Every detail is considered—from selecting fine fragrances to pouring each jar by hand in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg border border-[#E6DED3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6DED3] flex items-center justify-center text-[#B46036]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                Hand-Poured
              </h3>
              <p className="text-xs text-[#73675E] leading-relaxed">
                Poured in intimate small batches using clean-burning soy and coconut wax blends for an even, gentle melt pool.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E6DED3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6DED3] flex items-center justify-center text-[#B46036]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                Thoughtfully Scented
              </h3>
              <p className="text-xs text-[#73675E] leading-relaxed">
                Carefully composed olfactory pyramids with balanced top, heart, and base notes that diffuse smoothly without overwhelming.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E6DED3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6DED3] flex items-center justify-center text-[#B46036]">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                Gift-Ready
              </h3>
              <p className="text-xs text-[#73675E] leading-relaxed">
                Arrives housed in a rigid kraft presentation box, tied with ribbon and an embossed note card ready to present.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E6DED3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6DED3] flex items-center justify-center text-[#B46036]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#221D1A]">
                Made with Care
              </h3>
              <p className="text-xs text-[#73675E] leading-relaxed">
                Lead-free pure cotton wicks, reusable containers, and shock-tested domestic packing across all Indian pin codes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Candles Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E6DED3] p-8 sm:p-12 shadow-md overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Box on Left */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-[#E6DED3] shadow-lg">
                <Image
                  src="/images/personalized_gift.jpg"
                  alt="Custom Personalized Gift Candle with gold foil label and ribbon box"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content on Right */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E6DED3]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Hand-Foiled Keepsakes</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#221D1A] font-medium leading-tight">
                Create something truly personal.
              </h2>

              <p className="text-sm sm:text-base text-[#73675E] leading-relaxed">
                Add a recipient&apos;s name, meaningful date, or heartfelt blessing printed directly on our gold-accented artisan labels. Custom candles crafted for:
              </p>

              {/* Use cases pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#221D1A]">
                <div className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded border border-[#E6DED3]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B46036] shrink-0" />
                  <span>Birthdays</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded border border-[#E6DED3]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B46036] shrink-0" />
                  <span>Weddings</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded border border-[#E6DED3]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B46036] shrink-0" />
                  <span>Anniversaries</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded border border-[#E6DED3]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B46036] shrink-0" />
                  <span>Return Gifts</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded border border-[#E6DED3]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B46036] shrink-0" />
                  <span>Corporate Hampers</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded border border-[#E6DED3]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B46036] shrink-0" />
                  <span>Festive Gifting</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/personalized"
                  className="bg-[#B46036] hover:bg-[#9E502B] text-white px-6 py-3 rounded-md font-medium text-xs uppercase tracking-widest transition-colors text-center shadow-xs"
                >
                  Create Something Personal
                </Link>
                <Link
                  href="/custom-orders"
                  className="bg-transparent hover:bg-[#FAF7F2] text-[#221D1A] border border-[#E6DED3] px-6 py-3 rounded-md font-medium text-xs uppercase tracking-widest transition-colors text-center"
                >
                  Bulk / Event Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story (Editorial Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block">
              The Art of Slow Living
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A] leading-tight">
              Crafted slowly, for moments that linger.
            </h2>
            <p className="text-sm text-[#73675E] leading-relaxed">
              Starry AK was started in India with a simple belief: fragrance has the extraordinary power to pause time. In busy cities and hurried routines, the act of striking a match and illuminating a scent creates an instant oasis of calm.
            </p>
            <p className="text-sm text-[#73675E] leading-relaxed">
              We never rush production. Every vessel is hand-wicked, weighed, and carefully poured in small batches. We pair timeless Indian olfactory traditions—like Mysore sandalwood, Kashmiri saffron, and coastal mogra—with modern, understated Scandinavian aesthetic sensibilities.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="text-xs font-semibold uppercase tracking-wider text-[#221D1A] hover:text-[#B46036] underline underline-offset-4 transition-colors"
              >
                Read our full studio story &rarr;
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-[#E6DED3] shadow-lg">
              <Image
                src="/images/brand_craft.jpg"
                alt="Artisan pouring molten soy wax into ceramic candle jars"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews (Sample Prototype Testimonials) */}
      <ReviewSection />

      {/* Instagram / Social Grid Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest text-[#73675E] font-medium block mb-1">
            Follow Our Fragrance Journey
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#221D1A] font-medium flex items-center justify-center gap-2">
            <InstagramIcon className="w-5 h-5 text-[#B46036]" />
            <span>@starryak.in</span>
          </h2>
          <p className="text-xs text-[#73675E] mt-1">
            Tag us in your candlelit evenings to be featured in our quiet living stories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#E6DED3] group">
            <Image
              src="/images/vanilla_amber.jpg"
              alt="Social candle aesthetic 1"
              fill
              sizes="25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <InstagramIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#E6DED3] group">
            <Image
              src="/images/festive_glow.jpg"
              alt="Social candle aesthetic 2"
              fill
              sizes="25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <InstagramIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#E6DED3] group">
            <Image
              src="/images/sandalwood_glow.jpg"
              alt="Social candle aesthetic 3"
              fill
              sizes="25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <InstagramIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#E6DED3] group">
            <Image
              src="/images/rose_oud.jpg"
              alt="Social candle aesthetic 4"
              fill
              sizes="25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <InstagramIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp / Concierge CTA (Non-intrusive) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#E6DED3] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#221D1A]">
              Need fragrance advice or custom gifting assistance?
            </h3>
            <p className="text-xs text-[#73675E]">
              Chat directly with our candle artisan on WhatsApp for recommendations or bulk event queries.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2B241F] hover:bg-[#3D332B] text-white px-5 py-3 rounded-md text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 shadow-xs"
          >
            <Phone className="w-4 h-4 text-[#C29D57]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
