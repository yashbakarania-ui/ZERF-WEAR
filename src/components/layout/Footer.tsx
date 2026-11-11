"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowUpRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { CATEGORIES } from "@/lib/demo-data";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function Footer() {
  const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, "");

  return (
    <footer className="w-full bg-[#0D0D0D] border-t border-border-subtle text-brand-offwhite pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Badges Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 border-b border-border-subtle">
          <div className="flex items-start gap-4 p-4 bg-brand-card/40 border border-border-subtle">
            <Truck className="text-brand-lime flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">PAN-INDIA DISPATCH</h4>
              <p className="text-xs text-brand-muted mt-1">
                Fast courier delivery across all 28 states & union territories. Free shipping on orders over ₹1,999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-brand-card/40 border border-border-subtle">
            <ShieldCheck className="text-brand-lime flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">240-420 GSM STRUCTURE</h4>
              <p className="text-xs text-brand-muted mt-1">
                Single-origin combed cotton and loopback fleece that holds its architectural silhouette permanently.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-brand-card/40 border border-border-subtle">
            <RefreshCw className="text-brand-lime flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">BESPOKE B2B & CUSTOM</h4>
              <p className="text-xs text-brand-muted mt-1">
                High-density puff print, screen printing, and custom embroidery starting at 10 units with sample swatches.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-border-subtle">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tighter text-brand-offwhite uppercase font-display">
                ZARF<span className="text-brand-lime">.</span>WEAR
              </span>
            </Link>
            <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
              ZARF Wear is an all-in-one Indian custom apparel house. We engineer ready-to-wear streetwear blanks and deliver bespoke corporate uniforms and event merchandise with zero compromise on fabric weight.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20ZARF%20Team%2C%20I%20have%20an%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-offwhite transition-colors"
              >
                <MessageSquare size={14} className="text-brand-lime" />
                <span>WhatsApp Concierge: +91 98765 43210</span>
                <ArrowUpRight size={14} className="text-brand-grey" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-grey mb-4">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-muted">
              <li>
                <Link href="/shop" className="hover:text-brand-offwhite transition-colors">
                  All Pieces
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-brand-offwhite transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial & Services */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-grey mb-4">
              SERVICES & B2B
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-muted">
              <li>
                <Link href="/custom-apparel" className="hover:text-brand-offwhite transition-colors flex items-center gap-1">
                  Custom Apparel Printing
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-brand-offwhite transition-colors">
                  Corporate & Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-brand-offwhite transition-colors">
                  3D Studio (Preview)
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-brand-offwhite transition-colors">
                  Track Order Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand & Legal */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-grey mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-muted">
              <li>
                <Link href="/about" className="hover:text-brand-offwhite transition-colors">
                  Craft & Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-offwhite transition-colors">
                  Studio & Contact
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-brand-offwhite transition-colors">
                  Customer Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-brand-grey hover:text-brand-lime transition-colors">
                  Admin Hub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-brand-grey gap-4">
          <div>
            © {new Date().getFullYear()} ZARF WEAR. ALL RIGHTS RESERVED. REGISTERED IN INDIA.
          </div>
          <div className="flex items-center gap-6">
            <span>GSTIN: 27AABCS1429B1Z8</span>
            <span>•</span>
            <span>MUMBAI • BENGALURU • DELHI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

