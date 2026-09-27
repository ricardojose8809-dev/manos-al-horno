"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/carrito"
      aria-label="Ver carrito"
      className="relative text-xl text-brown hover:text-teal-dark"
    >
      🛒
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-dark text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}