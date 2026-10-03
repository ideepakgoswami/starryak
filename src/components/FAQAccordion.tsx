"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export default function FAQAccordion({
  items,
  defaultOpenIndex = 0,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-[#E6DED3] rounded-lg bg-white overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors focus:outline-hidden"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-base sm:text-lg font-medium text-[#221D1A]">
                {item.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#73675E] transition-transform duration-300 shrink-0 ${
                  isOpen ? "rotate-180 text-[#B46036]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#73675E] leading-relaxed border-t border-[#F3ECE2] animate-fade-in">
                <p>{item.answer}</p>
                {item.category && (
                  <span className="inline-block mt-3 text-[10px] uppercase tracking-wider text-[#B46036] font-semibold bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E6DED3]">
                    {item.category}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
