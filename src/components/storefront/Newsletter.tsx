"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-[#111111] border-b border-border-subtle py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
          [ 05 // PRIVATE ACCESS ]
        </span>

        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-offwhite font-display">
          RECEIVE PRIVATE DROP ALERTS & B2B CATALOGS.
        </h2>

        <p className="text-sm text-brand-muted max-w-xl mx-auto font-light leading-relaxed">
          Be the first to access limited 420 GSM seasonal blanks, new fabric weaves, and priority custom printing slots across India. No spam, ever.
        </p>

        {submitted ? (
          <div className="p-4 bg-brand-card border border-brand-lime/40 max-w-md mx-auto text-xs font-mono text-brand-lime flex items-center justify-center gap-2">
            <Check size={16} />
            <span>You have been added to the ZARF private vanguard dispatch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-2">
            <div className="flex border border-border-subtle focus-within:border-brand-lime transition-colors">
              <input
                type="email"
                placeholder="Enter your corporate or personal email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-brand-card px-4 py-3.5 text-xs font-mono text-brand-offwhite placeholder:text-brand-grey focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </div>
            {error && <p className="text-xs text-status-danger font-mono text-left">{error}</p>}
          </form>
        )}

        <div className="text-[11px] font-mono text-brand-grey">
          UNSUBSCRIBE AT ANY MOMENT • ZERO MARKETING NOISE
        </div>
      </div>
    </section>
  );
}

