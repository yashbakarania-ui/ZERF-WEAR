"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Truck, ArrowRight, ShieldCheck } from "lucide-react";

export default function TrackSearchPage() {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = reference.trim().toUpperCase();
    if (!clean) {
      setError("Please enter a valid order reference code.");
      return;
    }
    router.push(`/track/${clean}`);
  };

  return (
    <div className="w-full bg-brand-black min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-card border border-border-subtle text-xs font-mono text-brand-lime uppercase">
            <Truck size={14} />
            <span>Pan-India Order Tracking</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            TRACK YOUR ORDER REQUEST
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto font-light leading-relaxed">
            Enter the 16-character reference number provided upon submission (e.g. <strong className="text-brand-offwhite font-mono">ZRF-20261111-8942</strong>).
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-brand-card/40 border border-border-subtle p-8 sm:p-10 space-y-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-brand-grey block">
                Order Request Reference Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="ZRF-YYYYMMDD-XXXX"
                  value={reference}
                  onChange={(e) => {
                    setReference(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-brand-black border border-border-subtle pl-4 pr-12 py-3.5 text-sm font-mono text-brand-offwhite uppercase tracking-wider focus:outline-none focus:border-brand-lime"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-offwhite hover:bg-brand-lime text-brand-black transition-colors"
                  aria-label="Search order"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              {error && <p className="text-xs text-status-danger font-mono pt-1">{error}</p>}
            </div>

            <div className="pt-2 text-xs font-mono text-brand-grey flex items-center justify-between">
              <span>Demo Quick Search:</span>
              <button
                type="button"
                onClick={() => setReference("ZRF-20261111-8942")}
                className="text-brand-lime hover:underline"
              >
                Use Sample ZRF-20261111-8942
              </button>
            </div>
          </form>
        </div>

        {/* 10-Stage Fulfillment Transparency */}
        <div className="p-6 bg-brand-card/20 border border-border-subtle space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-offwhite">
            Verified Status Pipeline:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono text-brand-muted">
            <span className="p-2 bg-brand-black border border-border-subtle">1. Order Requested</span>
            <span className="p-2 bg-brand-black border border-border-subtle">2. Under Review</span>
            <span className="p-2 bg-brand-black border border-border-subtle">3. Quotation Sent</span>
            <span className="p-2 bg-brand-black border border-border-subtle">4. Awaiting Approval</span>
            <span className="p-2 bg-brand-black border border-border-subtle">5. Confirmed</span>
            <span className="p-2 bg-brand-black border border-border-subtle">6. Processing</span>
            <span className="p-2 bg-brand-black border border-border-subtle">7. In Production</span>
            <span className="p-2 bg-brand-black border border-border-subtle">8. Shipped</span>
            <span className="p-2 bg-brand-black border border-border-subtle">9. Delivered</span>
            <span className="p-2 bg-brand-black border border-border-subtle text-status-danger">10. Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
}

