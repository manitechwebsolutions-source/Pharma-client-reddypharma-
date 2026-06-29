import { useEffect, useState, useCallback } from "react";
import { PRODUCTS as DEFAULT_PRODUCTS, type Product } from "./products";

const KEY = "reddy_products_v1";

function read(): Product[] {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PRODUCTS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_PRODUCTS;
    return parsed as Product[];
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

function write(list: Product[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("reddy_products_changed"));
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);

  useEffect(() => {
    setProducts(read());
    const sync = () => setProducts(read());
    window.addEventListener("reddy_products_changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("reddy_products_changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = useCallback((list: Product[]) => {
    write(list);
    setProducts(list);
  }, []);

  const upsert = useCallback((p: Product) => {
    const list = read();
    const idx = list.findIndex((x) => x.id === p.id);
    if (idx >= 0) list[idx] = p;
    else list.push(p);
    write(list);
    setProducts(list);
  }, []);

  const remove = useCallback((id: string) => {
    const list = read().filter((x) => x.id !== id);
    write(list);
    setProducts(list);
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("reddy_products_changed"));
    setProducts(DEFAULT_PRODUCTS);
  }, []);

  return { products, save, upsert, remove, reset };
}
