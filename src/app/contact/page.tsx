"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, MapPin, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Retail Order Enquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-brand-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-border-subtle pb-8 space-y-3">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ DIRECT ACCESS ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            CONNECT WITH ZARF STUDIOS
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted max-w-2xl font-light">
            Have questions regarding wholesale bulk orders, custom printing specifications, or an active order request? Connect with our team directly.
          </p>
        </div>

        {/* Contact Grid: Details vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Hub */}
          <div className="lg:col-span-5 space-y-8">
            {/* WhatsApp Highlight Box */}
            <div className="p-6 bg-brand-card border border-brand-lime/30 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase text-brand-lime">
                  Fastest Response Channel
                </span>
              </div>
              <h3 className="text-lg font-bold uppercase text-brand-offwhite font-display">
                WHATSAPP CONCIERGE DESK
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Direct one-on-one line with our fulfillment and customization specialists. Typical response within 15–30 minutes during studio hours (10 AM - 7 PM IST).
              </p>
              <a
                href={`https://wa.me/${cleanPhone}?text=Hello%20ZARF%20Team%2C%20I%20would%20like%20to%20connect.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand-lime text-brand-black text-xs font-black uppercase tracking-wider hover:bg-brand-limeHover transition-colors shadow-md"
              >
                <MessageSquare size={16} />
                <span>Message +91 98765 43210</span>
              </a>
            </div>

            {/* Channels Directory */}
            <div className="space-y-6 text-xs font-mono">
              <div className="flex items-start gap-4 p-4 border border-border-subtle bg-brand-card/40">
                <Mail className="text-brand-lime flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="text-brand-grey block text-[10px] uppercase">Official Email</span>
                  <a href="mailto:support@zarfwear.in" className="text-brand-offwhite font-bold hover:text-brand-lime transition-colors">
                    support@zarfwear.in
                  </a>
                  <span className="text-[11px] text-brand-muted block mt-0.5">Corporate & press: b2b@zarfwear.in</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-border-subtle bg-brand-card/40">
                <Phone className="text-brand-lime flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="text-brand-grey block text-[10px] uppercase">Phone Helpline</span>
                  <a href="tel:+918000000000" className="text-brand-offwhite font-bold hover:text-brand-lime transition-colors">
                    +91 80000 00000
                  </a>
                  <span className="text-[11px] text-brand-muted block mt-0.5">Mon–Sat, 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-border-subtle bg-brand-card/40">
                <MapPin className="text-brand-lime flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="text-brand-grey block text-[10px] uppercase">Studio & Dispatch Hub</span>
                  <p className="text-brand-offwhite leading-relaxed font-sans text-xs">
                    ZARF Studios, Industrial Textile District, Lower Parel, Mumbai, Maharashtra 400013, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-brand-card/40 border border-border-subtle p-8 md:p-10 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-tight text-brand-offwhite font-display">
              LEAVE A DIRECT MESSAGE
            </h2>

            {submitted ? (
              <div className="p-8 bg-brand-black border border-brand-lime text-center space-y-3">
                <CheckCircle2 size={36} className="text-brand-lime mx-auto" />
                <h3 className="text-base font-bold uppercase text-brand-offwhite font-display">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-brand-muted max-w-sm mx-auto">
                  Thank you for writing to ZARF Studios. An apparel consultant will review your query and respond via email or WhatsApp within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-brand-grey">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kabir Mehra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-brand-grey">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. kabir@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-brand-grey">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-brand-grey">Query Category</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                    >
                      <option>Retail Order Enquiry</option>
                      <option>Custom Apparel & Printing</option>
                      <option>Corporate B2B Procurement</option>
                      <option>Sample Swatch Request</option>
                      <option>General Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-brand-grey">Message & Specifications *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details on quantities, desired silhouette, turnaround deadline, or any specific fabric questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Dispatch Message</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Studio FAQ Strip */}
        <div className="border-t border-border-subtle pt-12 space-y-6">
          <h2 className="text-lg font-bold uppercase tracking-wider text-brand-offwhite font-display">
            COMMERCIAL & ORDER FAQS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed font-light text-brand-muted">
            <div className="p-4 bg-brand-card/30 border border-border-subtle space-y-2">
              <strong className="text-brand-offwhite font-mono uppercase block text-xs">
                How does the Order Request work?
              </strong>
              <p>
                Because V1 focuses on bespoke stock verification and quotation accuracy, submitting a cart creates an official Order Request. Our concierge confirms item reservation and sends a payment link with exact dispatch timelines.
              </p>
            </div>

            <div className="p-4 bg-brand-card/30 border border-border-subtle space-y-2">
              <strong className="text-brand-offwhite font-mono uppercase block text-xs">
                What is the turnaround time?
              </strong>
              <p>
                Plain ready-made blanks dispatch within 24–48 hours. Custom printed and embroidered orders typically complete production in 4 to 7 business days following mockup approval.
              </p>
            </div>

            <div className="p-4 bg-brand-card/30 border border-border-subtle space-y-2">
              <strong className="text-brand-offwhite font-mono uppercase block text-xs">
                Do you provide fabric samples?
              </strong>
              <p>
                Yes. For B2B corporate and bulk custom projects, we dispatch physical swatch books and sample blank garments prior to starting mass production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

