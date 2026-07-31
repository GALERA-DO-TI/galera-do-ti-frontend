export default function EventosLoading() {
  return (
    <div className="flex flex-1">
      <div className="hidden lg:block w-[250px] shrink-0 bg-eventos-sidebar" />

      <main className="flex flex-1 flex-col gap-8 bg-eventos-page p-6">
        <div className="h-8 w-40 animate-pulse rounded bg-white/10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[330px] w-full animate-pulse rounded-2xl border border-eventos-border bg-eventos-card"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
