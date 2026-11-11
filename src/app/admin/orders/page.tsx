"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  Truck, 
  MessageSquare, 
  X,
  Clock,
  ArrowRight
} from "lucide-react";
import { formatInr } from "@/lib/currency";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/whatsapp";

interface AdminOrder {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryCity: string;
  deliveryState: string;
  itemsSummary: string;
  totalAmountInPaise: number;
  status: string;
  date: string;
  courierName?: string;
  trackingNumber?: string;
  notes?: string;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ord_1",
    referenceNumber: "ZRF-20261111-8942",
    customerName: "Aarav Sharma",
    customerEmail: "aarav@gmail.com",
    customerPhone: "+919876543210",
    deliveryCity: "Mumbai",
    deliveryState: "Maharashtra",
    itemsSummary: "2x 280 GSM Oversized Tee (M/Onyx), 1x Washed Twill Cap (OS/Black)",
    totalAmountInPaise: 389700,
    status: "IN_PRODUCTION",
    date: "Nov 11, 2026",
    courierName: "Bluedart Express",
    trackingNumber: "AWB-781920491",
    notes: "Batch printing #108 running on carousel.",
  },
  {
    id: "ord_2",
    referenceNumber: "ZRF-20261111-4190",
    customerName: "Pooja Deshmukh",
    customerEmail: "pooja.d@techlead.in",
    customerPhone: "+919811223344",
    deliveryCity: "Bengaluru",
    deliveryState: "Karnataka",
    itemsSummary: "1x 420 GSM Box Hoodie (L/Charcoal)",
    totalAmountInPaise: 299900,
    status: "UNDER_REVIEW",
    date: "Nov 11, 2026",
    notes: "Awaiting customer confirmation on sleeve fit.",
  },
  {
    id: "ord_3",
    referenceNumber: "ZRF-20261110-7712",
    customerName: "Kabir Mehra",
    customerEmail: "kabir@studio.co",
    customerPhone: "+919822334455",
    deliveryCity: "Gurugram",
    deliveryState: "Haryana",
    itemsSummary: "3x 240 GSM Mercerized Pique Polo (M/Navy)",
    totalAmountInPaise: 569700,
    status: "SHIPPED",
    date: "Nov 10, 2026",
    courierName: "Delhivery Surface",
    trackingNumber: "DLV-908123910",
  },
  {
    id: "ord_4",
    referenceNumber: "ZRF-20261109-1029",
    customerName: "Rohan Varma",
    customerEmail: "rohan@designagency.in",
    customerPhone: "+919833445566",
    deliveryCity: "Pune",
    deliveryState: "Maharashtra",
    itemsSummary: "4x 280 GSM Heavyweight Tee (XL/Onyx)",
    totalAmountInPaise: 599600,
    status: "CONFIRMED",
    date: "Nov 09, 2026",
  },
];

const ORDER_STATUSES = [
  "ALL",
  "ORDER_REQUESTED",
  "UNDER_REVIEW",
  "QUOTATION_SENT",
  "CONFIRMED",
  "PROCESSING",
  "IN_PRODUCTION",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectingOrder, setInspectingOrder] = useState<AdminOrder | null>(null);

  // Modal mutation state
  const [newStatus, setNewStatus] = useState("");
  const [courierNameInput, setCourierNameInput] = useState("");
  const [trackingNumberInput, setTrackingNumberInput] = useState("");
  const [auditComment, setAuditComment] = useState("");

  const handleInspect = (order: AdminOrder) => {
    setInspectingOrder(order);
    setNewStatus(order.status);
    setCourierNameInput(order.courierName || "Bluedart Express");
    setTrackingNumberInput(order.trackingNumber || "");
    setAuditComment("");
  };

  const handleSaveStatusChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectingOrder) return;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === inspectingOrder.id) {
          return {
            ...o,
            status: newStatus,
            courierName: courierNameInput,
            trackingNumber: trackingNumberInput,
            notes: auditComment ? `${o.notes ? `${o.notes} | ` : ""}${auditComment}` : o.notes,
          };
        }
        return o;
      })
    );

    setInspectingOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "ALL" && order.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        order.referenceNumber.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ FULFILLMENT & LIFECYCLE ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            ORDER REQUESTS MANAGEMENT
          </h1>
          <p className="text-xs text-brand-muted mt-1 font-mono">
            Review incoming requests, manage quotes, update 10-stage lifecycle, and dispatch courier AWBs.
          </p>
        </div>
        <div className="text-xs font-mono text-brand-grey">
          TOTAL: <strong className="text-brand-offwhite">{orders.length}</strong> REQUESTS
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-brand-card/30 p-4 border border-border-subtle">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey" />
          <input
            type="text"
            placeholder="Search by reference (e.g. ZRF-20261111) or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-black border border-border-subtle pl-10 pr-4 py-2 text-xs font-mono text-brand-offwhite placeholder:text-brand-grey focus:outline-none focus:border-brand-lime"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          {ORDER_STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 border whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-brand-offwhite text-brand-black border-brand-offwhite font-bold"
                  : "bg-brand-black text-brand-muted border-border-subtle hover:text-brand-offwhite"
              }`}
            >
              {st.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-brand-card/30 border border-border-subtle overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-border-subtle text-brand-grey bg-brand-card/50">
              <th className="p-4">Reference</th>
              <th className="p-4">Customer Details</th>
              <th className="p-4">Items Summary</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Logistics</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-brand-muted">
                  No order requests found matching criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-brand-card/40 transition-colors">
                  <td className="p-4 font-bold text-brand-offwhite">
                    {ord.referenceNumber}
                    <span className="text-[10px] text-brand-grey block font-normal">{ord.date}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-brand-offwhite block">{ord.customerName}</span>
                    <span className="text-brand-grey block">{ord.customerPhone}</span>
                    <span className="text-brand-muted block text-[11px]">{ord.deliveryCity}, {ord.deliveryState}</span>
                  </td>
                  <td className="p-4 max-w-xs text-brand-muted">
                    {ord.itemsSummary}
                  </td>
                  <td className="p-4 font-bold text-brand-lime">
                    {formatInr(ord.totalAmountInPaise)}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-brand-black border border-border-subtle text-brand-offwhite text-[10px] font-bold">
                      {ord.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="p-4">
                    {ord.trackingNumber ? (
                      <div>
                        <span className="text-brand-offwhite block font-bold">{ord.courierName}</span>
                        <span className="text-brand-lime text-[11px] block">{ord.trackingNumber}</span>
                      </div>
                    ) : (
                      <span className="text-brand-grey text-[11px]">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleInspect(ord)}
                      className="px-3 py-1.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-lime transition-colors"
                    >
                      Inspect / Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* INSPECT & STATUS MODAL */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#141414] border border-border-subtle p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start border-b border-border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-grey block">
                  Inspect Order Request
                </span>
                <h3 className="text-xl font-bold font-mono text-brand-lime">
                  {inspectingOrder.referenceNumber}
                </h3>
              </div>
              <button
                onClick={() => setInspectingOrder(null)}
                className="text-brand-grey hover:text-brand-offwhite"
              >
                <X size={20} />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 bg-brand-black border border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-brand-grey uppercase block text-[10px]">Customer:</span>
                <p className="font-bold text-brand-offwhite">{inspectingOrder.customerName}</p>
                <p className="text-brand-muted">{inspectingOrder.customerEmail}</p>
                <p className="text-brand-muted">{inspectingOrder.customerPhone}</p>
              </div>

              <div>
                <span className="text-brand-grey uppercase block text-[10px]">Destination:</span>
                <p className="text-brand-offwhite">{inspectingOrder.deliveryCity}, {inspectingOrder.deliveryState}</p>
                <p className="text-brand-lime font-bold pt-1">
                  Estimated Total: {formatInr(inspectingOrder.totalAmountInPaise)}
                </p>
              </div>
            </div>

            {/* Update Status Form */}
            <form onSubmit={handleSaveStatusChange} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Transition Order Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2.5 text-xs text-brand-offwhite focus:outline-none focus:border-brand-lime uppercase"
                >
                  {ORDER_STATUSES.filter((s) => s !== "ALL").map((s) => (
                    <option key={s} value={s}>
                      {s.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Courier Tracking Inputs (If Shipped or In Delivery) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">Courier Partner</label>
                  <input
                    type="text"
                    placeholder="e.g. Bluedart / Delhivery / DTDC"
                    value={courierNameInput}
                    onChange={(e) => setCourierNameInput(e.target.value)}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">AWB / Courier Tracking #</label>
                  <input
                    type="text"
                    placeholder="e.g. AWB-781920491"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] uppercase text-brand-grey block">Audit Timeline Remark</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Garment batch completed inspection. Dispatched via Bluedart surface."
                  value={auditComment}
                  onChange={(e) => setAuditComment(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border-subtle">
                <a
                  href={`https://wa.me/${inspectingOrder.customerPhone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(inspectingOrder.customerName)}%2C%20regarding%20your%20ZARF%20Wear%20order%20${inspectingOrder.referenceNumber}...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-offwhite hover:text-brand-lime transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare size={14} className="text-brand-lime" />
                  <span>WhatsApp Customer</span>
                </a>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setInspectingOrder(null)}
                    className="px-4 py-2.5 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs font-mono uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                  >
                    Save & Update Status
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

