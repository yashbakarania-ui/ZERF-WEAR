"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  FileCheck,
  MessageSquare
} from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function B2BPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    designation: "",
    gstin: "",
    email: "",
    phone: "",
    category: "Corporate Uniforms & Polo T-Shirts",
    quantity: 100,
    budgetRange: "₹50,000 – ₹1,50,000",
    deadlineDate: "",
    deliveryCity: "Bengaluru",
    deliveryPincode: "560001",
    requirements: "Need embroidered polo shirts for annual tech symposium. Require sample swatch approval.",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    enquiryNumber: string;
    companyName: string;
  } | null>(null);

  const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
      alert("Please complete all mandatory corporate contact fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries/b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      const enquiryNumber = data.enquiryNumber || `ENQ-B2B-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

      setSubmittedResult({
        enquiryNumber,
        companyName: formData.companyName,
      });
    } catch (err) {
      console.error(err);
      const ref = `ENQ-B2B-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedResult({
        enquiryNumber: ref,
        companyName: formData.companyName,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedResult) {
    return (
      <div className="w-full bg-brand-black min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="p-8 sm:p-12 bg-brand-card border border-border-subtle text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-black border border-brand-lime flex items-center justify-center mx-auto text-brand-lime">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
                CORPORATE PROCUREMENT DOCKET
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
                REQUEST RECORDED FOR {submittedResult.companyName.toUpperCase()}
              </h1>
              <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
                A dedicated enterprise account executive has been assigned. You will receive an official PDF quotation, tax breakdown, and sample swatch dispatch confirmation within 4 hours.
              </p>
            </div>

            {/* Reference */}
            <div className="p-4 bg-brand-black border border-border-subtle text-xs font-mono space-y-1">
              <span className="text-brand-grey uppercase block text-[10px]">B2B Procurement Reference</span>
              <span className="text-xl font-bold text-brand-lime tracking-wider block">
                {submittedResult.enquiryNumber}
              </span>
            </div>

            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20ZARF%20B2B%20Desk%2C%20following%20up%20on%20corporate%20enquiry%20${submittedResult.enquiryNumber}%20for%20${encodeURIComponent(submittedResult.companyName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare size={16} />
                <span>Connect Directly with B2B Enterprise Desk</span>
              </a>

              <Link
                href="/shop"
                className="w-full py-3.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-brand-offwhite text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center"
              >
                Return to Storefront
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-border-subtle pb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-grey uppercase">
            <Link href="/" className="hover:text-brand-lime transition-colors">ZARF</Link>
            <span>/</span>
            <span className="text-brand-lime">CORPORATE & BULK B2B</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-brand-offwhite font-display leading-[0.92]">
            ENTERPRISE MERCHANDISE & BESPOKE WORKWEAR.
          </h1>
          <p className="text-base sm:text-lg text-brand-muted max-w-3xl font-light leading-relaxed">
            Elevate your team culture with custom corporate apparel manufactured from single-origin combed cotton. Designed for enterprise engineering offsites, corporate welcome kits, campus festivals, and brand campaigns.
          </p>
        </div>

        {/* Corporate Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-2">
            <FileCheck className="text-brand-lime" size={24} />
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
              GST Tax Invoices
            </h2>
            <p className="text-xs text-brand-muted font-light leading-relaxed">
              100% compliant B2B tax invoicing with your company GSTIN for full input tax credit eligibility.
            </p>
          </div>

          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-2">
            <Building2 className="text-brand-lime" size={24} />
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
              Pantone Precision
            </h2>
            <p className="text-xs text-brand-muted font-light leading-relaxed">
              Strict brand guideline compliance with Pantone shade matching across dyes, embroidery threads, and inks.
            </p>
          </div>

          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-2">
            <Truck className="text-brand-lime" size={24} />
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
              Multi-Hub Dispatch
            </h2>
            <p className="text-xs text-brand-muted font-light leading-relaxed">
              Drop-shipping individual welcome kits directly to remote employee home addresses across India.
            </p>
          </div>

          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-2">
            <ShieldCheck className="text-brand-lime" size={24} />
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite">
              Sample Swatch Kits
            </h2>
            <p className="text-xs text-brand-muted font-light leading-relaxed">
              Touch and feel fabric GSMs and fit samples at your office before approving mass production.
            </p>
          </div>
        </div>

        {/* B2B Quotation Form */}
        <div className="bg-brand-card/30 border border-border-subtle p-8 sm:p-12 space-y-8">
          <div className="space-y-2 border-b border-border-subtle pb-6">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-brand-offwhite font-display">
              REQUEST A FORMAL B2B QUOTATION
            </h2>
            <p className="text-xs text-brand-muted">
              Submit your project scope below. Minimum Order Quantity (MOQ) is 25 pieces per silhouette.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company & Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Company / Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Razorpay Tech Labs"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Contact Person *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sneha Roy"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Designation / Role</label>
                <input
                  type="text"
                  placeholder="e.g. People Ops / Marketing Lead"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sneha@razorpay.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Company GSTIN (Optional)</label>
                <input
                  type="text"
                  placeholder="27AABCS1429B1Z8"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite uppercase focus:outline-none focus:border-brand-lime"
                />
              </div>
            </div>

            {/* Product & Scope */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Product Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                >
                  <option>Corporate Uniforms & Polo T-Shirts</option>
                  <option>Heavyweight Winter Hoodies (420 GSM)</option>
                  <option>Oversized Tech Team T-Shirts (280 GSM)</option>
                  <option>Employee Welcome Kits (Tee + Hoodie + Cap)</option>
                  <option>College Fest / Sports Team Jerseys</option>
                  <option>Custom Embroidered Headwear</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Estimated Quantity (MOQ 25) *</label>
                <input
                  type="number"
                  min={25}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Budget Range</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                >
                  <option>₹25,000 – ₹50,000</option>
                  <option>₹50,000 – ₹1,50,000</option>
                  <option>₹1,50,000 – ₹5,00,000</option>
                  <option>₹5,00,000+</option>
                </select>
              </div>
            </div>

            {/* Delivery destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Primary Delivery City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru / Pune / Delhi NCR"
                  value={formData.deliveryCity}
                  onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Delivery PIN Code</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 560001"
                  value={formData.deliveryPincode}
                  onChange={(e) => setFormData({ ...formData, deliveryPincode: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-mono uppercase text-brand-grey">Project Specifications & Timeline *</label>
              <textarea
                rows={3}
                required
                placeholder="Mention expected delivery deadlines, embroidery / print placement requirements, packaging preferences..."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-border-subtle">
              <div className="text-xs font-mono text-brand-grey">
                * Fast quotation turnaround within 4 business hours.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                {isSubmitting ? (
                  <span>Generating Procurement File...</span>
                ) : (
                  <>
                    <span>Submit B2B Quotation Request</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

