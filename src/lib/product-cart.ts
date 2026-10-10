"use client";

import { useCallback, useEffect, useState } from "react";

// The cart lives entirely in the browser (localStorage), scoped per salon —
// there's no server-side Cart model. Checkout turns it into a real Order
// row in one request (see POST /api/orders); until then it's just client
// state, same as any ordinary e-commerce cart.
export interface CartItem {
  productId: string;
  name: string;
  priceCents: number;
  currency: string;
  imageId: string | null;
  qty: number;
}

function cartKey(businessSlug: string) {
  return `varaaai_cart_${businessSlug}`;
}

function readCart(businessSlug: string): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(cartKey(businessSlug));
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(businessSlug: string, items: CartItem[]) {
  try {
    window.localStorage.setItem(cartKey(businessSlug), JSON.stringify(items));
    // localStorage's own "storage" event only fires in OTHER tabs, never the
    // tab that made the write — this custom event is what keeps the cart
    // icon/panel on the same page in sync with itself.
    window.dispatchEvent(new CustomEvent("varaaai-cart-update", { detail: { businessSlug } }));
  } catch {
    // Private browsing / blocked storage — the cart just won't persist
    // across reloads, which is a reasonable degradation, not an error.
  }
}

export function useProductCart(businessSlug: string) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart(businessSlug));
    function onUpdate(e: Event) {
      const detail = (e as CustomEvent<{ businessSlug: string }>).detail;
      if (detail?.businessSlug === businessSlug) setItems(readCart(businessSlug));
    }
    window.addEventListener("varaaai-cart-update", onUpdate);
    return () => window.removeEventListener("varaaai-cart-update", onUpdate);
  }, [businessSlug]);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      const current = readCart(businessSlug);
      const existing = current.find((i) => i.productId === item.productId);
      const next = existing
        ? current.map((i) => (i.productId === item.productId ? { ...i, qty: i.qty + qty } : i))
        : [...current, { ...item, qty }];
      writeCart(businessSlug, next);
      setItems(next);
    },
    [businessSlug]
  );

  const setQty = useCallback(
    (productId: string, qty: number) => {
      const current = readCart(businessSlug);
      const next =
        qty <= 0
          ? current.filter((i) => i.productId !== productId)
          : current.map((i) => (i.productId === productId ? { ...i, qty } : i));
      writeCart(businessSlug, next);
      setItems(next);
    },
    [businessSlug]
  );

  const removeItem = useCallback(
    (productId: string) => {
      const next = readCart(businessSlug).filter((i) => i.productId !== productId);
      writeCart(businessSlug, next);
      setItems(next);
    },
    [businessSlug]
  );

  const clear = useCallback(() => {
    writeCart(businessSlug, []);
    setItems([]);
  }, [businessSlug]);

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  return { items, addItem, setQty, removeItem, clear, totalCents, totalQty };
}
