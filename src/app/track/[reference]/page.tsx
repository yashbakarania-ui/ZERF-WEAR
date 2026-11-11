"use client";

import React, { use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Truck, 
  PackageCheck, 
  AlertCircle,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { formatInr } from "@/lib/currency";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/whatsapp";

interface TrackDetailPageProps {
  params: Promise<{ reference: string }>;
}

const STAGES = [
  { key: "ORDER_REQUESTED", label: "Requested", desc: "Order request lodged in system" },
  { key: "UNDER_REVIEW", label: "Under Review", desc: "Stock & specifications checked" },
  { key: "QUOTATION_SENT", label: "Quotation Sent", desc: "Invoice / quote provided to customer" },
  { key: "CONFIRMED", label: "Confirmed", desc: "Customer approved and payment verified" },
  { key: "PROCESSING", label: "Processing", desc: "Garments picked from blank inventory" },
  { key: "IN_PRODUCTION", label: "In Production", desc: "Batch printing or embroidery active" },
  { key: "SHIPPED", label: "Shipped", desc: "Dispatched via courier with AWB" },
  { key: "DELIVERED", label: "Delivered", desc: "Successfully received by customer" },
];

export default function TrackDetailPage({ params }: TrackDetailPageProps) {
  const resolvedParams = use(params);
  const refCode = resolvedParams.reference.toUpperCase();
  const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, "");

  // Demo status simulation if tracking a reference
  const currentStageIndex = 5; // e.g. "IN_PRODUCTION"
  const currentStage = STAGES[currentStageIndex];

  const timelineLogs = [
    {
      status: "ORDER_REQUESTED",
      date: "Nov 11, 2026 • 10:15 AM",
      comment: "Order request submitted online via Pan-India portal.",
    },
    {
      status: "UNDER_REVIEW",
      date: "Nov 11, 2026 • 10:45 AM",
      comment: "Inventory reservation confirmed for 280 GSM blanks.",
    },
    {
      status: "CONFIRMED",
      date: "Nov 11, 2026 • 11:30 AM",
      comment: "Customer confirmed specs via WhatsApp concierge.",
    },
    {
      status: "IN_PRODUCTION",
      date: "Nov 11, 2026 • 02:00 PM",
      comment: "Garments queued on screen print carousel #2.",
    },
  ];

  return (
    <div className="w-full bg-brand-black min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/track"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-brand-grey hover:text-brand-lime transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Search Another Order</span>
        </Link>

        {/* Reference Code Card */}
        <div className="bg-brand-card/40 border border-border-subtle p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-brand-grey block">
                Official Order Reference
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-brand-lime">
                {refCode}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-offwhite">
                Status: {currentStage.label}
              </span>
            </div>
          </div>

          {/* Visual Step Progress Bar */}
          <div className="pt-6 pb-2">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {STAGES.map((s, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={s.key} className="space-y-1.5 text-center">
                    <div
                      className={`h-2 rounded-none transition-all ${
                        isCurrent
                          ? "bg-brand-lime"
                          : isPassed
                          ? "bg-brand-offwhite"
                          : "bg-border-subtle"
                      }`}
                    />
                    <span
                      className={`text-[9px] font-mono uppercase block line-clamp-1 ${
                        isCurrent
                          ? "text-brand-lime font-bold"
                          : isPassed
                          ? "text-brand-offwhite"
                          : "text-brand-grey"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Courier Dispatch Information (if dispatched) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-brand-card/30 border border-border-subtle space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-lime uppercase">
              <Truck size={16} />
              <span>Logistics & Dispatch Schedule</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-brand-muted">
                <span>Courier Partner:</span>
                <span className="text-brand-offwhite font-bold">Bluedart Express Surface</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Tracking AWB:</span>
                <span className="text-brand-lime font-bold">AWB-781920491</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Estimated Arrival:</span>
                <span className="text-brand-offwhite font-bold">3–5 Business Days</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-brand-card/30 border border-border-subtle space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-lime uppercase">
                <MessageSquare size={16} />
                <span>Concierge Support</span>
              </div>
              <p className="text-xs text-brand-muted mt-2 font-light leading-relaxed">
                Need to update delivery address or ask a sizing question before dispatch?
              </p>
            </div>
            <a
              href={`https://wa.me/${cleanPhone}?text=Hi%20ZARF%20Team%2C%20inquiring%20about%20order%20status%20${refCode}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-offwhite hover:text-brand-lime transition-colors"
            >
              <span>WhatsApp Studio Helpline</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Audit Timeline Logs */}
        <div className="bg-brand-card/30 border border-border-subtle p-8 space-y-6">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-brand-offwhite border-b border-border-subtle pb-3">
            STATUS AUDIT TIMELINE
          </h2>

          <div className="space-y-6">
            {timelineLogs.map((log, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-brand-black border border-brand-lime flex items-center justify-center text-brand-lime flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={13} />
                </div>
                <div className="space-y-0.5 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-brand-offwhite uppercase tracking-wider">
                      {log.status.replace(/_/g, " ")}
                    </span>
                    <span className="text-[11px] text-brand-grey">{log.date}</span>
                  </div>
                  <p className="text-brand-muted font-sans text-xs pt-0.5">{log.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Snapshot of Items */}
        <div className="bg-brand-card/30 border border-border-subtle p-8 space-y-4">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-brand-offwhite border-b border-border-subtle pb-3">
            ORDER SPECIFICATIONS SNAPSHOT
          </h2>
          <div className="divide-y divide-border-subtle text-xs font-mono">
            <div className="py-3 flex justify-between items-center">
              <div>
                <span className="font-bold text-brand-offwhite">2x ZARF 280 GSM Heavyweight Oversized Tee</span>
                <span className="text-brand-grey block text-[11px]">Size: M • Color: Onyx Black</span>
              </div>
              <span className="font-bold text-brand-lime">{formatInr(299800)}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <div>
                <span className="font-bold text-brand-offwhite">1x ZARF Washed Heavy Twill Dad Cap</span>
                <span className="text-brand-grey block text-[11px]">Size: OS • Color: Washed Black</span>
              </div>
              <span className="font-bold text-brand-lime">{formatInr(89900)}</span>
            </div>
            <div className="pt-3 flex justify-between font-bold text-sm text-brand-offwhite">
              <span>Total Pipeline Amount</span>
              <span className="text-brand-lime">{formatInr(389700)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

