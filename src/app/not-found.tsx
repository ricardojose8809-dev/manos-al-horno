import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-5xl">🍰</p>
      <h2 className="mt-4 text-2xl font-bold">Esta página no existe</h2>
      <p className="mt-2 text-stone-600">
        Puede que el postre se haya acabado o que la dirección esté mal escrita.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-amber-700 px-6 py-2.5 font-semibold text-white transition hover:bg-amber-800"
      >
        Volver al inicio
      </Link>
    </div>
  );
}