"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  User, 
  ChevronDown, 
  Truck,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart-store";
import { CATEGORIES } from "@/lib/demo-data";

export default function Header() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const { totalItemCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-brand-black/90 backdrop-blur-md border-b border-border-subtle py-3"
          : "bg-brand-black border-b border-border-subtle/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-brand-offwhite hover:text-brand-lime transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-brand-offwhite uppercase font-display group-hover:text-brand-lime transition-colors">
              ZARF<span className="text-brand-lime">.</span>WEAR
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-brand-grey border border-border-subtle px-1.5 py-0.5 uppercase">
              STUDIO
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase">
          {/* Shop with dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <Link
              href="/shop"
              className={`flex items-center gap-1 transition-colors py-2 ${
                pathname.startsWith("/shop") || pathname.startsWith("/category")
                  ? "text-brand-lime"
                  : "text-brand-offwhite hover:text-brand-lime"
              }`}
            >
              {t("nav.shop")}
              <ChevronDown size={14} className={`transition-transform duration-200 ${shopDropdownOpen ? "rotate-180 text-brand-lime" : ""}`} />
            </Link>

            {/* Dropdown Menu */}
            {shopDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-[#141414] border border-border-subtle shadow-2xl py-3 px-2 rounded-none z-50">
                <Link
                  href="/shop"
                  className="block px-3 py-2 text-xs font-semibold text-brand-offwhite hover:bg-brand-card hover:text-brand-lime transition-colors border-b border-border-subtle/50 mb-1"
                >
                  {t("nav.allProducts")} →
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="block px-3 py-2 text-xs text-brand-muted hover:text-brand-offwhite hover:bg-brand-card transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/custom-apparel"
            className={`transition-colors flex items-center gap-1.5 ${
              pathname === "/custom-apparel" ? "text-brand-lime" : "text-brand-offwhite hover:text-brand-lime"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
            {t("nav.custom")}
          </Link>

          <Link
            href="/b2b"
            className={`transition-colors ${
              pathname === "/b2b" ? "text-brand-lime" : "text-brand-offwhite hover:text-brand-lime"
            }`}
          >
            {t("nav.b2b")}
          </Link>

          <Link
            href="/studio"
            className="text-brand-muted hover:text-brand-lime transition-colors flex items-center gap-1 text-[11px]"
          >
            <Sparkles size={12} className="text-brand-lime" />
            3D Studio
            <span className="text-[9px] bg-brand-card text-brand-lime px-1 rounded-sm border border-border-subtle">
              SOON
            </span>
          </Link>

          <Link
            href="/about"
            className={`transition-colors ${
              pathname === "/about" ? "text-brand-lime" : "text-brand-offwhite hover:text-brand-lime"
            }`}
          >
            {t("nav.about")}
          </Link>

          <Link
            href="/contact"
            className={`transition-colors ${
              pathname === "/contact" ? "text-brand-lime" : "text-brand-offwhite hover:text-brand-lime"
            }`}
          >
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Right Action Utilities */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Language Switcher */}
          <div className="flex items-center border border-border-subtle text-[11px] font-mono uppercase">
            <button
              onClick={() => setLocale("en")}
              className={`px-2 py-1 transition-colors ${
                locale === "en" ? "bg-brand-offwhite text-brand-black font-bold" : "text-brand-muted hover:text-brand-offwhite"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("hi")}
              className={`px-2 py-1 transition-colors ${
                locale === "hi" ? "bg-brand-offwhite text-brand-black font-bold" : "text-brand-muted hover:text-brand-offwhite"
              }`}
            >
              HI
            </button>
          </div>

          {/* Track Order link */}
          <Link
            href="/track"
            className="hidden md:flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-offwhite transition-colors uppercase tracking-wider"
            title="Track Order"
          >
            <Truck size={15} />
            <span className="hidden xl:inline">{t("nav.track")}</span>
          </Link>

          {/* Account Profile link */}
          <Link
            href="/account"
            className="text-brand-offwhite hover:text-brand-lime transition-colors p-1"
            aria-label="Customer Account"
          >
            <User size={19} />
          </Link>

          {/* Shopping Bag Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 p-1 text-brand-offwhite hover:text-brand-lime transition-colors group"
            aria-label="View shopping bag"
          >
            <ShoppingBag size={20} />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-lime text-brand-black text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#111111] border-t border-border-subtle p-6 overflow-y-auto z-50 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-border-subtle pb-4">
              <Link
                href="/shop"
                className="text-lg font-bold uppercase tracking-wider text-brand-offwhite block mb-3 hover:text-brand-lime"
              >
                {t("nav.shop")}
              </Link>
              <div className="grid grid-cols-2 gap-2 pl-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="text-xs text-brand-muted hover:text-brand-offwhite py-1 block"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/custom-apparel"
              className="flex items-center justify-between text-lg font-bold uppercase tracking-wider text-brand-offwhite hover:text-brand-lime border-b border-border-subtle pb-4"
            >
              <span>{t("nav.custom")}</span>
              <span className="text-[10px] font-mono bg-brand-lime text-brand-black px-2 py-0.5 font-bold">
                ENQUIRY
              </span>
            </Link>

            <Link
              href="/b2b"
              className="text-lg font-bold uppercase tracking-wider text-brand-offwhite hover:text-brand-lime block border-b border-border-subtle pb-4"
            >
              {t("nav.b2b")}
            </Link>

            <Link
              href="/studio"
              className="flex items-center justify-between text-lg font-bold uppercase tracking-wider text-brand-muted hover:text-brand-lime border-b border-border-subtle pb-4"
            >
              <span className="flex items-center gap-2">
                <Sparkles size={16} className="text-brand-lime" />
                3D Customization Studio
              </span>
              <span className="text-[10px] font-mono border border-border-subtle text-brand-lime px-2 py-0.5">
                COMING SOON
              </span>
            </Link>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <Link href="/about" className="text-sm uppercase text-brand-muted hover:text-brand-offwhite">
                {t("nav.about")}
              </Link>
              <Link href="/contact" className="text-sm uppercase text-brand-muted hover:text-brand-offwhite">
                {t("nav.contact")}
              </Link>
              <Link href="/track" className="text-sm uppercase text-brand-muted hover:text-brand-offwhite flex items-center gap-1.5">
                <Truck size={14} />
                {t("nav.track")}
              </Link>
              <Link href="/account" className="text-sm uppercase text-brand-muted hover:text-brand-offwhite flex items-center gap-1.5">
                <User size={14} />
                Account
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-border-subtle text-center text-xs font-mono text-brand-grey">
            ZARF WEAR • PAN-INDIA BESPOKE APPAREL
          </div>
        </div>
      )}
    </header>
  );
}

