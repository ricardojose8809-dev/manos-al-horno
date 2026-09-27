import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductoCard from "@/components/ProductoCard";
import {
  getCategoriaBySlug,
  getCategorias,
  getProductosByCategoria,
} from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60; // ISR

// SSG: una página por cada categoría (slices y completos)
export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoria = await getCategoriaBySlug(slug);
  if (!categoria) return { title: "Categoría no encontrada" };

  return {
    title: `${categoria.nombre} | Manos al horno`,
    description: categoria.descripcion ?? undefined,
  };
}

export default async function CategoriaPage({ params }: Props) {
  // 1. Leer el parámetro
  const { slug } = await params;

  // 2. Buscar la entidad principal
  const categoria = await getCategoriaBySlug(slug);

  // 3. Si no existe → 404
  if (!categoria) notFound();

  // 4. Consultar sus relacionados
  const productos = await getProductosByCategoria(categoria.id);

  // 5. Renderizar
  return (
    <section>
      <Link href="/" className="text-sm font-medium text-teal-dark hover:underline">
        ← Volver al inicio
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-brown-dark">{categoria.nombre}</h1>
      {categoria.descripcion && (
        <p className="mt-1 text-brown/70">{categoria.descripcion}</p>
      )}

      {productos.length === 0 ? (
        <p className="mt-8 text-brown/70">Todavía no hay productos en esta categoría.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </section>
  );
}