"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/account");
    }, 600);
  };

  return (
    <div className="w-full bg-brand-black min-h-screen py-20 flex items-center justify-center">
      <div className="w-full max-w-md mx-4 bg-brand-card/40 border border-border-subtle p-8 sm:p-10 space-y-6">
        <div className="space-y-2 text-center">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ REGISTRATION ]
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            CREATE ZARF ACCOUNT
          </h1>
          <p className="text-xs text-brand-muted">
            Track past orders, store multiple delivery addresses, and manage custom B2B projects.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-brand-grey">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-brand-black border border-border-subtle px-3.5 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-brand-grey">Email Address *</label>
            <input
              type="email"
              required
              placeholder="aarav@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-brand-black border border-border-subtle px-3.5 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-brand-grey">WhatsApp Phone (India) *</label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-brand-black border border-border-subtle px-3.5 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-brand-grey">Password *</label>
            <input
              type="password"
              required
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-brand-black border border-border-subtle px-3.5 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{isSubmitting ? "Creating Client Account..." : "Register Client Account"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="pt-4 border-t border-border-subtle text-center text-xs font-mono text-brand-muted">
          Already registered?{" "}
          <Link href="/account/login" className="text-brand-lime hover:underline font-bold">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}

