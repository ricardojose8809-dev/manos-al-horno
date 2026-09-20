import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
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
      <body className={`${geist.variable} bg-stone-50 text-stone-900 antialiased`}>
        <header className="border-b border-stone-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold text-amber-800">
              🍰 Manos al horno
            </Link>
            <div className="flex gap-5 text-sm font-medium text-stone-700">
              <Link href="/categorias/slices" className="hover:text-amber-800">
                Slices
              </Link>
              <Link href="/categorias/completos" className="hover:text-amber-800">
                Completos
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="border-t border-stone-200 py-6 text-center text-sm text-stone-500">
          © Manos al horno · Postres hechos a mano
        </footer>
      </body>
    </html>
  );
}