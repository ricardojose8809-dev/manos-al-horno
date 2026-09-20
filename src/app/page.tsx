import Link from "next/link";
import Hero from "@/components/Hero";
import ProductoCard from "@/components/ProductoCard";
import { getCategorias, getProductos } from "@/lib/queries";

export const revalidate = 60; // ISR: se regenera cada 60 segundos

export default async function HomePage() {
  const [categorias, productos] = await Promise.all([
    getCategorias(),
    getProductos(),
  ]);

  return (
    <>
      <Hero />

      {categorias.map((categoria) => {
        const items = productos.filter((p) => p.categoria_id === categoria.id);

        return (
          <section key={categoria.id} className="mt-12">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold">{categoria.nombre}</h2>
                {categoria.descripcion && (
                  <p className="text-stone-600">{categoria.descripcion}</p>
                )}
              </div>
              <Link
                href={`/categorias/${categoria.slug}`}
                className="text-sm font-medium text-amber-800 hover:underline"
              >
                Ver todos →
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}