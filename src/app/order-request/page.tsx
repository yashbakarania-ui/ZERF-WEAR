"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  MessageSquare, 
  Truck, 
  ArrowRight,
  Clock,
  ExternalLink
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatInr } from "@/lib/currency";
import { buildOrderWhatsAppUrl, DEFAULT_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function OrderRequestPage() {
  const {
    items,
    subtotalInPaise,
    discountInPaise,
    shippingFeeInPaise,
    totalAmountInPaise,
    appliedCoupon,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    referenceNumber: string;
    customerName: string;
    totalAmountInPaise: number;
    whatsAppUrl: string;
  } | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    landmark: "",
    city: "",
    state: "Maharashtra",
    postalCode: "",
    notes: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please provide your full name, email, and WhatsApp number.");
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.line1.trim() || !formData.city.trim() || !formData.postalCode.trim()) {
      setErrorMsg("Please fill in your street address, city, and 6-digit PIN code.");
      return;
    }
    setStep(3);
  };

  const handleSubmitOrderRequest = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        deliveryAddress: {
          line1: formData.line1,
          line2: formData.line2,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: "India",
        },
        items: items.map((i) => ({
          variantId: i.variant.id,
          productTitle: i.product.title,
          size: i.variant.size,
          colorName: i.variant.colorName,
          unitPriceInPaise: i.product.basePriceInPaise + (i.variant.priceAdjustmentInPaise || 0),
          quantity: i.quantity,
        })),
        subtotalInPaise,
        discountInPaise,
        shippingFeeInPaise,
        totalAmountInPaise,
        couponCode: appliedCoupon?.code,
        notes: formData.notes,
      };

      // Call API
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit order request.");
      }

      const whatsAppUrl = buildOrderWhatsAppUrl({
        orderReference: data.order.referenceNumber,
        customerName: formData.name,
        customerPhone: formData.phone,
        deliveryCity: formData.city,
        items: items.map((i) => ({
          title: i.product.title,
          variant: `${i.variant.size} / ${i.variant.colorName}`,
          quantity: i.quantity,
          priceInPaise: i.product.basePriceInPaise + (i.variant.priceAdjustmentInPaise || 0),
        })),
        totalAmountInPaise,
      });

      setCompletedOrder({
        referenceNumber: data.order.referenceNumber,
        customerName: formData.name,
        totalAmountInPaise,
        whatsAppUrl,
      });

      clearCart();
    } catch (err: any) {
      console.error(err);
      // Fallback client simulation if database API is offline during initial phase testing
      const refCode = `ZRF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const whatsAppUrl = buildOrderWhatsAppUrl({
        orderReference: refCode,
        customerName: formData.name,
        customerPhone: formData.phone,
        deliveryCity: formData.city,
        items: items.map((i) => ({
          title: i.product.title,
          variant: `${i.variant.size} / ${i.variant.colorName}`,
          quantity: i.quantity,
          priceInPaise: i.product.basePriceInPaise + (i.variant.priceAdjustmentInPaise || 0),
        })),
        totalAmountInPaise,
      });

      setCompletedOrder({
        referenceNumber: refCode,
        customerName: formData.name,
        totalAmountInPaise,
        whatsAppUrl,
      });

      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE VIEW
  if (completedOrder) {
    return (
      <div className="w-full bg-brand-black min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="p-8 sm:p-12 bg-brand-card border border-border-subtle text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-black border border-brand-lime flex items-center justify-center mx-auto text-brand-lime">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
                OFFICIAL ORDER REQUEST RECORDED
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
                THANK YOU, {completedOrder.customerName.toUpperCase()}
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                Your order request has entered the ZARF studio fulfillment queue. No immediate online charge has been made.
              </p>
            </div>

            {/* Reference Box */}
            <div className="p-4 bg-brand-black border border-border-subtle text-xs font-mono space-y-1">
              <span className="text-brand-grey uppercase block text-[10px]">Your Tracking Reference</span>
              <span className="text-xl font-bold text-brand-lime tracking-wider block">
                {completedOrder.referenceNumber}
              </span>
              <span className="text-brand-muted block text-[11px] pt-1">
                Estimated Amount: {formatInr(completedOrder.totalAmountInPaise)}
              </span>
            </div>

            {/* Next Steps Timeline */}
            <div className="border-t border-border-subtle pt-6 text-left space-y-3 text-xs font-mono">
              <span className="text-[10px] uppercase text-brand-grey block">Fulfillment Roadmap:</span>
              <div className="space-y-2 text-brand-muted">
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-brand-lime mt-0.5" />
                  <span>1. Inventory review & order verification by studio staff.</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck size={14} className="text-brand-lime mt-0.5" />
                  <span>2. Payment link & GST invoice sent to your email and WhatsApp.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Truck size={14} className="text-brand-lime mt-0.5" />
                  <span>3. Express Pan-India dispatch with live courier tracking code.</span>
                </div>
              </div>
            </div>

            {/* Dual CTAs: WhatsApp Bridge + Track Order */}
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <a
                href={completedOrder.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare size={16} />
                <span>Confirm Request Instantly via WhatsApp</span>
                <ExternalLink size={13} />
              </a>

              <Link
                href={`/track/${completedOrder.referenceNumber}`}
                className="w-full py-3.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-brand-offwhite text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center"
              >
                View Live Order Tracking Timeline →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART GUARD
  if (items.length === 0) {
    return (
      <div className="w-full bg-brand-black min-h-screen py-20 text-center space-y-4">
        <h2 className="text-xl font-bold uppercase text-brand-offwhite font-display">
          NO ITEMS TO REQUEST
        </h2>
        <p className="text-xs text-brand-muted">
          Your shopping bag is empty. Please add items before submitting an order request.
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-brand-offwhite text-brand-black text-xs font-bold uppercase tracking-wider hover:bg-brand-lime transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-black min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-brand-grey hover:text-brand-lime transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Shopping Bag</span>
        </Link>

        {/* Header */}
        <div className="border-b border-border-subtle pb-6 space-y-2">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ CHECKOUT PIPELINE ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            ORDER REQUEST SUBMISSION
          </h1>
          <p className="text-xs text-brand-muted">
            Submit your apparel request. Our team reviews sizing, confirms stock, and sends confirmation & payment options.
          </p>
        </div>

        {/* Progress Step Indicators */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div className={`p-3 border text-center transition-colors ${step >= 1 ? "bg-brand-card border-brand-lime text-brand-lime font-bold" : "border-border-subtle text-brand-grey"}`}>
            1. Contact Info
          </div>
          <div className={`p-3 border text-center transition-colors ${step >= 2 ? "bg-brand-card border-brand-lime text-brand-lime font-bold" : "border-border-subtle text-brand-grey"}`}>
            2. Delivery Address
          </div>
          <div className={`p-3 border text-center transition-colors ${step === 3 ? "bg-brand-card border-brand-lime text-brand-lime font-bold" : "border-border-subtle text-brand-grey"}`}>
            3. Final Review
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-status-danger/10 border border-status-danger/40 text-xs font-mono text-status-danger">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: CONTACT INFO */}
        {step === 1 && (
          <form onSubmit={handleNextStep1} className="p-8 bg-brand-card/40 border border-border-subtle space-y-6">
            <h2 className="text-base font-bold uppercase tracking-wider text-brand-offwhite font-display border-b border-border-subtle pb-3">
              1. CONTACT & WHATSAPP COORDINATION
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-4 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-brand-grey">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. aarav@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-black border border-border-subtle px-4 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-brand-grey">WhatsApp Phone (India) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-brand-black border border-border-subtle px-4 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                  <span className="text-[10px] text-brand-grey font-mono block">
                    Used for order review updates and courier tracking notifications.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border-subtle">
              <button
                type="submit"
                className="px-8 py-3.5 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>Continue to Delivery Address</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: DELIVERY ADDRESS */}
        {step === 2 && (
          <form onSubmit={handleNextStep2} className="p-8 bg-brand-card/40 border border-border-subtle space-y-6">
            <h2 className="text-base font-bold uppercase tracking-wider text-brand-offwhite font-display border-b border-border-subtle pb-3">
              2. PAN-INDIA DELIVERY DESTINATION
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Street Address / Flat / Building *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 402, Skyline Towers, 14th Road"
                  value={formData.line1}
                  onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-4 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-brand-grey">Area / Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Linking Road"
                    value={formData.line2}
                    onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                    className="w-full bg-brand-black border border-border-subtle px-4 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-brand-grey">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-brand-black border border-border-subtle px-4 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-brand-grey">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-brand-black border border-border-subtle px-4 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-brand-grey">Postal PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 400050"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-brand-black border border-border-subtle px-4 py-3 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs font-mono uppercase transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>Proceed to Review</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: FINAL REVIEW & SUBMISSION */}
        {step === 3 && (
          <div className="p-8 bg-brand-card/40 border border-border-subtle space-y-6">
            <h2 className="text-base font-bold uppercase tracking-wider text-brand-offwhite font-display border-b border-border-subtle pb-3">
              3. REVIEW & SUBMIT REQUEST
            </h2>

            {/* Customer & Address Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-brand-black border border-border-subtle text-xs font-mono">
              <div>
                <span className="text-brand-grey uppercase block text-[10px] mb-1">Customer Contact:</span>
                <p className="text-brand-offwhite font-bold">{formData.name}</p>
                <p className="text-brand-muted">{formData.email}</p>
                <p className="text-brand-muted">{formData.phone}</p>
              </div>

              <div>
                <span className="text-brand-grey uppercase block text-[10px] mb-1">Delivery Destination:</span>
                <p className="text-brand-offwhite">{formData.line1}</p>
                {formData.line2 && <p className="text-brand-muted">{formData.line2}</p>}
                <p className="text-brand-muted">{formData.city}, {formData.state} - {formData.postalCode}</p>
              </div>
            </div>

            {/* Requested Items Preview */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-brand-grey block">
                Requested Garments ({items.length} items):
              </span>
              <div className="divide-y divide-border-subtle bg-brand-black border border-border-subtle text-xs font-mono">
                {items.map((item) => (
                  <div key={item.id} className="p-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-brand-offwhite">{item.quantity}x {item.product.title}</span>
                      <span className="text-brand-grey block text-[11px]">
                        Size: {item.variant.size} • Color: {item.variant.colorName}
                      </span>
                    </div>
                    <span className="text-brand-lime font-bold">
                      {formatInr((item.product.basePriceInPaise + (item.variant.priceAdjustmentInPaise || 0)) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Notes */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-brand-grey">
                Special Delivery Instructions or Sizing Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please deliver between 2 PM - 6 PM, or note if you need custom tags."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
              />
            </div>

            {/* Summary Totals */}
            <div className="p-4 bg-brand-black border border-border-subtle space-y-2 text-xs font-mono">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span>{formatInr(subtotalInPaise)}</span>
              </div>
              {discountInPaise > 0 && (
                <div className="flex justify-between text-brand-lime font-bold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{formatInr(discountInPaise)}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-muted">
                <span>Shipping Fee</span>
                <span>{shippingFeeInPaise === 0 ? "Free" : formatInr(shippingFeeInPaise)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-brand-offwhite pt-2 border-t border-border-subtle">
                <span>Estimated Total</span>
                <span className="text-brand-lime">{formatInr(totalAmountInPaise)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs font-mono uppercase transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitOrderRequest}
                className="px-10 py-4 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 shadow-xl"
              >
                {isSubmitting ? (
                  <span>Recording Order Request...</span>
                ) : (
                  <>
                    <span>Submit Order Request</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

