"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandStatement() {
  return (
    <section className="w-full bg-[#141414] border-b border-border-subtle py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Index */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
              [ 01 // MANIFESTO ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
              NO FAST FASHION.<br />
              NO FLIMSY FABRICS.
            </h2>
            <div className="w-12 h-0.5 bg-brand-lime" />
          </div>

          {/* Right Statement Body */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-base sm:text-lg text-brand-offwhite leading-relaxed font-light">
              We started ZARF Wear with an unapologetic standard: apparel must feel substantial in hand, drape with architectural intention, and survive hundreds of wash cycles without losing collar shape or seam alignment.
            </p>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Whether you are buying a single oversized 280 GSM blank for personal daily rotation, printing 50 hoodies for your design collective, or ordering 300 corporate polos for a high-growth tech workforce, our Pan-India manufacturing delivers the exact same heavyweight textile precision.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-offwhite hover:text-brand-lime transition-colors group"
              >
                <span>Read our craft philosophy & textile provenance</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

