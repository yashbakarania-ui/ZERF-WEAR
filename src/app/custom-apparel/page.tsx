"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Layers, 
  Flame, 
  Scissors, 
  ArrowRight, 
  Upload, 
  MessageSquare, 
  CheckCircle2, 
  ArrowLeft,
  FileText
} from "lucide-react";
import { buildCustomEnquiryWhatsAppUrl, DEFAULT_WHATSAPP_NUMBER } from "@/lib/whatsapp";

const SILHOUETTES = [
  { id: "oversized-tee", name: "280 GSM Oversized T-Shirt", gsm: "280 GSM", moq: "10 pcs" },
  { id: "box-hoodie", name: "420 GSM Box-Fit Raw Hoodie", gsm: "420 GSM", moq: "10 pcs" },
  { id: "mercerized-polo", name: "240 GSM Mercerized Pique Polo", gsm: "240 GSM", moq: "15 pcs" },
  { id: "loopback-crewneck", name: "360 GSM Loopback Crewneck", gsm: "360 GSM", moq: "10 pcs" },
  { id: "twill-cap", name: "Washed Heavy Twill 6-Panel Cap", gsm: "380 GSM", moq: "20 pcs" },
  { id: "corporate-uniform", name: "Corporate Team Uniform Suite", gsm: "Custom", moq: "25 pcs" },
];

const PRINT_TECHNIQUES = [
  { id: "puff", name: "High-Density 3D Puff Print", desc: "Raised tactile emboss texture" },
  { id: "screen", name: "Discharge & Water-based Screen Print", desc: "Soft breathable hand-feel" },
  { id: "dtg", name: "Direct-to-Garment (DTG)", desc: "Full-color gradients & detailed artwork" },
  { id: "embroidery", name: "Precision Tonal Embroidery", desc: "Dense luxury stitch work" },
];

export default function CustomApparelPage() {
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0].name);
  const [selectedTechnique, setSelectedTechnique] = useState(PRINT_TECHNIQUES[0].name);
  const [quantity, setQuantity] = useState(25);
  const [sizeBreakdown, setSizeBreakdown] = useState("S: 5, M: 10, L: 8, XL: 2");
  const [colorPreferences, setColorPreferences] = useState("Onyx Black & Bone White");
  const [printPlacement, setPrintPlacement] = useState("Front Chest (4 inch) + Oversized Back Print (12 inch)");
  const [notes, setNotes] = useState("");
  const [artworkName, setArtworkName] = useState<string | null>(null);

  // Contact
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [organization, setOrganization] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    enquiryNumber: string;
    whatsAppUrl: string;
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      setArtworkName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) {
      alert("Please provide your contact name, email, and WhatsApp number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName,
        customerPhone,
        customerEmail,
        organization,
        apparelCategory: selectedSilhouette,
        estimatedQty: quantity,
        printMethod: selectedTechnique,
        sizeBreakdown,
        colorPreferences,
        notes: `Placement: ${printPlacement}\nNotes: ${notes}\nAttachment: ${artworkName || "None"}`,
      };

      const res = await fetch("/api/enquiries/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const enquiryNumber = data.enquiryNumber || `ENQ-CUST-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

      const whatsAppUrl = buildCustomEnquiryWhatsAppUrl({
        enquiryNumber,
        customerName,
        apparelCategory: selectedSilhouette,
        estimatedQty: quantity,
        printMethod: selectedTechnique,
        sizeBreakdown,
        colorPreferences,
        notes: `Placement: ${printPlacement}. ${notes}`,
      });

      setSubmittedResult({
        enquiryNumber,
        whatsAppUrl,
      });
    } catch (err) {
      console.error(err);
      const ref = `ENQ-CUST-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const whatsAppUrl = buildCustomEnquiryWhatsAppUrl({
        enquiryNumber: ref,
        customerName,
        apparelCategory: selectedSilhouette,
        estimatedQty: quantity,
        printMethod: selectedTechnique,
        sizeBreakdown,
        colorPreferences,
        notes: `Placement: ${printPlacement}. ${notes}`,
      });

      setSubmittedResult({
        enquiryNumber: ref,
        whatsAppUrl,
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
                BESPOKE ENQUIRY RECORDED
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
                CUSTOM PROJECT RECEIVED
              </h1>
              <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
                Your custom apparel specifications have been lodged in our production review queue.
              </p>
            </div>

            {/* Reference */}
            <div className="p-4 bg-brand-black border border-border-subtle text-xs font-mono space-y-1">
              <span className="text-brand-grey uppercase block text-[10px]">Enquiry Reference</span>
              <span className="text-lg font-bold text-brand-lime tracking-wider block">
                {submittedResult.enquiryNumber}
              </span>
              <span className="text-brand-muted block text-[11px] pt-1">
                {quantity}x {selectedSilhouette} ({selectedTechnique})
              </span>
            </div>

            {/* Instant WhatsApp Action */}
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <a
                href={submittedResult.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare size={16} />
                <span>Continue on WhatsApp with Pre-filled Specs</span>
              </a>

              <Link
                href="/shop"
                className="w-full py-3.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-brand-offwhite text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center"
              >
                Return to Shop All Pieces
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-black min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Header */}
        <div className="border-b border-border-subtle pb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-grey uppercase">
            <Link href="/" className="hover:text-brand-lime transition-colors">ZARF</Link>
            <span>/</span>
            <span className="text-brand-lime">CUSTOM APPAREL WIZARD</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            BESPOKE APPAREL ENQUIRY
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted max-w-2xl font-light">
            Manufacture high-density printed or embroidered pieces for your brand, team, or festival on our signature 240–420 GSM blanks.
          </p>
        </div>

        {/* Interactive Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* STEP 1: SILHOUETTE SELECTOR */}
          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-4">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite font-display">
                1. SELECT GARMENT SILHOUETTE
              </h2>
              <span className="text-[11px] font-mono text-brand-lime">
                Proprietary Heavyweight Patterns
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SILHOUETTES.map((s) => {
                const isSelected = selectedSilhouette === s.name;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSilhouette(s.name)}
                    className={`p-4 text-left border transition-all ${
                      isSelected
                        ? "bg-brand-black border-brand-lime ring-1 ring-brand-lime"
                        : "bg-brand-card/80 border-border-subtle hover:border-brand-grey"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono bg-brand-black border border-border-subtle px-1.5 py-0.5 text-brand-lime">
                        {s.gsm}
                      </span>
                      <span className="text-[10px] font-mono text-brand-grey">
                        Min: {s.moq}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-brand-offwhite">
                      {s.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: PRINT TECHNIQUE */}
          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-4">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite font-display">
                2. DECORATION & PRINTING TECHNIQUE
              </h2>
              <span className="text-[11px] font-mono text-brand-grey">
                Pantone Matching Included
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRINT_TECHNIQUES.map((pt) => {
                const isSelected = selectedTechnique === pt.name;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setSelectedTechnique(pt.name)}
                    className={`p-4 text-left border transition-all ${
                      isSelected
                        ? "bg-brand-black border-brand-lime ring-1 ring-brand-lime"
                        : "bg-brand-card/80 border-border-subtle hover:border-brand-grey"
                    }`}
                  >
                    <div className="text-xs font-bold text-brand-offwhite mb-1">
                      {pt.name}
                    </div>
                    <div className="text-[11px] text-brand-muted font-light">
                      {pt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: QUANTITIES, SIZES & COLORS */}
          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite font-display border-b border-border-subtle pb-3">
              3. QUANTITY, SIZES & FABRIC COLORWAYS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Estimated Total Qty *</label>
                <input
                  type="number"
                  min={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Size Breakdown</label>
                <input
                  type="text"
                  placeholder="e.g. S: 5, M: 10, L: 8, XL: 2"
                  value={sizeBreakdown}
                  onChange={(e) => setSizeBreakdown(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-mono uppercase text-brand-grey">Preferred Fabric Colorways</label>
              <input
                type="text"
                placeholder="e.g. Onyx Black, Off-White, Sage Green, or custom Pantone shade"
                value={colorPreferences}
                onChange={(e) => setColorPreferences(e.target.value)}
                className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
              />
            </div>
          </div>

          {/* STEP 4: ARTWORK & PLACEMENT */}
          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite font-display border-b border-border-subtle pb-3">
              4. ARTWORK MOCKUP & PLACEMENT NOTES
            </h2>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-brand-grey">Print Placements & Dimensions</label>
              <input
                type="text"
                value={printPlacement}
                onChange={(e) => setPrintPlacement(e.target.value)}
                className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
              />
            </div>

            {/* Artwork File Uploader */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-mono uppercase text-brand-grey">
                Attach Artwork or Reference Mockup (PNG, JPG, PDF - Max 10MB)
              </label>
              <div className="border border-dashed border-border-strong hover:border-brand-lime transition-colors p-6 text-center bg-brand-black/60 relative cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload size={24} className="text-brand-lime" />
                  <span className="text-xs font-mono text-brand-offwhite">
                    {artworkName ? `Selected File: ${artworkName}` : "Click or drag artwork reference file here"}
                  </span>
                  <span className="text-[10px] text-brand-grey font-mono">
                    Vector AI/EPS files can also be shared directly via WhatsApp.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-mono uppercase text-brand-grey">Additional Project Notes</label>
              <textarea
                rows={3}
                placeholder="Provide event date, packaging requirements, custom neck tags, or any other detail..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
              />
            </div>
          </div>

          {/* STEP 5: CONTACT INFORMATION */}
          <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-offwhite font-display border-b border-border-subtle pb-3">
              5. CONTACT & DISPATCH RECIPIENT
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Patel"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">WhatsApp Phone (India) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@studio.in"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-brand-grey">Brand / Organization (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Nomad Creative Studio"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-xs font-mono text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>
            </div>
          </div>

          {/* Submission Action */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
            <div className="text-xs font-mono text-brand-grey">
              * A ZARF apparel consultant reviews all requests and replies within 1 hour.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-4 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
              {isSubmitting ? (
                <span>Generating Project Specification...</span>
              ) : (
                <>
                  <span>Submit Custom Enquiry</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

