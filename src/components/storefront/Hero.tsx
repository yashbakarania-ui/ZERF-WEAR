"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-brand-black border-b border-border-subtle"
    >
      {/* Background Editorial Visual Layer */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <Image
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85"
          alt="ZARF Wear Editorial Autumn Winter"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top scale-105 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/40" />
      </div>

      {/* Top Meta Tagline */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex justify-between items-center text-xs font-mono tracking-widest text-brand-grey uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
          <span>{t("hero.eyebrow")}</span>
        </div>
        <div className="hidden sm:block">
          MUMBAI • BENGALURU • DELHI
        </div>
      </div>

      {/* Central Editorial Typographic Statement */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col justify-center">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-brand-offwhite font-display leading-[0.92]">
            CRAFTED FOR THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-offwhite via-brand-offwhite to-brand-lime">
              UNCONVENTIONAL.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-2xl font-normal leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/shop"
              className="group px-8 py-4 bg-brand-offwhite text-brand-black hover:bg-brand-lime transition-all duration-300 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{t("hero.exploreCta")}</span>
              <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </Link>

            <Link
              href="/custom-apparel"
              className="px-8 py-4 bg-transparent hover:bg-brand-card border border-border-subtle hover:border-brand-lime text-brand-offwhite hover:text-brand-lime transition-all duration-300 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-brand-lime" />
              <span>{t("hero.customCta")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Technical Spec Bar */}
      <div className="relative z-10 w-full border-t border-border-subtle/80 bg-brand-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-brand-grey block text-[10px] uppercase">Fabric Standards</span>
            <span className="text-brand-offwhite font-bold">240–420 GSM French Terry</span>
          </div>
          <div>
            <span className="text-brand-grey block text-[10px] uppercase">Custom Techniques</span>
            <span className="text-brand-offwhite font-bold">DTG • Puff • Embroidery</span>
          </div>
          <div>
            <span className="text-brand-grey block text-[10px] uppercase">Turnaround Time</span>
            <span className="text-brand-offwhite font-bold">3–7 Days Pan-India</span>
          </div>
          <div>
            <span className="text-brand-grey block text-[10px] uppercase">Order Process</span>
            <span className="text-brand-lime font-bold">Verified Order Request V1</span>
          </div>
        </div>
      </div>
    </section>
  );
}

