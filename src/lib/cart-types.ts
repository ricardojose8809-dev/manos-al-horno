export type CartItem = {
  id: number; // id del producto (slice y completo ya son filas distintas)
  nombre: string;
  precio: number;
  imagen_url: string | null;
  cantidad: number;
};