"use client";

import { IconSearch, IconClose } from "@/components/shared/icons";

export const categoriasParceiros = [
  "Todos",
  "Cloud",
  "Carreira",
  "Certificação",
  "Cursos",
  "Cupons",
  "Idiomas",
  "Educação",
];

interface ParceirosFiltersProps {
  busca: string;
  onBuscaChange: (valor: string) => void;
  categoria: string;
  onCategoriaChange: (categoria: string) => void;
  /** Chips ativos (termos da busca) exibidos abaixo do campo, removíveis. */
  chipsAtivos?: string[];
  onRemoverChip?: (chip: string) => void;
  onLimparFiltros?: () => void;
}

export default function ParceirosFilters({
  busca,
  onBuscaChange,
  categoria,
  onCategoriaChange,
  chipsAtivos = [],
  onRemoverChip,
  onLimparFiltros,
}: ParceirosFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Busca */}
      <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-eventos-border bg-eventos-card px-4">
        <IconSearch className="h-4 w-4 shrink-0 text-zinc-400" />
        <input
          type="text"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar por  nome do parceiro, tecnologia ou área..."
          className="w-full bg-transparent text-sm text-white placeholder:text-zinc-400 focus:outline-none"
        />
      </div>

      {/* Chips ativos da busca */}
      {chipsAtivos.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {chipsAtivos.map((chip) => (
            <span
              key={chip}
              className="flex items-center gap-2 rounded-lg bg-eventos-card px-3 py-1.5 text-sm text-eventos-muted"
            >
              {chip}
              <button
                type="button"
                onClick={() => onRemoverChip?.(chip)}
                aria-label={`Remover ${chip}`}
                className="text-zinc-500 hover:text-white"
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onLimparFiltros}
            className="text-sm font-semibold text-eventos-cyan hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        /* Categorias */
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          {categoriasParceiros.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoriaChange(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                categoria === cat
                  ? "bg-eventos-purple text-white"
                  : "border border-white/10 text-eventos-muted hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
