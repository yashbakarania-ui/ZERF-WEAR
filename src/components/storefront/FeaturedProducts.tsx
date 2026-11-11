"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

export default function FeaturedProducts() {
  const featured = DEMO_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="w-full bg-brand-black border-b border-border-subtle py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-brand-lime block mb-2">
              [ 03 // FEATURED SILHOUETTES ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-offwhite font-display">
              CORE BLANKS & STATEMENT CUTS
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-wider text-brand-muted hover:text-brand-lime flex items-center gap-1 transition-colors"
          >
            <span>View Full Catalogue ({DEMO_PRODUCTS.length})</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

