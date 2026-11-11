"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/demo-data";

export default function CollectionsGrid() {
  return (
    <section className="w-full bg-brand-black border-b border-border-subtle py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-brand-lime block mb-2">
              [ 02 // CATEGORIES ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-offwhite font-display">
              CURATED COLLECTIONS
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-wider text-brand-muted hover:text-brand-lime flex items-center gap-1 transition-colors"
          >
            <span>Explore All Pieces</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative h-96 bg-brand-card overflow-hidden border border-border-subtle block"
            >
              {/* Background Image with hover zoom */}
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent group-hover:via-brand-black/20 transition-all duration-500" />

              {/* Category Info Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono tracking-widest text-brand-lime bg-brand-black/80 px-2 py-0.5 border border-border-subtle">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-black/80 border border-border-subtle flex items-center justify-center text-brand-offwhite group-hover:text-brand-lime group-hover:border-brand-lime transition-colors">
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-brand-offwhite group-hover:text-brand-lime transition-colors font-display">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 font-light">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

