"use client";

import MascotePlaceholder from "./MascotePlaceholder";
import { buscasPopulares } from "./parceirosMock";

interface ParceirosBuscaVaziaProps {
  termo: string;
  onLimparFiltros?: () => void;
  onVerTodos?: () => void;
  onBuscarTermo?: (termo: string) => void;
}

export default function ParceirosBuscaVazia({
  termo,
  onLimparFiltros,
  onVerTodos,
  onBuscarTermo,
}: ParceirosBuscaVaziaProps) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-eventos-border bg-eventos-card px-4 py-8 text-center sm:px-6 sm:py-10">
      <MascotePlaceholder className="h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40" />

      <div>
        <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
          Nenhum parceiro encontrado para
        </h2>
        {termo && (
          <p className="mt-1 text-lg font-bold sm:text-xl lg:text-2xl">
            <span className="bg-gradient-to-r from-eventos-pink to-eventos-purple bg-clip-text text-transparent">
              “{termo}”
            </span>
          </p>
        )}
      </div>

      <p className="max-w-xl text-sm text-eventos-muted">
        Não encontramos benefícios ou parceiros que combinem com essa busca no
        momento. Tente buscar por outro termo ou aplicar outros filtros.
      </p>

      <hr className="w-full max-w-2xl border-white/10" />

      <div className="flex flex-col items-center gap-4">
        <span className="text-sm text-eventos-muted">Buscas populares</span>
        <div className="flex flex-wrap justify-center gap-3">
          {buscasPopulares.map((termoSugerido) => (
            <button
              key={termoSugerido}
              type="button"
              onClick={() => onBuscarTermo?.(termoSugerido)}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-eventos-muted hover:bg-white/5"
            >
              {termoSugerido}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onLimparFiltros}
          className="rounded-full border border-eventos-purple px-6 py-3 text-sm font-semibold text-white hover:bg-white/5"
        >
          Limpar filtros
        </button>
        <button
          type="button"
          onClick={onVerTodos}
          className="rounded-full bg-gradient-to-r from-eventos-pink to-eventos-purple px-6 py-3 text-sm font-semibold text-white"
        >
          Ver todos os parceiros
        </button>
      </div>
    </div>
  );
}
