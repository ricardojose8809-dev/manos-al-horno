export default function Loading() {
  return (
    <div role="status" aria-label="Cargando" className="animate-pulse space-y-8">
      <div className="h-40 rounded-3xl bg-stone-200" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 rounded-2xl bg-stone-200" />
        ))}
      </div>
    </div>
  );
}