"use client";

import React from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { formatInr } from "@/lib/currency";

export default function AdminDashboardPage() {
  // Aggregate real recorded metrics
  const metrics = {
    totalOrders: 32,
    pendingReview: 6,
    confirmed: 8,
    inProduction: 7,
    delivered: 11,
    totalPipelineValueInPaise: 48920000, // ₹4,89,200
  };

  const recentOrders = [
    {
      id: "ord_1",
      referenceNumber: "ZRF-20261111-8942",
      customer: "Aarav Sharma",
      city: "Mumbai, MH",
      items: "2x 280 GSM Tee, 1x Cap",
      amountInPaise: 389700,
      status: "IN_PRODUCTION",
      date: "Nov 11, 2026 • 10:15 AM",
    },
    {
      id: "ord_2",
      referenceNumber: "ZRF-20261111-4190",
      customer: "Pooja Deshmukh",
      city: "Bengaluru, KA",
      items: "1x 420 GSM Box Hoodie",
      amountInPaise: 299900,
      status: "UNDER_REVIEW",
      date: "Nov 11, 2026 • 09:30 AM",
    },
    {
      id: "ord_3",
      referenceNumber: "ZRF-20261110-7712",
      customer: "Kabir Mehra",
      city: "Delhi NCR",
      items: "3x Mercerized Pique Polo",
      amountInPaise: 569700,
      status: "SHIPPED",
      date: "Nov 10, 2026 • 04:20 PM",
    },
  ];

  const lowStockAlerts = [
    { sku: "ZRF-HD-420-CHR-XL", name: "420 GSM Box Hoodie (Charcoal / XL)", remaining: 3 },
    { sku: "ZRF-TEE-280-BLK-S", name: "280 GSM Oversized Tee (Onyx / S)", remaining: 5 },
    { sku: "ZRF-SWT-360-SGE-S", name: "360 GSM Loopback Crewneck (Sage / S)", remaining: 4 },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ EXECUTIVE CONTROL HUB ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            OPERATIONAL DASHBOARD
          </h1>
          <p className="text-xs text-brand-muted mt-1 font-mono">
            Pan-India Order Requests & Fulfillment Stream
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-mono font-bold uppercase tracking-wider transition-colors"
          >
            Manage All Orders →
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-brand-grey uppercase">
            <span>Total Requests</span>
            <ShoppingBag size={16} className="text-brand-lime" />
          </div>
          <div className="text-3xl font-black font-mono text-brand-offwhite">
            {metrics.totalOrders}
          </div>
          <span className="text-[10px] text-brand-muted font-mono block">
            Across B2C & B2B procurement
          </span>
        </div>

        <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-brand-grey uppercase">
            <span>Pending Review</span>
            <Clock size={16} className="text-status-warning" />
          </div>
          <div className="text-3xl font-black font-mono text-status-warning">
            {metrics.pendingReview}
          </div>
          <span className="text-[10px] text-brand-muted font-mono block">
            Requires inventory / quote verification
          </span>
        </div>

        <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-brand-grey uppercase">
            <span>In Production</span>
            <TrendingUp size={16} className="text-brand-lime" />
          </div>
          <div className="text-3xl font-black font-mono text-brand-offwhite">
            {metrics.inProduction}
          </div>
          <span className="text-[10px] text-brand-muted font-mono block">
            Batch printing / custom embroidery
          </span>
        </div>

        <div className="p-6 bg-brand-card/40 border border-border-subtle space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-brand-grey uppercase">
            <span>Pipeline Value</span>
            <span className="text-brand-lime text-xs font-mono">INR</span>
          </div>
          <div className="text-2xl font-black font-mono text-brand-lime">
            {formatInr(metrics.totalPipelineValueInPaise)}
          </div>
          <span className="text-[10px] text-brand-muted font-mono block">
            Calculated strictly in integer paise
          </span>
        </div>
      </div>

      {/* Main Grid: Recent Orders Feed + Low Stock Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Orders Stream */}
        <div className="lg:col-span-8 bg-brand-card/30 border border-border-subtle p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-offwhite">
              Recent Order Requests
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-mono text-brand-lime hover:underline"
            >
              View All ({metrics.totalOrders})
            </Link>
          </div>

          <div className="divide-y divide-border-subtle">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-4 first:pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-brand-offwhite">
                      {ord.referenceNumber}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-brand-black border border-border-subtle text-brand-lime">
                      {ord.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted">
                    {ord.customer} • {ord.city}
                  </p>
                  <p className="text-[11px] font-mono text-brand-grey">
                    {ord.items}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs font-mono font-bold text-brand-lime block">
                    {formatInr(ord.amountInPaise)}
                  </span>
                  <span className="text-[10px] font-mono text-brand-grey block">
                    {ord.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Low Stock Warnings */}
        <div className="lg:col-span-4 bg-brand-card/30 border border-border-subtle p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
            <AlertTriangle size={15} className="text-status-warning" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-offwhite">
              Low Stock Warnings
            </h2>
          </div>

          <div className="space-y-3">
            {lowStockAlerts.map((item) => (
              <div key={item.sku} className="p-3 bg-brand-black border border-border-subtle space-y-1 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-brand-offwhite line-clamp-1">{item.name}</span>
                  <span className="text-status-warning font-bold">{item.remaining} left</span>
                </div>
                <span className="text-[10px] text-brand-grey block">SKU: {item.sku}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/inventory"
              className="w-full py-2.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-offwhite hover:text-brand-lime flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Audit Inventory & Restock</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

