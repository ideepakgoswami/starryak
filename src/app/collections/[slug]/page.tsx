import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const collection = collections.find((c) => c.slug === resolvedParams.slug);

  if (!collection) {
    notFound();
  }

  // Filter products belonging to this collection
  const collectionProducts = products.filter((p) =>
    p.collections.includes(collection.slug)
  );

  const otherCollections = collections.filter((c) => c.slug !== collection.slug);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Collection Banner */}
      <section className="relative overflow-hidden bg-[#221D1A] text-white">
        <div className="absolute inset-0">
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1F1B18] via-[#1F1B18]/70 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center max-w-3xl">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#C5BCB3] flex items-center justify-center gap-1.5 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white">
              Collections
            </Link>
            <span>/</span>
            <span className="text-[#C29D57]">{collection.title}</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C29D57] font-semibold bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal &amp; Occasion Suite</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            {collection.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#E6DED3] mt-2 italic">
            {collection.subtitle}
          </p>

          <p className="text-sm sm:text-base text-[#C5BCB3] mt-4 leading-relaxed max-w-2xl mx-auto">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Collection Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E6DED3]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#221D1A]">
              Candles in this Collection ({collectionProducts.length})
            </h2>
            <p className="text-xs text-[#73675E] mt-0.5">
              Thoughtfully poured to suit {collection.title.toLowerCase()} rituals and gifting.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-[#B46036] hover:underline uppercase tracking-wider hidden sm:block"
          >
            View All Scents &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collectionProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Explore Other Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E6DED3]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold block mb-1">
            Discover More
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#221D1A]">
            Explore Other Occasions
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherCollections.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group p-4 bg-white rounded-lg border border-[#E6DED3] hover:border-[#B46036] transition-all flex items-center justify-between shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-base font-semibold text-[#221D1A] group-hover:text-[#B46036] transition-colors">
                  {c.title}
                </h4>
                <p className="text-[11px] text-[#73675E] truncate">{c.subtitle}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#73675E] group-hover:translate-x-1 group-hover:text-[#B46036] transition-all" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
