"use client";

export default function EventosError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-eventos-page p-6 text-center">
      <h1 className="text-xl font-semibold text-white">
        Não foi possível carregar os eventos
      </h1>
      <p className="text-sm text-zinc-400">
        Algo deu errado ao buscar os eventos. Tente novamente em instantes.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-eventos-pink px-4 py-2 text-sm font-medium text-white"
      >
        Tentar novamente
      </button>
    </div>
  );
}
