import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ItemPedido = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

type CuerpoPedido = {
  cliente: { nombre: string; correo: string; telefono: string; notas: string };
  items: ItemPedido[];
  total: number;
};

export async function POST(request: Request) {
  let body: CuerpoPedido;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const { cliente, items, total } = body;

  if (!cliente?.nombre || !cliente?.correo || !cliente?.telefono) {
    return NextResponse.json({ error: "Faltan datos del cliente" }, { status: 400 });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
  }

  const filas = items
    .map(
      (item) => `
        <tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">${item.nombre}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center;">${item.cantidad}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">$${item.precio.toFixed(2)}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">$${(item.precio * item.cantidad).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
      <h2>🍰 Nuevo pedido — Manos al horno</h2>
      <p><strong>Cliente:</strong> ${cliente.nombre}</p>
      <p><strong>Correo:</strong> ${cliente.correo}</p>
      <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
      ${cliente.notas ? `<p><strong>Notas / instrucciones de entrega:</strong> ${cliente.notas}</p>` : ""}

      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #3f8a93;">Producto</th>
            <th style="padding:6px 10px;border-bottom:2px solid #3f8a93;">Cant.</th>
            <th style="text-align:right;padding:6px 10px;border-bottom:2px solid #3f8a93;">Precio</th>
            <th style="text-align:right;padding:6px 10px;border-bottom:2px solid #3f8a93;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>

      <p style="margin-top:16px;font-size:1.1em;"><strong>Total: $${total.toFixed(2)}</strong></p>
      <p style="margin-top:4px;font-size:0.85em;color:#6c452f;">
        * No incluye envío. El costo se cotiza aparte según la ubicación del cliente.
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "Manos al horno <onboarding@resend.dev>",
      to: [process.env.PEDIDOS_EMAIL_TO!],
      replyTo: cliente.correo,
      subject: `Nuevo pedido de ${cliente.nombre}`,
      html,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "No se pudo enviar el correo" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}