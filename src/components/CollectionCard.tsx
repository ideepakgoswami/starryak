"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Collection } from "@/types";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative flex flex-col rounded-lg overflow-hidden bg-white border border-[#E6DED3] transition-all duration-300 hover:shadow-xl hover:border-[#D5C8B8]"
    >
      {/* Image container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F3ECE2]">
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Floating Tag */}
        <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#221D1A] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#B46036]" />
          <span>Occasion Suite</span>
        </div>

        {/* Floating title on image bottom */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight drop-shadow-xs">
            {collection.title}
          </h3>
          <p className="text-xs text-white/80 drop-shadow-xs line-clamp-1">
            {collection.subtitle}
          </p>
        </div>
      </div>

      {/* Description & Action */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <p className="text-xs text-[#73675E] line-clamp-2 leading-relaxed">
          {collection.description}
        </p>

        <div className="pt-3 mt-3 border-t border-[#F3ECE2] flex items-center justify-between text-xs font-medium text-[#B46036] group-hover:text-[#9E502B]">
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
