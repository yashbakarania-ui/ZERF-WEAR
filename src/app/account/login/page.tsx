"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            [ AUTHENTICATION ]
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            CLIENT LOGIN
          </h1>
          <p className="text-xs text-brand-muted">
            Access your order history, saved addresses, and active custom enquiries.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-brand-grey">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="aarav@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-black border border-border-subtle px-3.5 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <label className="uppercase text-brand-grey">Password</label>
              <button type="button" className="text-brand-lime hover:underline">
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-black border border-border-subtle px-3.5 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{isSubmitting ? "Authenticating..." : "Sign In to Account"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="pt-4 border-t border-border-subtle text-center text-xs font-mono text-brand-muted space-y-2">
          <div>
            Don&apos;t have an account yet?{" "}
            <Link href="/account/register" className="text-brand-lime hover:underline font-bold">
              Register here
            </Link>
          </div>
          <div>
            Need to track an order without logging in?{" "}
            <Link href="/track" className="text-brand-offwhite hover:underline">
              Public Tracking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

