const pulso = "animate-pulse rounded-lg bg-white/[0.07]";

function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-eventos-border bg-eventos-card p-4 @sm:p-5">
      <div className="flex justify-end">
        <div className={`h-6 w-20 rounded-full ${pulso}`} />
      </div>
      <div className="flex items-center gap-3">
        <div className={`h-12 w-16 shrink-0 @sm:h-14 @sm:w-24 ${pulso}`} />
        <div className="flex flex-1 flex-col gap-2">
          <div className={`h-3.5 w-28 ${pulso}`} />
          <div className={`h-3 w-16 ${pulso}`} />
        </div>
      </div>
      <div className={`h-3 w-full ${pulso}`} />
      <div className={`h-3 w-2/3 ${pulso}`} />
      {/* Placeholder do cupom: borda tracejada roxa (spec do Figma) */}
      <div className="flex h-11 items-center justify-between rounded-lg border border-dashed border-eventos-purple/50 px-3">
        <div className={`h-3 w-1/2 ${pulso}`} />
        <div className={`h-7 w-7 ${pulso}`} />
      </div>
      <div className={`ml-auto h-3 w-20 ${pulso}`} />
      <div className="h-11 w-full animate-pulse rounded-xl bg-gradient-to-r from-eventos-purple/30 to-white/[0.07]" />
    </div>
  );
}

/** Carregamento: banner, busca, chips, ordenação e cards. */
export default function ParceirosSkeleton() {
  return (
    <div className="@container flex flex-col gap-6" aria-busy="true" aria-label="Carregando parceiros">
      {/* Banner */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-eventos-border bg-eventos-card p-5">
        <div className="flex flex-1 flex-col gap-2">
          <div className={`h-3.5 w-3/5 ${pulso}`} />
          <div className={`h-3 w-2/5 ${pulso}`} />
        </div>
        <div className={`h-10 w-32 shrink-0 rounded-full @lg:w-44 ${pulso}`} />
      </div>
      {/* Busca */}
      <div className="flex h-12 items-center gap-3 rounded-xl border border-eventos-border bg-eventos-card px-4">
        <div className={`h-4 w-4 rounded-full ${pulso}`} />
        <div className={`h-3 w-2/3 ${pulso}`} />
      </div>
      {/* Chips */}
      <div className="scrollbar-none flex gap-2 overflow-hidden">
        <div className="h-9 w-20 shrink-0 rounded-full bg-white/10" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`h-9 w-24 shrink-0 rounded-full ${pulso}`} />
        ))}
      </div>
      {/* Ordenar + abas */}
      <div className="flex flex-col gap-4 rounded-2xl border border-eventos-border bg-eventos-card p-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-eventos-muted">Ordenar por:</span>
          <div className={`h-9 w-24 @sm:w-40 ${pulso}`} />
          <div className={`ml-auto h-8 w-8 ${pulso}`} />
        </div>
        <div className="flex gap-4 overflow-hidden">
          <div className="h-10 w-28 shrink-0 rounded-full bg-white/10" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex shrink-0 flex-col gap-2">
              <div className={`h-3 w-24 ${pulso}`} />
              <div className={`h-3 w-6 ${pulso}`} />
            </div>
          ))}
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @xl:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
