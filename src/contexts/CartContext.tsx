"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/cart-types";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cantidad">, cantidad?: number) => void;
  removeItem: (id: number) => void;
  updateCantidad: (id: number, cantidad: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrecio: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "manos-al-horno-carrito";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Cargar el carrito guardado al abrir la página
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage no disponible: empezamos con carrito vacío
    }
    setHydrated(true);
  }, []);

  // Guardar cada cambio, pero solo después de haber cargado
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // almacenamiento lleno o bloqueado: seguimos sin persistir
    }
  }, [items, hydrated]);

  function addItem(item: Omit<CartItem, "cantidad">, cantidad = 1) {
    setItems((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...prev, { ...item, cantidad }];
    });
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateCantidad(id: number, cantidad: number) {
    if (cantidad < 1) return removeItem(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, i) => sum + i.cantidad, 0);
  const totalPrecio = items.reduce((sum, i) => sum + i.cantidad * i.precio, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateCantidad, clearCart, totalItems, totalPrecio }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}