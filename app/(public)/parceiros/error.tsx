"use client";

export default function ParceirosError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-eventos-page p-6 text-center">
      <h1 className="text-xl font-semibold text-white">
        Não foi possível carregar os parceiros
      </h1>
      <p className="text-sm text-eventos-muted">
        Algo deu errado ao buscar os parceiros. Tente novamente em instantes.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-gradient-to-r from-eventos-pink to-eventos-purple px-4 py-2 text-sm font-medium text-white"
      >
        Tentar novamente
      </button>
    </div>
  );
}
