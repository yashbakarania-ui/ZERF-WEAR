"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/storefront/ProductCard";
import { CATEGORIES, DEMO_PRODUCTS } from "@/lib/demo-data";
import { ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const products = DEMO_PRODUCTS.filter((p) => p.category.slug === category.slug);

  return (
    <div className="w-full bg-brand-black min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-brand-grey uppercase">
          <Link href="/shop" className="hover:text-brand-lime flex items-center gap-1 transition-colors">
            <ArrowLeft size={14} />
            <span>Catalogue</span>
          </Link>
          <span>/</span>
          <span className="text-brand-lime">{category.name}</span>
        </div>

        {/* Category Editorial Hero Banner */}
        <div className="relative border border-border-subtle bg-brand-card p-8 md:p-14 overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
              [ CATEGORY ARCHIVE ]
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-offwhite font-display">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-light">
              {category.description}
            </p>
            <div className="text-xs font-mono text-brand-grey pt-2">
              SHOWING <strong className="text-brand-offwhite">{products.length}</strong> CURATED PIECES
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="p-16 bg-brand-card/30 border border-border-subtle text-center space-y-4">
            <p className="text-sm text-brand-muted">
              New seasonal cuts are currently in dyeing and production.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-brand-offwhite text-brand-black text-xs font-mono uppercase font-bold hover:bg-brand-lime transition-colors"
            >
              Browse Full Catalogue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

