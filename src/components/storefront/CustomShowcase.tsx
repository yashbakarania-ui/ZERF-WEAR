"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Layers, Flame, Scissors, CheckCircle2 } from "lucide-react";

const TECHNIQUES = [
  {
    icon: Flame,
    title: "High-Density Puff Print",
    desc: "Tactile, 3D raised printing that gives brand typography and logos an architectural emboss.",
    moq: "Min. 10 pcs",
  },
  {
    icon: Layers,
    title: "Precision Screen Printing",
    desc: "Discharge and water-based inks that penetrate deep into the fibers with zero heavy plastic hand-feel.",
    moq: "Min. 25 pcs",
  },
  {
    icon: Scissors,
    title: "Tonal & 3D Embroidery",
    desc: "High-thread-count Japanese Madeira embroidery for executive collars, left chests, and caps.",
    moq: "Min. 10 pcs",
  },
  {
    icon: Sparkles,
    title: "Direct-to-Garment (DTG)",
    desc: "Full-color photo-realistic raster artwork reproduction with crisp color accuracy and gradient blending.",
    moq: "Min. 5 pcs",
  },
];

export default function CustomShowcase() {
  return (
    <section className="w-full bg-[#141414] border-b border-border-subtle py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vision & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-brand-lime block">
                [ 04 // BESPOKE SERVICES ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-offwhite font-display">
                CUSTOM APPAREL PRINTING & MANUFACTURING
              </h2>
            </div>

            <p className="text-sm text-brand-muted leading-relaxed font-light">
              Elevate beyond flimsy promotional merch. We print your designs on ZARF’s proprietary 240–420 GSM heavyweight blanks, guaranteeing that every piece your team or community wears looks and feels like high-end designer streetwear.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-brand-offwhite">
                <CheckCircle2 size={16} className="text-brand-lime" />
                <span>Sample swatches dispatched before full production runs</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-offwhite">
                <CheckCircle2 size={16} className="text-brand-lime" />
                <span>Pantone shade matching for exact brand palette compliance</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-offwhite">
                <CheckCircle2 size={16} className="text-brand-lime" />
                <span>Direct WhatsApp concierge for real-time quotation & mockups</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/custom-apparel"
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-lime text-brand-black hover:bg-brand-limeHover text-xs font-black uppercase tracking-widest transition-colors shadow-lg"
              >
                <span>Launch Custom Enquiry Wizard</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Techniques Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECHNIQUES.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.title}
                  className="p-6 bg-brand-card/70 border border-border-subtle hover:border-brand-lime/40 transition-all duration-300 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-none bg-brand-black flex items-center justify-center text-brand-lime border border-border-subtle">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-brand-lime border border-brand-lime/30 px-2 py-0.5">
                      {tech.moq}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
                      {tech.title}
                    </h3>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

