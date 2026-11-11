"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Package, 
  MapPin, 
  MessageSquare, 
  LogOut, 
  RotateCcw, 
  Truck, 
  Plus, 
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react";
import { formatInr } from "@/lib/currency";
import { useCart } from "@/lib/cart-store";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

export default function AccountPage() {
  const { addItem, openCart } = useCart();
  const [activeTab, setActiveTab] = useState<"orders" | "enquiries" | "addresses" | "profile">("orders");

  // Simulated logged-in user profile
  const [userProfile, setUserProfile] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 43210",
    role: "CUSTOMER",
    memberSince: "November 2026",
  });

  // Demo user order history
  const orderHistory = [
    {
      id: "ord_101",
      referenceNumber: "ZRF-20261111-8942",
      date: "Nov 11, 2026",
      status: "IN_PRODUCTION",
      itemCount: 3,
      totalAmountInPaise: 389700,
      items: [
        {
          title: "ZARF 280 GSM Heavyweight Oversized Tee",
          variant: "M / Onyx Black",
          qty: 2,
          unitPriceInPaise: 149900,
          product: DEMO_PRODUCTS[0],
        },
        {
          title: "ZARF Washed Heavy Twill Dad Cap",
          variant: "OS / Washed Black",
          qty: 1,
          unitPriceInPaise: 89900,
          product: DEMO_PRODUCTS[4],
        },
      ],
    },
    {
      id: "ord_102",
      referenceNumber: "ZRF-20261028-1104",
      date: "Oct 28, 2026",
      status: "DELIVERED",
      itemCount: 1,
      totalAmountInPaise: 299900,
      items: [
        {
          title: "ZARF 420 GSM Box-Fit Raw Hoodie",
          variant: "L / Charcoal Grey",
          qty: 1,
          unitPriceInPaise: 299900,
          product: DEMO_PRODUCTS[1],
        },
      ],
    },
  ];

  // Demo user custom/B2B enquiries
  const enquiryHistory = [
    {
      referenceNumber: "ENQ-CUST-20261111-3019",
      date: "Nov 11, 2026",
      type: "Custom Apparel Printing",
      category: "280 GSM Oversized T-Shirt",
      qty: 35,
      technique: "High-Density 3D Puff Print",
      status: "QUOTED",
      quotedAmountInPaise: 4200000, // ₹42,000
    },
    {
      referenceNumber: "ENQ-B2B-20261102-4412",
      date: "Nov 02, 2026",
      type: "Corporate Procurement",
      category: "Corporate Uniforms & Polo Tees",
      qty: 120,
      technique: "Tonal Chest Embroidery",
      status: "SAMPLE_APPROVED",
      quotedAmountInPaise: 18000000, // ₹1,80,000
    },
  ];

  // Demo saved addresses
  const [addresses, setAddresses] = useState([
    {
      id: "addr_1",
      fullName: "Aarav Sharma",
      phone: "+91 98765 43210",
      line1: "Flat 402, Skyline Towers, 14th Road",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400050",
      isDefault: true,
    },
    {
      id: "addr_2",
      fullName: "Aarav Sharma (Studio)",
      phone: "+91 98765 43210",
      line1: "WeWork Enam Sambhav, BKC G Block",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400051",
      isDefault: false,
    },
  ]);

  const handleReorder = (order: typeof orderHistory[0]) => {
    order.items.forEach((item) => {
      if (item.product && item.product.variants[0]) {
        addItem(item.product, item.product.variants[0], item.qty);
      }
    });
    openCart();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ORDER_REQUESTED":
      case "NEW":
        return <span className="px-2 py-0.5 bg-brand-black border border-border-strong text-brand-grey font-mono text-[10px]">REQUESTED</span>;
      case "UNDER_REVIEW":
      case "IN_REVIEW":
        return <span className="px-2 py-0.5 bg-status-warning/10 border border-status-warning/40 text-status-warning font-mono text-[10px]">UNDER REVIEW</span>;
      case "CONFIRMED":
      case "QUOTED":
        return <span className="px-2 py-0.5 bg-brand-lime/10 border border-brand-lime/40 text-brand-lime font-mono text-[10px]">CONFIRMED</span>;
      case "IN_PRODUCTION":
      case "PROCESSING":
        return <span className="px-2 py-0.5 bg-brand-offwhite text-brand-black font-mono text-[10px] font-bold">IN PRODUCTION</span>;
      case "SHIPPED":
        return <span className="px-2 py-0.5 bg-status-info/10 border border-status-info/40 text-status-info font-mono text-[10px]">SHIPPED</span>;
      case "DELIVERED":
      case "SAMPLE_APPROVED":
        return <span className="px-2 py-0.5 bg-status-success/10 border border-status-success/40 text-status-success font-mono text-[10px]">DELIVERED</span>;
      default:
        return <span className="px-2 py-0.5 bg-brand-card text-brand-muted font-mono text-[10px]">{status}</span>;
    }
  };

  return (
    <div className="w-full bg-brand-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Profile Header */}
        <div className="border-b border-border-subtle pb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
              [ CLIENT SUITE ]
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-offwhite font-display">
              {userProfile.name}
            </h1>
            <p className="text-xs text-brand-muted font-mono">
              {userProfile.email} • {userProfile.phone} • Member since {userProfile.memberSince}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-lime transition-colors"
            >
              Access Admin Hub →
            </Link>
          </div>
        </div>

        {/* Account Tab Navigation */}
        <div className="flex border-b border-border-subtle gap-8 text-xs font-mono uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-4 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === "orders"
                ? "text-brand-lime border-b-2 border-brand-lime font-bold"
                : "text-brand-muted hover:text-brand-offwhite"
            }`}
          >
            <Package size={14} />
            <span>Order History ({orderHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("enquiries")}
            className={`pb-4 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === "enquiries"
                ? "text-brand-lime border-b-2 border-brand-lime font-bold"
                : "text-brand-muted hover:text-brand-offwhite"
            }`}
          >
            <MessageSquare size={14} />
            <span>Custom & B2B Enquiries ({enquiryHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`pb-4 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === "addresses"
                ? "text-brand-lime border-b-2 border-brand-lime font-bold"
                : "text-brand-muted hover:text-brand-offwhite"
            }`}
          >
            <MapPin size={14} />
            <span>Saved Addresses ({addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-4 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === "profile"
                ? "text-brand-lime border-b-2 border-brand-lime font-bold"
                : "text-brand-muted hover:text-brand-offwhite"
            }`}
          >
            <User size={14} />
            <span>Profile Details</span>
          </button>
        </div>

        {/* TAB 1: ORDER HISTORY */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div key={order.id} className="p-6 bg-brand-card/40 border border-border-subtle space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle/70 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold font-mono text-brand-offwhite">
                        {order.referenceNumber}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <span className="text-xs font-mono text-brand-grey">
                      Submitted on {order.date} • {order.itemCount} Garments
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/track/${order.referenceNumber}`}
                      className="px-4 py-2 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-offwhite hover:text-brand-lime transition-colors flex items-center gap-1.5"
                    >
                      <Truck size={13} />
                      <span>Live Track</span>
                    </Link>

                    <button
                      onClick={() => handleReorder(order)}
                      className="px-4 py-2 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw size={13} />
                      <span>Reorder Pieces</span>
                    </button>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="divide-y divide-border-subtle/40 text-xs font-mono">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="text-brand-offwhite font-bold">{item.qty}x {item.title}</span>
                        <span className="text-brand-grey block text-[11px]">{item.variant}</span>
                      </div>
                      <span className="text-brand-offwhite font-bold">
                        {formatInr(item.unitPriceInPaise * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs font-mono border-t border-border-subtle/50">
                  <span className="text-brand-grey">Order Total:</span>
                  <span className="text-sm font-bold text-brand-lime">
                    {formatInr(order.totalAmountInPaise)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CUSTOM & B2B ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            {enquiryHistory.map((enq) => (
              <div key={enq.referenceNumber} className="p-6 bg-brand-card/40 border border-border-subtle space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle/70 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold font-mono text-brand-offwhite">
                        {enq.referenceNumber}
                      </span>
                      {getStatusBadge(enq.status)}
                    </div>
                    <span className="text-xs font-mono text-brand-grey">
                      Lodged: {enq.date} • Category: {enq.type}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-brand-grey block">Quotation Value</span>
                    <span className="text-sm font-bold font-mono text-brand-lime">
                      {formatInr(enq.quotedAmountInPaise)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-brand-grey block text-[10px] uppercase">Silhouette</span>
                    <span className="text-brand-offwhite font-bold">{enq.category}</span>
                  </div>
                  <div>
                    <span className="text-brand-grey block text-[10px] uppercase">Quantity</span>
                    <span className="text-brand-offwhite font-bold">{enq.qty} pcs</span>
                  </div>
                  <div>
                    <span className="text-brand-grey block text-[10px] uppercase">Technique</span>
                    <span className="text-brand-offwhite font-bold">{enq.technique}</span>
                  </div>
                  <div>
                    <span className="text-brand-grey block text-[10px] uppercase">Concierge</span>
                    <span className="text-brand-lime font-bold">Assigned</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-brand-offwhite">
                Saved Delivery Destinations
              </h2>
              <button className="px-4 py-2 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-lime flex items-center gap-1.5 transition-colors">
                <Plus size={13} />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-6 bg-brand-card/40 border border-border-subtle space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-mono font-bold uppercase text-brand-offwhite">
                      {addr.fullName}
                    </h3>
                    {addr.isDefault && (
                      <span className="text-[10px] font-mono bg-brand-lime text-brand-black px-1.5 py-0.5 font-bold">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-brand-muted space-y-1">
                    <p>{addr.line1}</p>
                    <p>{addr.city}, {addr.state} - {addr.postalCode}</p>
                    <p className="text-brand-grey pt-1">{addr.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === "profile" && (
          <div className="p-8 bg-brand-card/40 border border-border-subtle max-w-2xl space-y-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-brand-offwhite border-b border-border-subtle pb-3">
              Account Information
            </h2>
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey">Full Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey">Email Address</label>
                <input
                  type="email"
                  value={userProfile.email}
                  disabled
                  className="w-full bg-brand-card border border-border-subtle px-3.5 py-2.5 text-brand-muted cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey">WhatsApp Mobile</label>
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className="w-full bg-brand-black border border-border-subtle px-3.5 py-2.5 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <button className="px-6 py-3 bg-brand-offwhite hover:bg-brand-lime text-brand-black text-xs font-mono font-bold uppercase tracking-wider transition-colors">
                Save Profile Updates
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

