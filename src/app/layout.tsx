import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import CartIcon from "@/components/CartIcon";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manos al horno | Postres por slice",
  description:
    "Cheesecake, budín, pastel de zanahoria, brownie y tiramisú, por slice o en versión completa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geist.variable} bg-cream text-brown-dark antialiased`}>
        <CartProvider>
          <header className="border-b border-teal/30 bg-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <Link href="/" className="text-xl font-bold text-teal-dark">
                🍰 Manos al horno
              </Link>
              <div className="flex items-center gap-5 text-sm font-medium text-brown">
                <Link href="/categorias/slices" className="hover:text-teal-dark">
                  Slices
                </Link>
                <Link href="/categorias/completos" className="hover:text-teal-dark">
                  Completos
                </Link>
                <CartIcon />
              </div>
            </nav>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

          <footer className="border-t border-teal/30 py-6 text-center text-sm text-brown/70">
            © Manos al horno · Postres hechos a mano
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}