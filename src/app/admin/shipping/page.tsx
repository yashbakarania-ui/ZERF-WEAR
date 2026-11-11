"use client";

import React, { useState } from "react";
import { Truck, Search, CheckCircle2, Clock, AlertCircle, ExternalLink, X, Plus } from "lucide-react";

interface ShipmentItem {
  id: string;
  orderReference: string;
  customerName: string;
  destination: string;
  courierName: string;
  trackingNumber: string;
  dispatchDate: string;
  status: "LABEL_CREATED" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED";
}

const INITIAL_SHIPMENTS: ShipmentItem[] = [
  {
    id: "ship_1",
    orderReference: "ZRF-20261111-8942",
    customerName: "Aarav Sharma",
    destination: "Mumbai, Maharashtra (400050)",
    courierName: "Bluedart Express Surface",
    trackingNumber: "AWB-781920491",
    dispatchDate: "Nov 11, 2026",
    status: "LABEL_CREATED",
  },
  {
    id: "ship_2",
    orderReference: "ZRF-20261110-7712",
    customerName: "Kabir Mehra",
    destination: "Gurugram, Haryana (122002)",
    courierName: "Delhivery Surface",
    trackingNumber: "DLV-908123910",
    dispatchDate: "Nov 10, 2026",
    status: "IN_TRANSIT",
  },
  {
    id: "ship_3",
    orderReference: "ZRF-20261028-1104",
    customerName: "Ananya Iyer",
    destination: "Bengaluru, Karnataka (560001)",
    courierName: "DTDC Air Express",
    trackingNumber: "DTDC-440192831",
    dispatchDate: "Oct 28, 2026",
    status: "DELIVERED",
  },
];

export default function AdminShippingPage() {
  const [shipments, setShipments] = useState<ShipmentItem[]>(INITIAL_SHIPMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedShipment, setSelectedShipment] = useState<ShipmentItem | null>(null);
  const [newStatus, setNewStatus] = useState<any>("");

  const handleOpenEdit = (s: ShipmentItem) => {
    setSelectedShipment(s);
    setNewStatus(s.status);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;

    setShipments((prev) =>
      prev.map((s) => (s.id === selectedShipment.id ? { ...s, status: newStatus } : s))
    );
    setSelectedShipment(null);
  };

  const filtered = shipments.filter((s) => {
    if (statusFilter !== "ALL" && s.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.orderReference.toLowerCase().includes(q) ||
        s.trackingNumber.toLowerCase().includes(q) ||
        s.customerName.toLowerCase().includes(q)
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
            [ LOGISTICS DISPATCH & COURIER PARTNERS ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            SHIPPING & DISPATCH MANAGEMENT
          </h1>
          <p className="text-xs text-brand-muted mt-1 font-mono">
            Track courier AWBs, assign carriers (Bluedart, Delhivery, DTDC), and update delivery milestones.
          </p>
        </div>
        <div className="text-xs font-mono text-brand-grey">
          ACTIVE SHIPMENTS: <strong className="text-brand-offwhite">{shipments.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-brand-card/30 p-4 border border-border-subtle">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey" />
          <input
            type="text"
            placeholder="Search by AWB code, order reference, or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-black border border-border-subtle pl-10 pr-4 py-2 text-xs font-mono text-brand-offwhite placeholder:text-brand-grey focus:outline-none focus:border-brand-lime"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
          {["ALL", "LABEL_CREATED", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"].map((st) => (
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

      {/* Shipments Table */}
      <div className="bg-brand-card/30 border border-border-subtle overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-border-subtle text-brand-grey bg-brand-card/50">
              <th className="p-4">Tracking AWB</th>
              <th className="p-4">Order Reference</th>
              <th className="p-4">Recipient & Destination</th>
              <th className="p-4">Courier Partner</th>
              <th className="p-4">Dispatch Date</th>
              <th className="p-4">Delivery Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-brand-card/40 transition-colors">
                <td className="p-4 font-bold text-brand-lime">
                  {s.trackingNumber}
                </td>
                <td className="p-4 font-bold text-brand-offwhite">
                  {s.orderReference}
                </td>
                <td className="p-4">
                  <div className="font-bold text-brand-offwhite">{s.customerName}</div>
                  <div className="text-[11px] text-brand-muted">{s.destination}</div>
                </td>
                <td className="p-4 text-brand-offwhite font-bold">
                  {s.courierName}
                </td>
                <td className="p-4 text-brand-muted">
                  {s.dispatchDate}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold border ${
                    s.status === "DELIVERED"
                      ? "bg-status-success/10 border-status-success/40 text-status-success"
                      : s.status === "IN_TRANSIT"
                      ? "bg-status-info/10 border-status-info/40 text-status-info"
                      : "bg-brand-black border-border-subtle text-brand-offwhite"
                  }`}>
                    {s.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="px-3 py-1.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-lime transition-colors"
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE STATUS MODAL */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#141414] border border-border-subtle p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-grey block">
                  Carrier Tracking Update
                </span>
                <h3 className="text-base font-bold font-mono text-brand-lime">
                  {selectedShipment.trackingNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedShipment(null)}
                className="text-brand-grey hover:text-brand-offwhite"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Milestone Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime uppercase"
                >
                  <option value="LABEL_CREATED">Label Created (Manifest Ready)</option>
                  <option value="IN_TRANSIT">In Transit (Dispatched from Hub)</option>
                  <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                  <option value="DELIVERED">Delivered to Consignee</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setSelectedShipment(null)}
                  className="px-4 py-2 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-lime hover:bg-brand-limeHover text-brand-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Commit Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
