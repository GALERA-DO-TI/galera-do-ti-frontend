interface LoadingProps {
  /** Quantidade de cards em esqueleto exibidos na grade. */
  quantidadeCards?: number;
  /** Reserva o espaço da sidebar enquanto a página carrega. */
  comSidebar?: boolean;
}

export default function Loading({
  quantidadeCards = 3,
  comSidebar = true,
}: LoadingProps) {
  return (
    <div className="flex flex-1">
      {comSidebar && (
        <div className="hidden lg:block w-[250px] shrink-0 bg-eventos-sidebar" />
      )}

      <main className="flex flex-1 flex-col gap-8 bg-eventos-page p-6">
        <div className="h-8 w-40 animate-pulse rounded bg-white/10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: quantidadeCards }).map((_, index) => (
            <div
              key={index}
              className="h-[230px] lg:h-[330px] w-full animate-pulse rounded-2xl border border-eventos-border bg-eventos-card"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
