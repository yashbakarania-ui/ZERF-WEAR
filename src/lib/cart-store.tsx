"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "./demo-data";

export interface CartItem {
  id: string; // generated unique key: variantId
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface AppliedCoupon {
  code: string;
  discountPercentage?: number;
  discountPaise?: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: AppliedCoupon | null;
  subtotalInPaise: number;
  discountInPaise: number;
  shippingFeeInPaise: number;
  totalAmountInPaise: number;
  totalItemCount: number;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 199900; // ₹1,999
const STANDARD_SHIPPING_FEE = 9900;    // ₹99

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("zarf_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("zarf_coupon");
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("zarf_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cart", e);
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem("zarf_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("zarf_coupon");
      }
    } catch (e) {
      console.error("Failed to persist coupon", e);
    }
  }, [appliedCoupon, isHydrated]);

  const addItem = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.variant.id === variant.id);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].quantity + quantity;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.min(newQty, variant.stockQuantity || 99),
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: variant.id,
            product,
            variant,
            quantity: Math.min(quantity, variant.stockQuantity || 99),
          },
        ];
      }
    });
    setIsOpen(true);
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((item) => item.variant.id !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.variant.id === variantId) {
          const clampedQty = Math.min(quantity, item.variant.stockQuantity || 99);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "ZARF10") {
      setAppliedCoupon({ code: "ZARF10", discountPercentage: 10 });
      return { success: true, message: "Coupon applied: 10% discount on order!" };
    } else if (cleanCode === "WELCOME200") {
      setAppliedCoupon({ code: "WELCOME200", discountPaise: 20000 });
      return { success: true, message: "Coupon applied: ₹200 off!" };
    } else {
      return { success: false, message: "Invalid or expired promotional code." };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotalInPaise = items.reduce((acc, item) => {
    const unitPrice = item.product.basePriceInPaise + (item.variant.priceAdjustmentInPaise || 0);
    return acc + unitPrice * item.quantity;
  }, 0);

  let discountInPaise = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discountInPaise = Math.round((subtotalInPaise * appliedCoupon.discountPercentage) / 100);
    } else if (appliedCoupon.discountPaise) {
      discountInPaise = Math.min(appliedCoupon.discountPaise, subtotalInPaise);
    }
  }

  const shippingFeeInPaise =
    subtotalInPaise === 0 || subtotalInPaise >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_FEE;

  const totalAmountInPaise = Math.max(0, subtotalInPaise - discountInPaise + shippingFeeInPaise);
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        appliedCoupon,
        subtotalInPaise,
        discountInPaise,
        shippingFeeInPaise,
        totalAmountInPaise,
        totalItemCount,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

