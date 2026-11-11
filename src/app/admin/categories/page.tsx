"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Layers, X, Check } from "lucide-react";
import { CATEGORIES, Category, DEMO_PRODUCTS } from "@/lib/demo-data";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingCategory(null);
    setName("");
    setDescription("");
    setImageUrl("https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80");
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setIsCreating(false);
    setName(cat.name);
    setDescription(cat.description);
    setImageUrl(cat.imageUrl);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newCat: Category = {
        id: `cat_${Date.now()}`,
        slug,
        name,
        description,
        imageUrl,
      };
      setCategories([...categories, newCat]);
      setIsCreating(false);
    } else if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => {
          if (c.id === editingCategory.id) {
            return {
              ...c,
              name,
              description,
              imageUrl,
            };
          }
          return c;
        })
      );
      setEditingCategory(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-lime">
            [ TAXONOMY & ARCHIVES ]
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-brand-offwhite font-display">
            CATEGORY MANAGEMENT
          </h1>
          <p className="text-xs text-brand-muted mt-1 font-mono">
            Organize silhouettes into editorial collections, category descriptions, and lookbook hero images.
          </p>
        </div>
        <div>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 bg-brand-lime hover:bg-brand-limeHover text-brand-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus size={15} />
            <span>Create New Category</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const productCount = DEMO_PRODUCTS.filter((p) => p.category.slug === cat.slug).length;

          return (
            <div
              key={cat.id}
              className="bg-brand-card/40 border border-border-subtle overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-48 w-full bg-brand-card border-b border-border-subtle">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-brand-black/90 px-2 py-0.5 text-[10px] font-mono text-brand-lime border border-border-subtle">
                  {productCount} {productCount === 1 ? "PIECE" : "PIECES"}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-brand-grey">
                    SLUG: /{cat.slug}
                  </div>
                  <h3 className="text-lg font-bold text-brand-offwhite uppercase font-display mt-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-brand-muted font-light mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-subtle/50 flex items-center justify-between">
                  <Link
                    href={`/category/${cat.slug}`}
                    target="_blank"
                    className="text-xs font-mono text-brand-muted hover:text-brand-lime flex items-center gap-1"
                  >
                    <Eye size={13} />
                    <span>View Page</span>
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1 text-brand-grey hover:text-brand-lime transition-colors"
                      title="Edit Category"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1 text-brand-grey hover:text-status-danger transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isCreating || editingCategory) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#141414] border border-border-subtle p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-grey block">
                  Category Configuration
                </span>
                <h3 className="text-lg font-bold font-mono text-brand-offwhite">
                  {isCreating ? "Create Category" : `Edit ${editingCategory?.name}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingCategory(null);
                }}
                className="text-brand-grey hover:text-brand-offwhite"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Category Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavyweight Fleece Hoodies"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Editorial Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Textile specification and silhouette description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-brand-grey block">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-brand-black border border-border-subtle px-3 py-2 text-brand-offwhite focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 border border-border-subtle text-brand-muted hover:text-brand-offwhite text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-lime hover:bg-brand-limeHover text-brand-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {isCreating ? "Create Category" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
