"use client";

import React from "react";
import Link from "next/link";
import { Building2, Briefcase, Award, ArrowUpRight } from "lucide-react";

export default function CorporateSpotlight() {
  return (
    <section className="w-full bg-brand-black border-b border-border-subtle py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-border-subtle bg-gradient-to-br from-[#161616] via-[#121212] to-[#0A0A0A] p-8 md:p-14 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-lime" />
              <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
                B2B & ENTERPRISE PROCUREMENT
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-offwhite font-display leading-[0.95]">
              EQUIP YOUR TEAM WITH APPAREL THEY WILL ACTUALLY WEAR OUTSIDE.
            </h2>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-light">
              Stop settling for scratchy polyester corporate shirts that end up forgotten in drawers. ZARF Wear manufactures luxury corporate merchandise for high-growth tech companies, design agencies, university festivals, and national events across India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-border-subtle text-xs font-mono">
              <div>
                <span className="text-brand-grey block text-[10px] uppercase">GST Compliant</span>
                <span className="text-brand-offwhite font-bold">100% Tax Invoices Provided</span>
              </div>
              <div>
                <span className="text-brand-grey block text-[10px] uppercase">Volume Discounts</span>
                <span className="text-brand-offwhite font-bold">Tiers from 25 to 5,000+ Units</span>
              </div>
              <div>
                <span className="text-brand-grey block text-[10px] uppercase">Corporate Sample Kits</span>
                <span className="text-brand-offwhite font-bold">Dispatched Within 48 Hours</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/b2b"
                className="px-8 py-4 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <span>Request B2B Corporate Quote</span>
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/contact"
                className="px-6 py-4 border border-border-subtle hover:border-brand-offwhite text-brand-offwhite text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center"
              >
                Schedule Fabric Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

