"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  ShoppingBag, 
  ShieldAlert, 
  ArrowLeft,
  Truck
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatInr } from "@/lib/currency";
import { useLanguage } from "@/lib/i18n/context";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotalInPaise,
    discountInPaise,
    shippingFeeInPaise,
    totalAmountInPaise,
    totalItemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { t } = useLanguage();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput("");
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <div className="w-full bg-brand-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-brand-grey uppercase">
          <Link href="/shop" className="hover:text-brand-lime flex items-center gap-1 transition-colors">
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
          <span>/</span>
          <span className="text-brand-lime">Shopping Bag</span>
        </div>

        <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-offwhite font-display">
              SHOPPING BAG
            </h1>
            <p className="text-xs text-brand-muted mt-1 font-mono">
              {totalItemCount} {totalItemCount === 1 ? "PIECE" : "PIECES"} IN YOUR SELECTION
            </p>
          </div>
          <div className="text-xs font-mono text-brand-grey flex items-center gap-2">
            <Truck size={14} className="text-brand-lime" />
            <span>Pan-India Dispatch • Free Delivery Above ₹1,999</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-16 sm:p-24 bg-brand-card/30 border border-border-subtle text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-brand-card flex items-center justify-center mx-auto text-brand-grey border border-border-subtle">
              <ShoppingBag size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold uppercase tracking-tight text-brand-offwhite font-display">
                YOUR BAG IS EMPTY
              </h2>
              <p className="text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
                You haven&apos;t added any heavyweight pieces or blanks to your order request yet.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-widest transition-colors shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Items Table */}
            <div className="lg:col-span-8 bg-brand-card/40 border border-border-subtle divide-y divide-border-subtle">
              {items.map((item) => {
                const unitPrice =
                  item.product.basePriceInPaise +
                  (item.variant.priceAdjustmentInPaise || 0);

                return (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    {/* Visual & Basic Info */}
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 h-24 bg-brand-card flex-shrink-0 border border-border-subtle overflow-hidden">
                        {item.product.images[0] && (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-brand-grey">
                          {item.product.category.name}
                        </span>
                        <Link href={`/product/${item.product.slug}`}>
                          <h3 className="text-sm font-bold text-brand-offwhite hover:text-brand-lime transition-colors">
                            {item.product.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-3 text-xs font-mono text-brand-muted">
                          <span>Size: <strong className="text-brand-offwhite">{item.variant.size}</strong></span>
                          <span>•</span>
                          <span>Color: {item.variant.colorName}</span>
                        </div>
                        <div className="text-xs font-mono font-bold text-brand-lime pt-1">
                          Unit: {formatInr(unitPrice)}
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-border-subtle/50">
                      {/* Controls */}
                      <div className="flex items-center border border-border-subtle bg-brand-black">
                        <button
                          onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                          className="p-2 text-brand-muted hover:text-brand-lime transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-brand-offwhite">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                          className="p-2 text-brand-muted hover:text-brand-lime transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-mono font-bold text-brand-offwhite">
                          {formatInr(unitPrice * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeItem(item.variant.id)}
                          className="text-[11px] font-mono text-brand-grey hover:text-status-danger underline mt-0.5 inline-block"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Summary & Order Request Flow */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-brand-card/40 border border-border-subtle p-6 space-y-6">
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-brand-offwhite border-b border-border-subtle pb-3">
                  ORDER REQUEST SUMMARY
                </h2>

                {/* Promo Code Form */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-brand-black border border-brand-lime/30 text-xs">
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-brand-lime" />
                        <span className="font-mono font-bold text-brand-lime">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-[11px] text-brand-muted">
                          ({appliedCoupon.discountPercentage ? `${appliedCoupon.discountPercentage}% off` : "Discount applied"})
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-[11px] font-mono text-brand-grey hover:text-status-danger underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-brand-grey block">
                        Promotional Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. ZARF10"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 bg-brand-black border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite uppercase focus:outline-none focus:border-brand-lime"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono font-bold uppercase text-brand-offwhite transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-[11px] text-status-danger font-mono">{couponError}</p>}
                      {couponSuccess && <p className="text-[11px] text-brand-lime font-mono">{couponSuccess}</p>}
                    </form>
                  )}
                </div>

                {/* Financial Ledger */}
                <div className="space-y-3 text-xs font-mono border-t border-border-subtle pt-4">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal</span>
                    <span>{formatInr(subtotalInPaise)}</span>
                  </div>

                  {discountInPaise > 0 && (
                    <div className="flex justify-between text-brand-lime font-bold">
                      <span>Coupon Discount</span>
                      <span>-{formatInr(discountInPaise)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-brand-muted">
                    <span>Pan-India Shipping</span>
                    <span>
                      {shippingFeeInPaise === 0 ? (
                        <strong className="text-brand-lime font-bold">Free</strong>
                      ) : (
                        formatInr(shippingFeeInPaise)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-brand-offwhite pt-3 border-t border-border-subtle">
                    <span>Estimated Total</span>
                    <span className="text-brand-lime">{formatInr(totalAmountInPaise)}</span>
                  </div>
                </div>

                {/* Honest Order Request Explanation */}
                <div className="p-3.5 bg-brand-black border border-border-subtle flex gap-3 items-start">
                  <ShieldAlert size={18} className="text-brand-lime flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    <strong>Zero Fake Payments:</strong> Submitting this request creates an authentic order record in our database. Our fulfillment team reviews stock, reserves your sizes, and contacts you with payment confirmation and dispatch details.
                  </p>
                </div>

                {/* Primary Checkout CTA */}
                <Link
                  href="/order-request"
                  className="w-full py-4 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>Proceed to Order Request</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

