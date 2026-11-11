"use client";

import React, { useState } from "react";
import { Tag, Plus, Edit, Trash2, X, Check, Calendar, Percent, IndianRupee } from "lucide-react";
import { formatInr } from "@/lib/currency";

interface AdminCoupon {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED_PAISE";
  discountValue: number; // percentage (e.g. 10) or paise (e.g. 20000 = ₹200)
  minOrderValueInPaise: number;
  usageCount: number;
  usageLimit?: number;
  isActive: boolean;
  expiryDate?: string;
}

const INITIAL_COUPONS: AdminCoupon[] = [
  {
    id: "coup_1",
    code: "ZARF10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minOrderValueInPaise: 99900,
    usageCount: 18,
    usageLimit: 100,
    isActive: true,
    expiryDate: "Dec 31, 2026",
  },
  {
    id: "coup_2",
    code: "WELCOME200",
    discountType: "FIXED_PAISE",
    discountValue: 20000, // ₹200
    minOrderValueInPaise: 149900,
    usageCount: 42,
    isActive: true,
    expiryDate: "Ongoing",
  },
  {
    id: "coup_3",
    code: "SUMMER20",
    discountType: "PERCENTAGE",
    discountValue: 20,
    minOrderValueInPaise: 299900,
    usageCount: 50,
    usageLimit: 50,
    isActive: false,
    expiryDate: "Expired",
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>(INITIAL_COUPONS);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED_PAISE">("PERCENTAGE");
  const [value, setValue] = useState(10);
  const [minOrderRupees, setMinOrderRupees] = useState(999);
  const [limit, setLimit] = useState(100);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: AdminCoupon = {
      id: `coup_${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: discountType === "PERCENTAGE" ? value : value * 100,
      minOrderValueInPaise: minOrderRupees * 100,
      usageCount: 0,
      usageLimit: limit || undefined,
      isActive: true,
      expiryDate: "Active",
    };
    setCoupons([newCoupon, ...coupons]);
    setIsCreating(false);
  };

  const toggleStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    if (confirm("Delete this promotional code?")) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ PROMOTIONS & INCENTIVES ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            PROMOTIONAL COUPONS
          </h1>
          <p className="text-xs text-brand-muted mt-1 font-mono">
            Manage percentage and fixed rupee discounts, minimum order conditions, and redemption limits.
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-5 py-2.5 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus size={15} />
            <span>Create Promo Coupon</span>
          </button>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-brand-card/30 border border-border-subtle overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-border-subtle text-brand-grey bg-brand-card/50">
              <th className="p-4">Promo Code</th>
              <th className="p-4">Discount Applied</th>
              <th className="p-4">Minimum Order</th>
              <th className="p-4">Usage Redemptions</th>
              <th className="p-4">Validity</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-brand-card/40 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-brand-lime" />
                    <span className="font-bold text-brand-offwhite text-sm">{c.code}</span>
                  </div>
                </td>
                <td className="p-4 font-bold text-brand-lime">
                  {c.discountType === "PERCENTAGE"
                    ? `${c.discountValue}% OFF`
                    : `${formatInr(c.discountValue)} FLAT OFF`}
                </td>
                <td className="p-4 text-brand-muted">
                  {formatInr(c.minOrderValueInPaise)}
                </td>
                <td className="p-4">
                  <span className="text-brand-offwhite font-bold">{c.usageCount}</span>
                  {c.usageLimit && <span className="text-brand-grey"> / {c.usageLimit} max</span>}
                </td>
                <td className="p-4 text-brand-muted">
                  {c.expiryDate}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(c.id)}
                    className={`px-2 py-0.5 text-[10px] font-bold border transition-colors ${
                      c.isActive
                        ? "bg-status-success/10 border-status-success/40 text-status-success"
                        : "bg-brand-black border-border-subtle text-brand-grey"
                    }`}
                  >
                    {c.isActive ? "ACTIVE" : "INACTIVE"}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => deleteCoupon(c.id)}
                    className="p-1.5 text-brand-grey hover:text-status-danger transition-colors"
                    title="Delete Coupon"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#141414] border border-border-subtle p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-grey block">
                  New Promotion
                </span>
                <h3 className="text-base font-bold font-mono text-brand-offwhite">
                  Create Promotional Code
                </h3>
              </div>
              <button
                onClick={() => setIsCreating(false)}
                className="text-brand-grey hover:text-brand-offwhite"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP20"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite uppercase focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED_PAISE">Flat Rupee Amount (₹)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">
                    {discountType === "PERCENTAGE" ? "Discount %" : "Discount in ₹"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">Min Order Value (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={minOrderRupees}
                    onChange={(e) => setMinOrderRupees(Number(e.target.value))}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">Total Usage Limit</label>
                  <input
                    type="number"
                    min={1}
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-lime hover:bg-brand-limeHover text-brand-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Generate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
