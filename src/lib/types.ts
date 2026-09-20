export type Categoria = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
};

export type Producto = {
  id: number;
  nombre: string;
  postre: string;
  descripcion: string | null;
  ingredientes: string[];
  precio: number;
  porciones: number;
  imagen_url: string | null;
  categoria_id: number;
  // viene del JOIN: select("*, categorias(nombre, slug)")
  categorias?: Pick<Categoria, "nombre" | "slug"> | null;
};