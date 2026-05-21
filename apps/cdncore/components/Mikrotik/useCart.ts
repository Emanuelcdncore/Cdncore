"use client";

import { useState, useEffect } from "react";

export type CartItem = {
  handle: string;
  title: string;
  image: string | null;
  priceCents: number;
  quantity: number;
};

const KEY = "officelan-cart";
const EVENT = "officelan-cart-updated";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); }
  catch { return []; }
}

function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(read());
    const sync = () => setItems(read());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const add = (item: Omit<CartItem, "quantity">, qty = 1) => {
    const cur = read();
    const exists = cur.find((i) => i.handle === item.handle);
    const next = exists
      ? cur.map((i) => i.handle === item.handle ? { ...i, quantity: i.quantity + qty } : i)
      : [...cur, { ...item, quantity: qty }];
    write(next);
    setItems(next);
  };

  const setQty = (handle: string, qty: number) => {
    const cur = read();
    const next = qty <= 0 ? cur.filter((i) => i.handle !== handle) : cur.map((i) => i.handle === handle ? { ...i, quantity: qty } : i);
    write(next);
    setItems(next);
  };

  const remove = (handle: string) => {
    const next = read().filter((i) => i.handle !== handle);
    write(next);
    setItems(next);
  };

  return {
    items,
    add,
    setQty,
    remove,
    count: items.reduce((n, i) => n + i.quantity, 0),
    subtotal: items.reduce((n, i) => n + i.priceCents * i.quantity, 0),
  };
}
