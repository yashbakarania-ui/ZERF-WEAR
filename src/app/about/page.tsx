"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Factory, Sparkles, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-brand-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-border-subtle pb-10 space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ ARCHITECTURE & PROVENANCE ]
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-brand-offwhite font-display leading-[0.92]">
            TEXTILE INTEGRITY.<br />
            ZERO APOLOGIES.
          </h1>
          <p className="text-base sm:text-lg text-brand-muted max-w-3xl font-light leading-relaxed">
            ZARF Wear was founded to counter the disposable, paper-thin garments that flood modern fashion. We build heavyweight apparel with architectural presence, crafted from the soil of India for a global vanguard.
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-brand-offwhite font-display">
              THE 280 GSM STANDARD
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed font-light">
              Most commercial t-shirts in the Indian market use 160 to 180 GSM cotton carded from short-staple fibers. After three washes, the ribbing stretches, the side seams twist, and the garment turns into loungewear.
            </p>
            <p className="text-sm text-brand-muted leading-relaxed font-light">
              At ZARF, our entry-level blank begins at <strong>240 GSM</strong>, moving up to <strong>280 GSM French Terry</strong> and <strong>420 GSM brushed winter fleece</strong>. We source exclusively from certified mills in Tamil Nadu and Gujarat, using combed compact yarns that have been bio-washed and pre-shrunk before cutting.
            </p>
            <div className="p-4 bg-brand-card border-l-2 border-brand-lime space-y-1">
              <span className="text-xs font-mono text-brand-lime uppercase font-bold">
                Double-Needle Collar Ribbing
              </span>
              <p className="text-xs text-brand-muted">
                Engineered with 3% spandex blend in the neckline to permanently eliminate collar baconing.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/5] bg-brand-card border border-border-subtle overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85"
              alt="ZARF Studio Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Four Manufacturing Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-border-subtle">
          <div className="p-8 bg-brand-card/40 border border-border-subtle space-y-4">
            <Factory className="text-brand-lime" size={28} />
            <h3 className="text-lg font-bold uppercase text-brand-offwhite font-display">
              Domestic Manufacturing
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              Every garment is knit, dyed, cut, and stitched in India. We maintain full transparency across the supply chain, ensuring ethical working conditions and living wages.
            </p>
          </div>

          <div className="p-8 bg-brand-card/40 border border-border-subtle space-y-4">
            <Sparkles className="text-brand-lime" size={28} />
            <h3 className="text-lg font-bold uppercase text-brand-offwhite font-display">
              Bespoke Custom Mastery
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              From tactile high-density puff inks to tonal Japanese embroidery, our custom atelier offers commercial brands and community collectives couture-level finishing.
            </p>
          </div>

          <div className="p-8 bg-brand-card/40 border border-border-subtle space-y-4">
            <ShieldCheck className="text-brand-lime" size={28} />
            <h3 className="text-lg font-bold uppercase text-brand-offwhite font-display">
              Zero Fake Claims
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              We never fabricate customer reviews, fake sales counters, or fake stock timers. What you see is genuine textile engineering and transparent commercial communication.
            </p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="border border-border-subtle bg-brand-card p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold uppercase text-brand-offwhite font-display">
              READY TO FEEL THE FABRIC IN HAND?
            </h3>
            <p className="text-xs text-brand-muted mt-1">
              Explore our core silhouettes or request custom printing samples for your project.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/shop"
              className="px-6 py-3.5 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-wider transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              href="/custom-apparel"
              className="px-6 py-3.5 border border-border-subtle hover:border-brand-lime text-brand-offwhite hover:text-brand-lime text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Custom Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

