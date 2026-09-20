"use client";

import { useState } from "react";

export default function AgregarAlPedidoButton({ nombre }: { nombre: string }) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  function agregar() {
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2500);
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full ring-1 ring-stone-300">
          <button
            type="button"
            aria-label="Disminuir cantidad"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="h-10 w-10 text-lg hover:text-amber-800"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{cantidad}</span>
          <button
            type="button"
            aria-label="Aumentar cantidad"
            onClick={() => setCantidad((c) => c + 1)}
            className="h-10 w-10 text-lg hover:text-amber-800"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={agregar}
          className="rounded-full bg-amber-700 px-6 py-2.5 font-semibold text-white transition hover:bg-amber-800"
        >
          Agregar al pedido
        </button>
      </div>

      {agregado && (
        <p role="status" className="mt-3 text-sm text-green-700">
          ✓ Agregaste {cantidad} × {nombre}
        </p>
      )}
    </div>
  );
}