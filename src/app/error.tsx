"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h2 className="text-2xl font-bold">Algo salió mal</h2>
      <p className="mt-2 text-stone-600">
        No pudimos cargar los postres. Intenta de nuevo en un momento.
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-6 rounded-full bg-amber-700 px-6 py-2.5 font-semibold text-white transition hover:bg-amber-800"
      >
        Reintentar
      </button>
    </div>
  );
}