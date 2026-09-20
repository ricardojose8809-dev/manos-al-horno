import Image from "next/image";
import Link from "next/link";
import type { Producto } from "@/lib/types";

export default function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <Link
      href={`/productos/${producto.id}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-stone-100">
        {producto.imagen_url && (
          <Image
            src={producto.imagen_url}
            alt={producto.nombre}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-4">
        {producto.categorias && (
          <span className="text-xs font-medium uppercase tracking-wide text-amber-700">
            {producto.categorias.nombre}
          </span>
        )}
        <h3 className="mt-1 font-semibold text-stone-900">{producto.nombre}</h3>
        <p className="mt-1 text-sm text-stone-600">
          {producto.porciones > 1 ? `${producto.porciones} porciones` : "1 porción"}
        </p>
        <p className="mt-3 text-lg font-bold text-stone-900">
          ${producto.precio.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}