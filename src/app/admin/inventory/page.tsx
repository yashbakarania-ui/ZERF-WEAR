"use client";

import React, { useState } from "react";
import { Boxes, Plus, Minus, Search, AlertTriangle, ArrowUpDown, X, Check } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

interface VariantStockRow {
  productId: string;
  productTitle: string;
  variantId: string;
  sku: string;
  size: string;
  colorName: string;
  colorHex: string;
  stockQuantity: number;
}

export default function AdminInventoryPage() {
  // Flatten demo variants into audit inventory list
  const initialRows: VariantStockRow[] = DEMO_PRODUCTS.flatMap((p) =>
    p.variants.map((v) => ({
      productId: p.id,
      productTitle: p.title,
      variantId: v.id,
      sku: v.sku,
      size: v.size,
      colorName: v.colorName,
      colorHex: v.colorHex,
      stockQuantity: v.stockQuantity,
    }))
  );

  const [rows, setRows] = useState<VariantStockRow[]>(initialRows);
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustingRow, setAdjustingRow] = useState<VariantStockRow | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"RESTOCK" | "WRITE_OFF" | "CORRECTION">("RESTOCK");
  const [adjustmentQty, setAdjustmentQty] = useState(25);
  const [adjustmentNote, setAdjustmentNote] = useState("Factory restock batch #104");
  const [successToast, setSuccessToast] = useState("");

  const handleOpenAdjust = (row: VariantStockRow) => {
    setAdjustingRow(row);
    setAdjustmentQty(10);
    setAdjustmentType("RESTOCK");
    setAdjustmentNote("Batch inventory update");
  };

  const handleApplyAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingRow) return;

    setRows((prev) =>
      prev.map((r) => {
        if (r.variantId === adjustingRow.variantId) {
          let newStock = r.stockQuantity;
          if (adjustmentType === "RESTOCK") newStock += adjustmentQty;
          else if (adjustmentType === "WRITE_OFF") newStock = Math.max(0, newStock - adjustmentQty);
          else if (adjustmentType === "CORRECTION") newStock = adjustmentQty;

          return { ...r, stockQuantity: newStock };
        }
        return r;
      })
    );

    setSuccessToast(`Stock updated for ${adjustingRow.sku}`);
    setTimeout(() => setSuccessToast(""), 3000);
    setAdjustingRow(null);
  };

  const filteredRows = rows.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.sku.toLowerCase().includes(q) ||
      r.productTitle.toLowerCase().includes(q) ||
      r.size.toLowerCase().includes(q) ||
      r.colorName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ WAREHOUSE & STOCK CONTROLS ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            VARIANT INVENTORY AUDIT
          </h1>
          <p className="text-xs text-brand-muted mt-1 font-mono">
            Track and adjust real-time blanks stock levels across every SKU and size matrix.
          </p>
        </div>
        <div className="text-xs font-mono text-brand-grey">
          TOTAL ACTIVE SKUS: <strong className="text-brand-offwhite">{rows.length}</strong>
        </div>
      </div>

      {successToast && (
        <div className="p-3 bg-brand-card border border-brand-lime text-xs font-mono text-brand-lime flex items-center gap-2">
          <Check size={14} />
          <span>{successToast}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="bg-brand-card/30 p-4 border border-border-subtle">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey" />
          <input
            type="text"
            placeholder="Search by SKU, product silhouette, size, or colorway..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-black border border-border-subtle pl-10 pr-4 py-2 text-xs font-mono text-brand-offwhite placeholder:text-brand-grey focus:outline-none focus:border-brand-lime"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-brand-card/30 border border-border-subtle overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-border-subtle text-brand-grey bg-brand-card/50">
              <th className="p-4">SKU Code</th>
              <th className="p-4">Silhouette & Garment</th>
              <th className="p-4">Size</th>
              <th className="p-4">Colorway</th>
              <th className="p-4">Available Units</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Stock Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredRows.map((row) => {
              const isLow = row.stockQuantity <= 5;
              const isOut = row.stockQuantity === 0;

              return (
                <tr key={row.variantId} className="hover:bg-brand-card/40 transition-colors">
                  <td className="p-4 font-bold text-brand-offwhite">
                    {row.sku}
                  </td>
                  <td className="p-4 text-brand-muted">
                    {row.productTitle}
                  </td>
                  <td className="p-4 font-bold text-brand-lime">
                    {row.size}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full border border-border-strong"
                        style={{ backgroundColor: row.colorHex }}
                      />
                      <span>{row.colorName}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-sm text-brand-offwhite">
                    {row.stockQuantity}
                  </td>
                  <td className="p-4">
                    {isOut ? (
                      <span className="px-2 py-0.5 bg-status-danger/10 border border-status-danger/40 text-status-danger text-[10px] font-bold">
                        OUT OF STOCK
                      </span>
                    ) : isLow ? (
                      <span className="px-2 py-0.5 bg-status-warning/10 border border-status-warning/40 text-status-warning text-[10px] font-bold">
                        LOW ({row.stockQuantity})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-status-success/10 border border-status-success/40 text-status-success text-[10px]">
                        OPTIMAL
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenAdjust(row)}
                      className="px-3 py-1.5 bg-brand-card hover:bg-brand-elevated border border-border-subtle text-xs font-mono uppercase text-brand-lime transition-colors"
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ADJUSTMENT MODAL */}
      {adjustingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#141414] border border-border-subtle p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-grey block">
                  Inventory Movement
                </span>
                <h3 className="text-base font-bold font-mono text-brand-offwhite">
                  {adjustingRow.sku}
                </h3>
                <span className="text-xs text-brand-muted block mt-0.5">
                  Current Stock: <strong>{adjustingRow.stockQuantity} pcs</strong>
                </span>
              </div>
              <button
                onClick={() => setAdjustingRow(null)}
                className="text-brand-grey hover:text-brand-offwhite"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApplyAdjustment} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Movement Type</label>
                <select
                  value={adjustmentType}
                  onChange={(e) => setAdjustmentType(e.target.value as any)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime uppercase"
                >
                  <option value="RESTOCK">Restock (Add Units)</option>
                  <option value="WRITE_OFF">Damage Write-off (Deduct Units)</option>
                  <option value="CORRECTION">Manual Inventory Reconciliation (Set Absolute)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Quantity Delta</label>
                <input
                  type="number"
                  min={1}
                  value={adjustmentQty}
                  onChange={(e) => setAdjustmentQty(Number(e.target.value))}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Mandatory Audit Note</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Batch #109 delivered from Tirupur factory"
                  value={adjustmentNote}
                  onChange={(e) => setAdjustmentNote(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setAdjustingRow(null)}
                  className="px-4 py-2 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-lime hover:bg-brand-limeHover text-brand-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Record Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

