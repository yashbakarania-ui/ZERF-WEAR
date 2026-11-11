"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Star, X, Check } from "lucide-react";
import { DEMO_PRODUCTS, CATEGORIES, Product } from "@/lib/demo-data";
import { formatInr } from "@/lib/currency";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formCategory, setFormCategory] = useState(CATEGORIES[0].slug);
  const [formPriceInRupees, setFormPriceInRupees] = useState(1499);
  const [formBadge, setFormBadge] = useState("280 GSM");
  const [formFabric, setFormFabric] = useState("100% Combed Cotton • Bio-washed");
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsCreating(false);
    setFormTitle(p.title);
    setFormSubtitle(p.subtitle);
    setFormCategory(p.category.slug);
    setFormPriceInRupees(p.basePriceInPaise / 100);
    setFormBadge(p.badge || "");
    setFormFabric(p.fabricDetails || "");
    setFormIsFeatured(p.isFeatured);
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setFormTitle("");
    setFormSubtitle("");
    setFormCategory(CATEGORIES[0].slug);
    setFormPriceInRupees(1499);
    setFormBadge("NEW SILHOUETTE");
    setFormFabric("100% Combed Cotton, Pre-shrunk");
    setFormIsFeatured(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = CATEGORIES.find((c) => c.slug === formCategory) || CATEGORIES[0];

    if (isCreating) {
      const slug = formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newProd: Product = {
        id: `prod_${Date.now()}`,
        slug,
        title: formTitle,
        subtitle: formSubtitle,
        description: formSubtitle,
        fabricDetails: formFabric,
        careInstructions: "Machine wash cold inside out • Do not bleach",
        basePriceInPaise: formPriceInRupees * 100,
        badge: formBadge,
        isFeatured: formIsFeatured,
        isB2BEligible: true,
        category: cat,
        images: [
          {
            id: `img_${Date.now()}`,
            url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
            altText: formTitle,
            viewType: "FRONT",
          },
        ],
        variants: [
          { id: `var_${Date.now()}_1`, sku: `ZRF-NEW-S`, size: "S", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 20 },
          { id: `var_${Date.now()}_2`, sku: `ZRF-NEW-M`, size: "M", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 30 },
          { id: `var_${Date.now()}_3`, sku: `ZRF-NEW-L`, size: "L", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 25 },
        ],
      };
      setProducts([newProd, ...products]);
      setIsCreating(false);
    } else if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === editingProduct.id) {
            return {
              ...p,
              title: formTitle,
              subtitle: formSubtitle,
              category: cat,
              basePriceInPaise: formPriceInRupees * 100,
              badge: formBadge,
              fabricDetails: formFabric,
              isFeatured: formIsFeatured,
            };
          }
          return p;
        })
      );
      setEditingProduct(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ APPAREL ARCHIVE ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            PRODUCT & VARIANT MANAGEMENT
          </h1>
          <p className="text-xs text-brand-muted mt-1 font-mono">
            Create silhouettes, configure pricing in integer paise, and manage variant matrices.
          </p>
        </div>
        <div>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus size={15} />
            <span>Add New Product Silhouette</span>
          </button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-brand-card/30 border border-border-subtle overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-border-subtle text-brand-grey bg-brand-card/50">
              <th className="p-4">Visual</th>
              <th className="p-4">Silhouette & Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Base Price</th>
              <th className="p-4">Active Variants</th>
              <th className="p-4">Badge</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {products.map((p) => {
              const totalStock = p.variants.reduce((acc, v) => acc + v.stockQuantity, 0);

              return (
                <tr key={p.id} className="hover:bg-brand-card/40 transition-colors">
                  <td className="p-4">
                    <div className="relative w-12 h-16 bg-brand-card border border-border-subtle overflow-hidden">
                      {p.images[0] && (
                        <Image
                          src={p.images[0].url}
                          alt={p.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-brand-offwhite text-xs">{p.title}</div>
                    <div className="text-[11px] text-brand-muted line-clamp-1">{p.subtitle}</div>
                    <div className="text-[10px] text-brand-grey pt-0.5">Total Units: {totalStock}</div>
                  </td>
                  <td className="p-4 text-brand-muted">
                    {p.category.name}
                  </td>
                  <td className="p-4 font-bold text-brand-lime">
                    {formatInr(p.basePriceInPaise)}
                  </td>
                  <td className="p-4">
                    <span className="text-brand-offwhite font-bold">{p.variants.length} Sizes</span>
                  </td>
                  <td className="p-4">
                    {p.badge && (
                      <span className="px-2 py-0.5 bg-brand-black border border-border-subtle text-brand-lime text-[10px]">
                        {p.badge}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="p-1.5 text-brand-grey hover:text-brand-offwhite"
                        title="View Live"
                      >
                        <Eye size={14} />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-brand-grey hover:text-brand-lime"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-brand-grey hover:text-status-danger"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#141414] border border-border-subtle p-6 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start border-b border-border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-grey block">
                  Product Editor
                </span>
                <h3 className="text-lg font-bold font-mono text-brand-offwhite">
                  {isCreating ? "Add New Apparel Silhouette" : `Edit ${editingProduct?.title}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="text-brand-grey hover:text-brand-offwhite"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ZARF 280 GSM Heavyweight Oversized Tee"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Subtitle / Cut</label>
                <input
                  type="text"
                  placeholder="e.g. Architectural Drop-Shoulder Silhouette"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">Base Price (₹ INR) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formPriceInRupees}
                    onChange={(e) => setFormPriceInRupees(Number(e.target.value))}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                  <span className="text-[10px] text-brand-grey block">
                    Saved internally as {formPriceInRupees * 100} paise.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-grey block">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. 280 GSM / 420 GSM"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <div className="space-y-1.5 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-brand-offwhite">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="accent-brand-lime"
                    />
                    <span>Highlight on Homepage Featured</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Fabric Details & Weave</label>
                <textarea
                  rows={2}
                  value={formFabric}
                  onChange={(e) => setFormFabric(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-lime hover:bg-brand-limeHover text-brand-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {isCreating ? "Create Silhouette" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

