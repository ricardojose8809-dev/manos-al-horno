import { cache } from "react";
import { supabase } from "./supabase";
import type { Categoria, Producto } from "./types";

export const getCategorias = cache(async (): Promise<Categoria[]> => {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("id");

  if (error) throw new Error(error.message); // → lo atrapa error.tsx
  return (data ?? []) as Categoria[];
});

export const getCategoriaBySlug = cache(
  async (slug: string): Promise<Categoria | null> => {
    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .eq("slug", slug)
      .maybeSingle<Categoria>();

    if (error) throw new Error(error.message);
    return data; // null → notFound()
  }
);

export const getProductos = cache(async (): Promise<Producto[]> => {
  const { data, error } = await supabase
    .from("productos")
    .select("*, categorias(nombre, slug)")
    .order("id");

  if (error) throw new Error(error.message);
  return (data ?? []) as Producto[];
});

export const getProductoById = cache(
  async (id: number): Promise<Producto | null> => {
    const { data, error } = await supabase
      .from("productos")
      .select("*, categorias(nombre, slug)")
      .eq("id", id)
      .maybeSingle<Producto>();

    if (error) throw new Error(error.message);
    return data; // null → notFound()
  }
);

export const getProductosByCategoria = cache(
  async (categoriaId: number): Promise<Producto[]> => {
    const { data, error } = await supabase
      .from("productos")
      .select("*, categorias(nombre, slug)")
      .eq("categoria_id", categoriaId)
      .order("id");

    if (error) throw new Error(error.message);
    return (data ?? []) as Producto[];
  }
);