"use client";

import React, { useState } from "react";
import { MessageSquare, ExternalLink, X, Check, Building2, User } from "lucide-react";
import { formatInr } from "@/lib/currency";

interface AdminEnquiry {
  id: string;
  enquiryNumber: string;
  type: "CUSTOM" | "B2B";
  customerName: string;
  companyName?: string;
  phone: string;
  email: string;
  category: string;
  quantity: number;
  specs: string;
  status: string;
  date: string;
  quotedAmountInPaise?: number;
  internalNote?: string;
}

const INITIAL_ENQUIRIES: AdminEnquiry[] = [
  {
    id: "enq_1",
    enquiryNumber: "ENQ-CUST-20261111-3019",
    type: "CUSTOM",
    customerName: "Vikram Patel",
    companyName: "Nomad Creative Studio",
    phone: "+919811122233",
    email: "vikram@designstudio.in",
    category: "420 GSM Box-Fit Raw Hoodie",
    quantity: 35,
    specs: "High-Density Puff Print on front chest + screen print on back. Sizes: M:15, L:15, XL:5. Colors: Bone White.",
    status: "QUOTED",
    date: "Nov 11, 2026",
    quotedAmountInPaise: 4200000,
    internalNote: "Sample mockup sent via WhatsApp. Client approving Pantone shade.",
  },
  {
    id: "enq_2",
    enquiryNumber: "ENQ-B2B-20261111-9120",
    type: "B2B",
    customerName: "Sneha Roy",
    companyName: "Razorpay Tech Labs",
    phone: "+919822233344",
    email: "sneha@company.com",
    category: "Corporate Uniforms & Polo Tees",
    quantity: 150,
    specs: "Embroidered chest logo for 150 polo t-shirts in deep navy. Delivery in Bengaluru. Needs GST invoice.",
    status: "NEW",
    date: "Nov 11, 2026",
  },
  {
    id: "enq_3",
    enquiryNumber: "ENQ-CUST-20261110-5021",
    type: "CUSTOM",
    customerName: "Devansh Nair",
    phone: "+919833344455",
    email: "devansh@artcollective.org",
    category: "280 GSM Heavyweight Oversized Tee",
    quantity: 50,
    specs: "DTG print front center. High-resolution art vector provided.",
    status: "IN_REVIEW",
    date: "Nov 10, 2026",
  },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>(INITIAL_ENQUIRIES);
  const [activeTab, setActiveTab] = useState<"ALL" | "CUSTOM" | "B2B">("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiry | null>(null);

  // Modal editing
  const [statusInput, setStatusInput] = useState("");
  const [quoteInput, setQuoteInput] = useState<number | "">("");
  const [noteInput, setNoteInput] = useState("");

  const handleOpenModal = (enq: AdminEnquiry) => {
    setSelectedEnquiry(enq);
    setStatusInput(enq.status);
    setQuoteInput(enq.quotedAmountInPaise ? enq.quotedAmountInPaise / 100 : "");
    setNoteInput(enq.internalNote || "");
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id === selectedEnquiry.id) {
          return {
            ...e,
            status: statusInput,
            quotedAmountInPaise: quoteInput !== "" ? Number(quoteInput) * 100 : undefined,
            internalNote: noteInput,
          };
        }
        return e;
      })
    );

    setSelectedEnquiry(null);
  };

  const filtered = enquiries.filter((e) => {
    if (activeTab === "ALL") return true;
    return e.type === activeTab;
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ BESPOKE & WHOLESALE LEADS ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            CUSTOM & B2B ENQUIRY INBOX
          </h1>
          <p className="text-xs text-brand-muted mt-1 font-mono">
            Manage bespoke printing requests, corporate procurements, sample approvals, and WhatsApp communication.
          </p>
        </div>
        <div className="text-xs font-mono text-brand-grey">
          TOTAL INBOX: <strong className="text-brand-offwhite">{enquiries.length}</strong>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-subtle gap-6 text-xs font-mono uppercase">
        <button
          onClick={() => setActiveTab("ALL")}
          className={`pb-3 transition-colors ${
            activeTab === "ALL"
              ? "text-brand-lime border-b-2 border-brand-lime font-bold"
              : "text-brand-muted hover:text-brand-offwhite"
          }`}
        >
          All Enquiries ({enquiries.length})
        </button>
        <button
          onClick={() => setActiveTab("CUSTOM")}
          className={`pb-3 transition-colors ${
            activeTab === "CUSTOM"
              ? "text-brand-lime border-b-2 border-brand-lime font-bold"
              : "text-brand-muted hover:text-brand-offwhite"
          }`}
        >
          Custom Apparel ({enquiries.filter((e) => e.type === "CUSTOM").length})
        </button>
        <button
          onClick={() => setActiveTab("B2B")}
          className={`pb-3 transition-colors ${
            activeTab === "B2B"
              ? "text-brand-lime border-b-2 border-brand-lime font-bold"
              : "text-brand-muted hover:text-brand-offwhite"
          }`}
        >
          Corporate B2B ({enquiries.filter((e) => e.type === "B2B").length})
        </button>
      </div>

      {/* Enquiries Grid / List */}
      <div className="space-y-4">
        {filtered.map((enq) => (
          <div key={enq.id} className="p-6 bg-brand-card/30 border border-border-subtle space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono text-brand-offwhite">
                    {enq.enquiryNumber}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-brand-black border border-border-subtle text-brand-lime">
                    {enq.type === "B2B" ? "CORPORATE B2B" : "CUSTOM PRINT"}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-brand-card text-brand-offwhite">
                    {enq.status}
                  </span>
                </div>
                <span className="text-xs font-mono text-brand-grey">
                  Received on {enq.date}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${enq.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(enq.customerName)}%2C%20regarding%20your%20ZARF%20Wear%20custom%20enquiry%20${enq.enquiryNumber}...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-offwhite hover:text-brand-lime transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare size={13} className="text-brand-lime" />
                  <span>WhatsApp Prospect</span>
                </a>

                <button
                  onClick={() => handleOpenModal(enq)}
                  className="px-4 py-1.5 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-mono font-bold uppercase transition-colors"
                >
                  Quote & Review
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-brand-grey uppercase block text-[10px]">Client:</span>
                <p className="text-brand-offwhite font-bold">{enq.customerName}</p>
                {enq.companyName && <p className="text-brand-lime">{enq.companyName}</p>}
                <p className="text-brand-muted">{enq.email} • {enq.phone}</p>
              </div>

              <div>
                <span className="text-brand-grey uppercase block text-[10px]">Apparel Scope:</span>
                <p className="text-brand-offwhite font-bold">{enq.quantity} pcs • {enq.category}</p>
                <p className="text-brand-muted font-sans text-xs mt-0.5">{enq.specs}</p>
              </div>

              <div>
                <span className="text-brand-grey uppercase block text-[10px]">Commercial Quotation:</span>
                <p className="text-base font-bold text-brand-lime">
                  {enq.quotedAmountInPaise ? formatInr(enq.quotedAmountInPaise) : "Pending Quote"}
                </p>
                {enq.internalNote && (
                  <p className="text-brand-grey text-[11px] pt-1">
                    Internal: {enq.internalNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUOTE & STATUS MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#141414] border border-border-subtle p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-grey block">
                  Enquiry Docket
                </span>
                <h3 className="text-base font-bold font-mono text-brand-lime">
                  {selectedEnquiry.enquiryNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-brand-grey hover:text-brand-offwhite"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Pipeline Status</label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime uppercase"
                >
                  <option value="NEW">New</option>
                  <option value="IN_REVIEW">In Review</option>
                  <option value="QUOTED">Quoted</option>
                  <option value="SAMPLE_APPROVED">Sample Approved</option>
                  <option value="CONVERTED">Converted to Production</option>
                  <option value="REJECTED">Declined / Closed</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Quotation Total (₹ INR)</label>
                <input
                  type="number"
                  placeholder="e.g. 42000"
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Internal Staff Note</label>
                <textarea
                  rows={3}
                  placeholder="Record customer preferences, fabric swatch dispatch date, or Pantone codes..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-lime hover:bg-brand-limeHover text-brand-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

