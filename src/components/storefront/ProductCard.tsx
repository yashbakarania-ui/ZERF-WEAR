"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Check, ArrowRight } from "lucide-react";
import { Product } from "@/lib/demo-data";
import { formatInr } from "@/lib/currency";
import { useCart } from "@/lib/cart-store";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
  const [justAdded, setJustAdded] = useState(false);

  const frontImage = product.images.find((img) => img.viewType === "FRONT") || product.images[0];
  const backImage = product.images.find((img) => img.viewType === "BACK") || product.images[1] || frontImage;

  // Selected variant
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  // Colors available
  const uniqueColors = Array.from(
    new Map(product.variants.map((v) => [v.colorHex, { name: v.colorName, hex: v.colorHex }])).values()
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;

    addItem(product, selectedVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div 
      className="group flex flex-col bg-brand-black border border-border-subtle hover:border-brand-lime/40 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Canvas */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] w-full bg-[#161616] overflow-hidden block">
        {/* Front Image */}
        {frontImage && (
          <Image
            src={isHovered && backImage ? backImage.url : frontImage.url}
            alt={frontImage.altText || product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-brand-black/90 text-brand-lime border border-brand-lime/30 px-2 py-0.5">
              {product.badge}
            </span>
          )}
          {product.isFeatured && (
            <span className="text-[9px] font-mono tracking-widest uppercase bg-brand-offwhite text-brand-black px-1.5 py-0.5 font-bold">
              FEATURED
            </span>
          )}
        </div>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`w-full py-2.5 text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xl ${
              justAdded
                ? "bg-brand-lime text-brand-black"
                : "bg-brand-black/95 text-brand-offwhite hover:bg-brand-lime hover:text-brand-black border border-border-subtle"
            }`}
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span>Added to Request</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Quick Add ({selectedVariant?.size || "M"})</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-brand-grey mb-1">
            <span className="uppercase">{product.category.name}</span>
            <span>{product.variants.length} Sizes</span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-bold text-brand-offwhite group-hover:text-brand-lime transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-brand-muted line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Color swatches & Price */}
        <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {uniqueColors.map((c) => (
              <span
                key={c.hex}
                title={c.name}
                className="w-3 h-3 rounded-full border border-border-strong inline-block"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          <div className="text-sm font-mono font-bold text-brand-offwhite">
            {formatInr(product.basePriceInPaise)}
          </div>
        </div>
      </div>
    </div>
  );
}

