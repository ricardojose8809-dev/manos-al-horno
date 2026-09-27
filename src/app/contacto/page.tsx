import type { Metadata } from "next";
import {
  WhatsAppIcon,
  MailIcon,
  InstagramIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contáctanos | Manos al horno",
  description: "Escríbenos por WhatsApp, correo o Instagram.",
};

const WHATSAPP_NUMERO = "50373182035";
const WHATSAPP_TEXTO = "+(503) 7318-2035";
const CORREO = "manosalhorno.sv@gmail.com";
const INSTAGRAM_USUARIO = "manosalhorno.sv";

export default function ContactoPage() {
  return (
    <section className="mx-auto max-w-2xl text-center">
      <h1 className="text-3xl font-bold text-brown-dark">
        Contáctanos
      </h1>

      <p className="mt-2 text-brown/70">
        Escríbenos por el medio que prefieras, con gusto te ayudamos con tu
        pedido.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMERO}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 ring-1 ring-teal/20 transition hover:shadow-md"
        >
          <WhatsAppIcon className="h-10 w-10 text-teal-dark" />

          <span className="font-semibold text-brown-dark">
            WhatsApp
          </span>

          <span className="text-sm text-brown/70">
            {WHATSAPP_TEXTO}
          </span>
        </a>

        {/* Correo */}
        <a
          href={`mailto:${CORREO}`}
          className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 ring-1 ring-teal/20 transition hover:shadow-md"
        >
          <MailIcon className="h-10 w-10 text-teal-dark" />

          <span className="font-semibold text-brown-dark">
            Correo
          </span>

          <span className="break-all text-sm text-brown/70">
            {CORREO}
          </span>
        </a>

        {/* Instagram */}
        <a
          href={`https://instagram.com/${INSTAGRAM_USUARIO}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 ring-1 ring-teal/20 transition hover:shadow-md"
        >
          <InstagramIcon className="h-10 w-10 text-teal-dark" />

          <span className="font-semibold text-brown-dark">
            Instagram
          </span>

          <span className="text-sm text-brown/70">
            @{INSTAGRAM_USUARIO}
          </span>
        </a>
      </div>
    </section>
  );
}