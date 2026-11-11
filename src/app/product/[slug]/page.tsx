"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Check, 
  Plus, 
  Minus, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Sparkles, 
  ChevronRight,
  X
} from "lucide-react";
import { DEMO_PRODUCTS, ProductVariant } from "@/lib/demo-data";
import { formatInr } from "@/lib/currency";
import { useCart } from "@/lib/cart-store";
import { useLanguage } from "@/lib/i18n/context";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const { t } = useLanguage();
  const { addItem } = useCart();

  const product = DEMO_PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Active gallery image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Group variants by color and size
  const uniqueColors = Array.from(
    new Map(product.variants.map((v) => [v.colorHex, { name: v.colorName, hex: v.colorHex }])).values()
  );

  const [selectedColor, setSelectedColor] = useState(uniqueColors[0]?.name || "");

  // Variants matching selected color
  const colorVariants = product.variants.filter((v) => v.colorName === selectedColor);

  const [selectedVariantId, setSelectedVariantId] = useState(
    colorVariants[0]?.id || product.variants[0]?.id
  );

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<"cm" | "in">("in");

  // Handle color change
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const firstMatchingVariant = product.variants.find((v) => v.colorName === colorName);
    if (firstMatchingVariant) {
      setSelectedVariantId(firstMatchingVariant.id);
    }
  };

  const handleAddToCart = () => {
    if (!activeVariant) return;
    addItem(product, activeVariant, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const unitPrice =
    product.basePriceInPaise + (activeVariant?.priceAdjustmentInPaise || 0);

  return (
    <div className="w-full bg-brand-black min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs font-mono text-brand-grey uppercase">
          <Link href="/shop" className="hover:text-brand-lime flex items-center gap-1 transition-colors">
            <ArrowLeft size={14} />
            <span>Catalogue</span>
          </Link>
          <span>/</span>
          <Link href={`/category/${product.category.slug}`} className="hover:text-brand-lime transition-colors">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-brand-lime truncate max-w-[200px]">{product.title}</span>
        </div>

        {/* Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Interactive Multi-View Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full bg-[#161616] border border-border-subtle overflow-hidden">
              {product.images[activeImageIndex] && (
                <Image
                  src={product.images[activeImageIndex].url}
                  alt={product.images[activeImageIndex].altText}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              )}

              {/* Badges on Gallery */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="text-xs font-mono font-bold tracking-widest uppercase bg-brand-black/90 text-brand-lime border border-brand-lime/30 px-3 py-1">
                    {product.badge}
                  </span>
                )}
                <span className="text-[10px] font-mono tracking-widest uppercase bg-brand-card text-brand-offwhite px-2 py-0.5 border border-border-subtle">
                  VIEW: {product.images[activeImageIndex]?.viewType || "FRONT"}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] bg-brand-card border overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? "border-brand-lime ring-1 ring-brand-lime"
                      : "border-border-subtle hover:border-brand-grey opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 right-1 text-[8px] font-mono bg-brand-black/80 text-brand-offwhite px-1">
                    {img.viewType.slice(0, 1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Spec & Commerce Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & SKU */}
            <div className="border-b border-border-subtle pb-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-brand-grey">
                <span className="uppercase">{product.category.name}</span>
                <span>SKU: {activeVariant?.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
                {product.subtitle}
              </p>
              <div className="text-2xl font-mono font-bold text-brand-lime pt-2">
                {formatInr(unitPrice)}
              </div>
            </div>

            {/* Color Swatch Picker */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-brand-grey uppercase">Available Colorway</span>
                <span className="text-brand-offwhite font-bold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {uniqueColors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                        isSelected ? "border-brand-lime scale-110" : "border-transparent hover:border-brand-grey"
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-full h-full rounded-full block border border-border-strong"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector & Size Guide Trigger */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-brand-grey uppercase">Garment Size</span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-brand-lime hover:underline flex items-center gap-1 text-[11px]"
                >
                  <Ruler size={13} />
                  <span>Size Measurement Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-xs font-mono">
                {["S", "M", "L", "XL", "XXL"].map((size) => {
                  const variantForSize = product.variants.find(
                    (v) => v.colorName === selectedColor && v.size === size
                  );
                  const isAvailable = variantForSize && variantForSize.stockQuantity > 0;
                  const isSelected = activeVariant?.size === size;

                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => variantForSize && setSelectedVariantId(variantForSize.id)}
                      className={`py-3 border text-center transition-all ${
                        isSelected
                          ? "bg-brand-lime text-brand-black border-brand-lime font-bold shadow-md"
                          : isAvailable
                          ? "bg-brand-card text-brand-offwhite border-border-subtle hover:border-brand-offwhite"
                          : "bg-brand-black text-brand-grey border-border-subtle/40 opacity-40 cursor-not-allowed line-through"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Stock Indicator */}
              <div className="text-xs font-mono text-brand-grey pt-1 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeVariant && activeVariant.stockQuantity > 5 ? "bg-status-success" : "bg-status-warning"}`} />
                <span>
                  {activeVariant
                    ? `${activeVariant.stockQuantity} ${t("product.stockLeft")}`
                    : t("product.outOfStock")}
                </span>
              </div>
            </div>

            {/* Quantity Selector & Add to Order Request Button */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-center">
                {/* Quantity */}
                <div className="flex items-center border border-border-subtle bg-brand-card text-xs font-mono">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-brand-muted hover:text-brand-lime transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-bold text-brand-offwhite">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(activeVariant?.stockQuantity || 10, q + 1))}
                    className="p-3 text-brand-muted hover:text-brand-lime transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Primary Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!activeVariant || activeVariant.stockQuantity === 0}
                  className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-xl ${
                    addedSuccess
                      ? "bg-brand-lime text-brand-black"
                      : "bg-brand-offwhite hover:bg-brand-lime text-brand-black"
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={16} />
                      <span>Added to Request</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>{t("product.addToBag")}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Custom Enquiry CTA */}
              <Link
                href={`/custom-apparel?product=${encodeURIComponent(product.title)}&sku=${activeVariant?.sku || ""}`}
                className="w-full py-3.5 border border-border-subtle hover:border-brand-lime bg-brand-card hover:bg-brand-elevated text-xs font-mono uppercase tracking-wider text-brand-offwhite hover:text-brand-lime transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={14} className="text-brand-lime" />
                <span>{t("product.requestCustom")} On This Silhouette</span>
              </Link>
            </div>

            {/* Specifications Accordion & Value Badges */}
            <div className="border-t border-border-subtle pt-6 space-y-4 text-xs">
              <div className="space-y-2">
                <h3 className="font-mono font-bold uppercase tracking-wider text-brand-offwhite">
                  {t("product.fabricSpecs")}
                </h3>
                <p className="text-brand-muted leading-relaxed font-light">
                  {product.fabricDetails}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border-subtle/50">
                <h3 className="font-mono font-bold uppercase tracking-wider text-brand-offwhite">
                  {t("product.careGuide")}
                </h3>
                <p className="text-brand-muted leading-relaxed font-light">
                  {product.careInstructions}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border-subtle/50">
                <h3 className="font-mono font-bold uppercase tracking-wider text-brand-offwhite">
                  Pan-India Shipping & Order Request Process
                </h3>
                <p className="text-brand-muted leading-relaxed font-light">
                  Orders submitted through this platform enter our verified review pipeline. A ZARF specialist confirms inventory, computes custom/bulk discounts if applicable, and provides a direct payment link and shipping schedule within hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#141414] border border-border-subtle p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
                  Garment Measurement Guide
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Measurements taken flat across the garment.
                </p>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-brand-grey hover:text-brand-offwhite"
              >
                <X size={20} />
              </button>
            </div>

            {/* Unit Toggle */}
            <div className="flex justify-end">
              <div className="border border-border-subtle text-[11px] font-mono">
                <button
                  onClick={() => setSizeUnit("in")}
                  className={`px-3 py-1 ${sizeUnit === "in" ? "bg-brand-offwhite text-brand-black font-bold" : "text-brand-grey"}`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setSizeUnit("cm")}
                  className={`px-3 py-1 ${sizeUnit === "cm" ? "bg-brand-offwhite text-brand-black font-bold" : "text-brand-grey"}`}
                >
                  CM
                </button>
              </div>
            </div>

            {/* Sizing Table */}
            <div className="overflow-x-auto text-xs font-mono">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle text-brand-grey">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest Width</th>
                    <th className="py-2">Garment Length</th>
                    <th className="py-2">Shoulder Drop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-brand-offwhite">
                  <tr>
                    <td className="py-2 font-bold text-brand-lime">S</td>
                    <td className="py-2">{sizeUnit === "in" ? "21.0\"" : "53.3 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "28.5\"" : "72.4 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "21.5\"" : "54.6 cm"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-brand-lime">M</td>
                    <td className="py-2">{sizeUnit === "in" ? "22.5\"" : "57.1 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "29.5\"" : "75.0 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "22.5\"" : "57.1 cm"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-brand-lime">L</td>
                    <td className="py-2">{sizeUnit === "in" ? "24.0\"" : "61.0 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "30.5\"" : "77.5 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "23.5\"" : "59.7 cm"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-brand-lime">XL</td>
                    <td className="py-2">{sizeUnit === "in" ? "25.5\"" : "64.8 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "31.5\"" : "80.0 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "24.5\"" : "62.2 cm"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-brand-lime">XXL</td>
                    <td className="py-2">{sizeUnit === "in" ? "27.0\"" : "68.6 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "32.5\"" : "82.5 cm"}</td>
                    <td className="py-2">{sizeUnit === "in" ? "25.5\"" : "64.8 cm"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-brand-muted font-mono pt-2 border-t border-border-subtle">
              * Silhouette features an intentional oversized drop-shoulder cut. For a standard tailored fit, consider sizing down.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

