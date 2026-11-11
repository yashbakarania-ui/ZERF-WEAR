"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown, ChevronDown } from "lucide-react";
import ProductCard from "@/components/storefront/ProductCard";
import { DEMO_PRODUCTS, CATEGORIES } from "@/lib/demo-data";
import { formatInr } from "@/lib/currency";
import { useLanguage } from "@/lib/i18n/context";

export default function ShopPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc" | "newest">("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(350000); // ₹3,500
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract all sizes across catalog
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    DEMO_PRODUCTS.forEach((p) => p.variants.forEach((v) => set.add(v.size)));
    return Array.from(set);
  }, []);

  // Extract all unique color names
  const allColors = useMemo(() => {
    const set = new Set<string>();
    DEMO_PRODUCTS.forEach((p) => p.variants.forEach((v) => set.add(v.colorName)));
    return Array.from(set);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== "all" && product.category.slug !== selectedCategory) {
        return false;
      }

      // Size
      if (selectedSize !== "all") {
        const hasSize = product.variants.some((v) => v.size === selectedSize);
        if (!hasSize) return false;
      }

      // Color
      if (selectedColor !== "all") {
        const hasColor = product.variants.some((v) => v.colorName === selectedColor);
        if (!hasColor) return false;
      }

      // Price
      if (product.basePriceInPaise > maxPrice) {
        return false;
      }

      // Availability
      if (inStockOnly) {
        const hasStock = product.variants.some((v) => v.stockQuantity > 0);
        if (!hasStock) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.basePriceInPaise - b.basePriceInPaise;
      if (sortBy === "price_desc") return b.basePriceInPaise - a.basePriceInPaise;
      if (sortBy === "featured") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedSize, selectedColor, maxPrice, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedColor("all");
    setMaxPrice(350000);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedSize !== "all" ||
    selectedColor !== "all" ||
    maxPrice < 350000 ||
    inStockOnly;

  return (
    <div className="w-full bg-brand-black min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Breadcrumbs & Title */}
        <div className="border-b border-border-subtle pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-grey uppercase mb-2">
            <span>ZARF</span>
            <span>/</span>
            <span className="text-brand-lime">CATALOGUE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-offwhite font-display">
                ALL APPAREL PIECES
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-2 font-light">
                Explore our full line of heavyweight blanks, street-cut hoodies, structured polos, and headwear.
              </p>
            </div>
            <div className="text-xs font-mono text-brand-grey">
              SHOWING <strong className="text-brand-offwhite">{filteredProducts.length}</strong> OF {DEMO_PRODUCTS.length} PIECES
            </div>
          </div>
        </div>

        {/* Search & Utility Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-brand-card/50 p-4 border border-border-subtle">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey" />
            <input
              type="text"
              placeholder="Search by silhouette, GSM, fabric, or color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-black border border-border-subtle pl-10 pr-4 py-2.5 text-xs font-mono text-brand-offwhite placeholder:text-brand-grey focus:outline-none focus:border-brand-lime"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey hover:text-brand-offwhite"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Category Buttons for Desktop */}
          <div className="hidden xl:flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-2 border transition-colors whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-brand-offwhite text-brand-black border-brand-offwhite font-bold"
                  : "bg-brand-black text-brand-muted border-border-subtle hover:text-brand-offwhite"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-2 border transition-colors whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? "bg-brand-offwhite text-brand-black border-brand-offwhite font-bold"
                    : "bg-brand-black text-brand-muted border-border-subtle hover:text-brand-offwhite"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Sheet Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-black border border-border-subtle text-xs font-mono uppercase text-brand-offwhite"
            >
              <SlidersHorizontal size={14} className="text-brand-lime" />
              <span>Filters {hasActiveFilters && "•"}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-brand-black border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite">
              <ArrowUpDown size={13} className="text-brand-lime mr-2 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-transparent text-xs text-brand-offwhite focus:outline-none cursor-pointer pr-4 uppercase"
              >
                <option value="featured" className="bg-brand-black">Featured</option>
                <option value="price_asc" className="bg-brand-black">Price: Low to High</option>
                <option value="price_desc" className="bg-brand-black">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
            <span className="text-brand-grey text-[11px] uppercase mr-2">Active Filters:</span>
            {selectedCategory !== "all" && (
              <span className="px-2.5 py-1 bg-brand-card border border-border-subtle text-brand-offwhite flex items-center gap-1.5">
                Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                <X size={12} className="cursor-pointer hover:text-brand-lime" onClick={() => setSelectedCategory("all")} />
              </span>
            )}
            {selectedSize !== "all" && (
              <span className="px-2.5 py-1 bg-brand-card border border-border-subtle text-brand-offwhite flex items-center gap-1.5">
                Size: {selectedSize}
                <X size={12} className="cursor-pointer hover:text-brand-lime" onClick={() => setSelectedSize("all")} />
              </span>
            )}
            {selectedColor !== "all" && (
              <span className="px-2.5 py-1 bg-brand-card border border-border-subtle text-brand-offwhite flex items-center gap-1.5">
                Color: {selectedColor}
                <X size={12} className="cursor-pointer hover:text-brand-lime" onClick={() => setSelectedColor("all")} />
              </span>
            )}
            {inStockOnly && (
              <span className="px-2.5 py-1 bg-brand-card border border-border-subtle text-brand-offwhite flex items-center gap-1.5">
                In Stock Only
                <X size={12} className="cursor-pointer hover:text-brand-lime" onClick={() => setInStockOnly(false)} />
              </span>
            )}
            {maxPrice < 350000 && (
              <span className="px-2.5 py-1 bg-brand-card border border-border-subtle text-brand-offwhite flex items-center gap-1.5">
                Max: {formatInr(maxPrice)}
                <X size={12} className="cursor-pointer hover:text-brand-lime" onClick={() => setMaxPrice(350000)} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[11px] text-brand-lime hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-brand-card/30 p-6 border border-border-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-offwhite flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-brand-lime" />
                Refine Pieces
              </h2>
              {hasActiveFilters && (
                <button onClick={resetFilters} className="text-[11px] font-mono text-brand-grey hover:text-brand-lime">
                  Reset
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono uppercase text-brand-grey block">
                Category
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left text-xs py-1.5 px-2 flex justify-between items-center transition-colors ${
                    selectedCategory === "all"
                      ? "bg-brand-card text-brand-lime font-bold border-l-2 border-brand-lime"
                      : "text-brand-muted hover:text-brand-offwhite"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] font-mono">{DEMO_PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => {
                  const count = DEMO_PRODUCTS.filter((p) => p.category.slug === cat.slug).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left text-xs py-1.5 px-2 flex justify-between items-center transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-brand-card text-brand-lime font-bold border-l-2 border-brand-lime"
                          : "text-brand-muted hover:text-brand-offwhite"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] font-mono text-brand-grey">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <label className="text-[11px] font-mono uppercase text-brand-grey block">
                Garment Size
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setSelectedSize("all")}
                  className={`py-1.5 border text-center transition-colors ${
                    selectedSize === "all"
                      ? "bg-brand-offwhite text-brand-black border-brand-offwhite font-bold"
                      : "bg-brand-black text-brand-muted border-border-subtle hover:text-brand-offwhite"
                  }`}
                >
                  All
                </button>
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-1.5 border text-center transition-colors ${
                      selectedSize === size
                        ? "bg-brand-lime text-brand-black border-brand-lime font-bold"
                        : "bg-brand-black text-brand-muted border-border-subtle hover:text-brand-offwhite"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <label className="text-[11px] font-mono uppercase text-brand-grey block">
                Color Palette
              </label>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  onClick={() => setSelectedColor("all")}
                  className={`px-2.5 py-1 text-[11px] font-mono border transition-colors ${
                    selectedColor === "all"
                      ? "bg-brand-offwhite text-brand-black border-brand-offwhite font-bold"
                      : "bg-brand-black text-brand-muted border-border-subtle hover:text-brand-offwhite"
                  }`}
                >
                  All Colors
                </button>
                {allColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-2.5 py-1 text-[11px] font-mono border transition-colors ${
                      selectedColor === color
                        ? "bg-brand-card text-brand-lime border-brand-lime font-bold"
                        : "bg-brand-black text-brand-muted border-border-subtle hover:text-brand-offwhite"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="uppercase text-brand-grey">Max Price</span>
                <span className="text-brand-lime font-bold">{formatInr(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={80000}
                max={350000}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-lime bg-brand-card cursor-pointer"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="pt-4 border-t border-border-subtle">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-brand-offwhite font-mono">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded-none accent-brand-lime w-4 h-4"
                />
                <span>In Stock Pieces Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-brand-card/30 border border-border-subtle p-16 text-center space-y-4">
                <p className="text-base text-brand-offwhite font-bold">
                  {t("catalog.noProducts")}
                </p>
                <p className="text-xs text-brand-muted max-w-sm mx-auto">
                  Try clearing your active filters or searching for another term like &quot;Oversized&quot;, &quot;280 GSM&quot;, or &quot;Hoodie&quot;.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-brand-offwhite text-brand-black text-xs font-mono font-bold uppercase hover:bg-brand-lime transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

