"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/contexts/CartContext";

type Estado = "idle" | "enviando" | "exito" | "error";

export default function CarritoPage() {
  const { items, updateCantidad, removeItem, clearCart, totalPrecio } = useCart();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function enviarPedido(e: FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;

    setEstado("enviando");
    setErrorMsg("");

    try {
      const res = await fetch("/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: { nombre, correo, telefono, notas },
          items,
          total: totalPrecio,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "No se pudo enviar el pedido");
      }

      setEstado("exito");
      clearCart();
    } catch (err) {
      setEstado("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  if (estado === "exito") {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-5xl">🎉</p>
        <h1 className="mt-4 text-2xl font-bold text-brown-dark">¡Pedido enviado!</h1>
        <p className="mt-2 text-brown/70">
          Te contactaremos pronto para confirmar tu pedido y coordinar el envío.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-teal-dark px-6 py-2.5 font-semibold text-white hover:opacity-90"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold text-brown-dark">Tu carrito está vacío</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-teal-dark px-6 py-2.5 font-semibold text-white hover:opacity-90"
        >
          Ver el catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <section>
        <h1 className="text-2xl font-bold text-brown-dark">Tu carrito</h1>

        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 rounded-2xl bg-white p-3 ring-1 ring-teal/20"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-dark/40">
                {item.imagen_url && (
                  <Image
                    src={item.imagen_url}
                    alt={item.nombre}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-brown-dark">{item.nombre}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-brown/50 hover:text-red-600"
                    aria-label={`Quitar ${item.nombre}`}
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full ring-1 ring-teal/40">
                    <button
                      type="button"
                      onClick={() => updateCantidad(item.id, item.cantidad - 1)}
                      className="h-8 w-8 hover:text-teal-dark"
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => updateCantidad(item.id, item.cantidad + 1)}
                      className="h-8 w-8 hover:text-teal-dark"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-brown-dark">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between border-t border-teal/30 pt-4 text-lg font-bold text-brown-dark">
          <span>Total</span>
          <span>${totalPrecio.toFixed(2)}</span>
        </div>
        <p className="mt-2 text-xs text-brown/60">
          El envío no está incluido: su costo varía según tu ubicación y lo
          cotiza nuestro servicio de entrega.
        </p>
      </section>

      <section className="h-fit rounded-2xl bg-white p-6 ring-1 ring-teal/20">
        <h2 className="text-lg font-semibold text-brown-dark">Datos para tu pedido</h2>

        <form onSubmit={enviarPedido} className="mt-4 space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-brown">
              Nombre
            </label>
            <input
              id="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 w-full rounded-lg border border-teal/40 px-3 py-2 outline-none focus:border-teal-dark"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-brown">
              Correo
            </label>
            <input
              id="correo"
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 w-full rounded-lg border border-teal/40 px-3 py-2 outline-none focus:border-teal-dark"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-brown">
              Teléfono
            </label>
            <input
              id="telefono"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-1 w-full rounded-lg border border-teal/40 px-3 py-2 outline-none focus:border-teal-dark"
            />
          </div>

          <div>
            <label htmlFor="notas" className="block text-sm font-medium text-brown">
              Notas e instrucciones de entrega (opcional)
            </label>
            <textarea
              id="notas"
              rows={4}
              placeholder="Dirección, punto de referencia, horario preferido, alergias, etc."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className="mt-1 w-full rounded-lg border border-teal/40 px-3 py-2 outline-none focus:border-teal-dark"
            />
          </div>

          {estado === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

          <button
            type="submit"
            disabled={estado === "enviando"}
            className="w-full rounded-full bg-teal-dark px-6 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {estado === "enviando" ? "Enviando..." : "Enviar pedido"}
          </button>
        </form>
      </section>
    </div>
  );
}