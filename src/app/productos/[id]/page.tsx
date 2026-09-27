import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AgregarAlPedidoButton from "@/components/AgregarAlPedidoButton";
import { getProductoById, getProductos } from "@/lib/queries";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 60; // ISR

// El id llega como string: lo validamos antes de consultar
function parseId(id: string): number | null {
  const n = Number(id);
  return Number.isInteger(n) && n > 0 ? n : null;
}

// SSG: genera una página por cada producto en el build
export async function generateStaticParams() {
  const productos = await getProductos();
  return productos.map((p) => ({ id: String(p.id) }));
}

// SEO: título y descripción distintos por producto
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const productoId = parseId(id);
  if (productoId === null) return { title: "Producto no encontrado" };

  const producto = await getProductoById(productoId);
  if (!producto) return { title: "Producto no encontrado" };

  return {
    title: `${producto.nombre} | Manos al horno`,
    description: producto.descripcion ?? undefined,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { id } = await params; // en Next 16, params es una Promise

  const productoId = parseId(id);
  if (productoId === null) notFound();

  const producto = await getProductoById(productoId);
  if (!producto) notFound();

  return (
    <article>
      <Link
        href={producto.categorias ? `/categorias/${producto.categorias.slug}` : "/"}
        className="text-sm font-medium text-teal-dark hover:underline"
      >
        ← Volver a {producto.categorias?.nombre ?? "inicio"}
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-dark/40">
          {producto.imagen_url && (
            <Image
              src={producto.imagen_url}
              alt={producto.nombre}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div>
          {producto.categorias && (
            <span className="text-xs font-medium uppercase tracking-wide text-teal-dark">
              {producto.categorias.nombre}
            </span>
          )}
          <h1 className="mt-1 text-3xl font-bold text-brown-dark">{producto.nombre}</h1>
          <p className="mt-2 text-2xl font-bold text-brown-dark">
            ${producto.precio.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-brown/70">
            {producto.porciones > 1
              ? `Rinde ${producto.porciones} porciones`
              : "1 porción"}
          </p>

          {producto.descripcion && (
            <p className="mt-4 text-brown/80">{producto.descripcion}</p>
          )}

          {producto.ingredientes.length > 0 && (
            <>
              <h2 className="mt-6 font-semibold text-brown-dark">Ingredientes</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {producto.ingredientes.map((ing) => (
                  <li
                    key={ing}
                    className="rounded-full bg-cream-dark text-brown-dark px-3 py-1 text-sm"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </>
          )}

          <AgregarAlPedidoButton
                  id={producto.id}
                  nombre={producto.nombre}
                  precio={producto.precio}
                  imagen_url={producto.imagen_url}
          />
        </div>
      </div>
    </article>
  );
}