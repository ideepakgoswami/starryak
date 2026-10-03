"use client";

import React from "react";
import { Star, CheckCircle2, Quote, Sparkles } from "lucide-react";
import { sampleReviews } from "@/data/products";

export default function ReviewSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F3ECE2]/50 border-y border-[#E6DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
            Stories of Warmth &amp; Memory
          </h2>
          <p className="text-xs sm:text-sm text-[#73675E] mt-2">
            Read how our hand-poured scents have transformed bedrooms, dining tables, and milestone celebrations across India.
          </p>
          <div className="mt-3 inline-block bg-[#FAF7F2] border border-[#E6DED3] text-[10px] text-[#8E8379] px-3 py-1 rounded-full uppercase tracking-wider">
            Sample Prototype Testimonials
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-lg border border-[#E6DED3] shadow-xs flex flex-col justify-between relative group hover:border-[#D5C8B8] transition-all"
            >
              <div>
                <Quote className="w-8 h-8 text-[#E6DED3] group-hover:text-[#C29D57]/40 transition-colors mb-3" />

                {/* Stars */}
                <div className="flex items-center gap-1 text-[#C29D57] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <h3 className="font-serif text-base font-semibold text-[#221D1A] mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                <p className="text-xs text-[#73675E] leading-relaxed italic">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F3ECE2]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#221D1A]">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span title="Verified Purchaser">
                          <CheckCircle2 className="w-3 h-3 text-[#75836C]" />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#8E8379] block">
                      {rev.location}
                    </span>
                  </div>

                  {rev.occasion && (
                    <span className="text-[10px] font-medium bg-[#FAF7F2] text-[#B46036] border border-[#E6DED3] px-2 py-0.5 rounded-full">
                      {rev.occasion}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
