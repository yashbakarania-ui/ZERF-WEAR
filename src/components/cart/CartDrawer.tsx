"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, ShieldAlert } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatInr } from "@/lib/currency";
import { useLanguage } from "@/lib/i18n/context";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141414] border-l border-border-subtle flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-5 border-b border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-brand-lime" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
                {t("cart.title")} ({totalItemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-brand-muted hover:text-brand-offwhite transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-card flex items-center justify-center text-brand-grey border border-border-subtle">
                  <ShoppingBag size={28} />
                </div>
                <p className="text-sm text-brand-muted">{t("cart.empty")}</p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-brand-offwhite text-brand-black text-xs font-bold uppercase tracking-wider hover:bg-brand-lime transition-colors"
                >
                  {t("cart.startShopping")}
                </Link>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="divide-y divide-border-subtle space-y-4">
                  {items.map((item) => {
                    const unitPrice =
                      item.product.basePriceInPaise +
                      (item.variant.priceAdjustmentInPaise || 0);

                    return (
                      <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                        {/* Thumbnail */}
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

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-xs font-bold text-brand-offwhite line-clamp-1">
                                {item.product.title}
                              </h3>
                              <button
                                onClick={() => removeItem(item.variant.id)}
                                className="text-brand-grey hover:text-status-danger transition-colors p-0.5"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-mono text-brand-muted mt-1">
                              <span>Size: <strong className="text-brand-offwhite">{item.variant.size}</strong></span>
                              <span>•</span>
                              <span>Color: {item.variant.colorName}</span>
                            </div>
                            <div className="text-xs font-mono font-bold text-brand-lime mt-1.5">
                              {formatInr(unitPrice)}
                            </div>
                          </div>

                          {/* Quantity control */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-border-subtle bg-brand-card">
                              <button
                                onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                                className="p-1 hover:text-brand-lime transition-colors text-brand-muted"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-3 text-xs font-mono font-bold text-brand-offwhite">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                                className="p-1 hover:text-brand-lime transition-colors text-brand-muted"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="text-xs font-mono font-semibold text-brand-offwhite">
                              {formatInr(unitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Form */}
                <div className="pt-4 border-t border-border-subtle">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-brand-card border border-brand-lime/30 text-xs">
                      <div className="flex items-center gap-2">
                        <Tag size={13} className="text-brand-lime" />
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
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo Code (e.g. ZARF10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 bg-brand-card border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite uppercase placeholder:normal-case placeholder:text-brand-grey focus:outline-none focus:border-brand-lime"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-bold uppercase tracking-wider text-brand-offwhite transition-colors"
                        >
                          {t("cart.apply")}
                        </button>
                      </div>
                      {couponError && <p className="text-[11px] text-status-danger">{couponError}</p>}
                      {couponSuccess && <p className="text-[11px] text-brand-lime">{couponSuccess}</p>}
                    </form>
                  )}
                </div>

                {/* Honest Order Request Notice */}
                <div className="p-3 bg-[#1A1A1A] border border-border-subtle flex gap-2.5 items-start">
                  <ShieldAlert size={16} className="text-brand-lime flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    {t("cart.orderRequestNotice")}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Totals and CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-border-subtle bg-[#111111] space-y-3">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-brand-muted">
                  <span>{t("cart.subtotal")}</span>
                  <span>{formatInr(subtotalInPaise)}</span>
                </div>
                {discountInPaise > 0 && (
                  <div className="flex justify-between text-brand-lime">
                    <span>Discount</span>
                    <span>-{formatInr(discountInPaise)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-muted">
                  <span>{t("cart.shipping")}</span>
                  <span>
                    {shippingFeeInPaise === 0 ? (
                      <strong className="text-brand-lime font-bold">{t("cart.shippingFree")}</strong>
                    ) : (
                      formatInr(shippingFeeInPaise)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-brand-offwhite pt-2 border-t border-border-subtle">
                  <span>{t("cart.total")}</span>
                  <span className="text-brand-lime">{formatInr(totalAmountInPaise)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/order-request"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-wider transition-colors"
                >
                  <span>{t("cart.proceedCta")}</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full block text-center py-2 text-xs font-mono text-brand-muted hover:text-brand-offwhite uppercase transition-colors"
                >
                  View Full Bag & Specs →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

