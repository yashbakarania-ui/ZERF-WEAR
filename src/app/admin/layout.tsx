"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  ShoppingBag, 
  MessageSquare, 
  Tag, 
  Settings, 
  ArrowLeft,
  Truck,
  Users,
  BarChart3,
  Layers
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders & Requests", icon: ShoppingBag },
  { href: "/admin/inventory", label: "Inventory Stock", icon: Boxes },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Layers },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/shipping", label: "Shipping & Dispatch", icon: Truck },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Store Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-brand-offwhite flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111111] border-b md:border-b-0 md:border-r border-border-subtle flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          {/* Logo & Admin Tag */}
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black font-display tracking-tight text-brand-offwhite">
                ZARF<span className="text-brand-lime">.</span>WEAR
              </span>
            </Link>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-brand-lime text-brand-black px-1.5 py-0.5">
              ADMIN V1
            </span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-brand-card text-brand-lime font-bold border-l-2 border-brand-lime"
                      : "text-brand-muted hover:text-brand-offwhite hover:bg-brand-card/50"
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Return to Storefront link */}
        <div className="pt-6 border-t border-border-subtle space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-brand-lime transition-colors px-3 py-2"
          >
            <ArrowLeft size={14} />
            <span>Storefront Exit</span>
          </Link>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
