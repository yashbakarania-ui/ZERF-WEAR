"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Layers, Box, Check, ArrowRight, ArrowLeft } from "lucide-react";

export default function StudioTeaserPage() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setJoined(true);
  };

  return (
    <div className="w-full bg-[#0E0E0E] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-brand-grey hover:text-brand-lime transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Storefront</span>
        </Link>

        {/* Hero Section */}
        <div className="border border-border-subtle bg-brand-card/30 p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          {/* Blueprint Grid Lines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-black border border-brand-lime/40 text-brand-lime text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles size={13} className="animate-pulse" />
              <span>COMING SOON // ENGINE V2</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-brand-offwhite font-display leading-[0.92]">
              3D LIVE APPAREL CUSTOMIZATION STUDIO.
            </h1>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-light">
              We are actively developing our interactive WebGL garment customizer. Soon, you will be able to rotate 3D 280 GSM blanks in real-time, drag vector artwork onto front/back prints with pixel precision, toggle puff textures, and preview production-ready renders before ordering.
            </p>

            <div className="p-4 bg-brand-black/80 border-l-2 border-brand-lime text-xs font-mono text-brand-muted space-y-1">
              <span className="text-brand-offwhite font-bold block uppercase">
                Integrity Notice:
              </span>
              <span>
                Rather than deploying an unreliable toy canvas, our engineering team is building a calibrated 3D physics engine. In the interim, please use our verified{" "}
                <Link href="/custom-apparel" className="text-brand-lime underline hover:text-brand-offwhite">
                  Custom Apparel Enquiry Wizard
                </Link>{" "}
                for instant mockups and manual concierge quotes.
              </span>
            </div>

            {/* Waitlist Form */}
            <div className="pt-4 max-w-md">
              {joined ? (
                <div className="p-4 bg-brand-black border border-brand-lime text-brand-lime text-xs font-mono flex items-center gap-2">
                  <Check size={16} />
                  <span>You are on the VIP early beta access list!</span>
                </div>
              ) : (
                <form onSubmit={handleJoinWaitlist} className="space-y-2">
                  <div className="flex border border-border-subtle focus-within:border-brand-lime transition-colors">
                    <input
                      type="email"
                      required
                      placeholder="Enter email for VIP Beta invite..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-brand-black px-4 py-3 text-xs font-mono text-brand-offwhite placeholder:text-brand-grey focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <span>Join Waitlist</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Feature Roadmap Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-3">
            <Box size={24} className="text-brand-lime" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
              360° Real-time Orbit
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              Inspect drop-shoulder drape, ribbed collars, and side gussets with photorealistic material shaders and dynamic lighting.
            </p>
          </div>

          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-3">
            <Layers size={24} className="text-brand-lime" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
              Multi-Layer Artwork Stacking
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              Position separate prints across left chest, oversized back, sleeve hems, and neck label tags with exact dimensions in centimeters.
            </p>
          </div>

          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-3">
            <Sparkles size={24} className="text-brand-lime" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
              Puff & Embroidery Shaders
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              Toggle displacement maps to visualize the exact tactile 3D height of high-density puff printing and dense thread embroidery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

