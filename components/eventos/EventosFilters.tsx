"use client";

import { IconSearch } from "@/components/shared/icons";

export const CATEGORIAS = [
  "Todos os eventos",
  "Presencial",
  "Online",
  "Workshop",
  "Meetup",
];

interface EventosFiltersProps {
  /** Categoria selecionada. Componente controlado — quem chama define o estado (hoje, a URL). */
  categoriaAtiva?: string;
  /** Valor atual do campo de busca. Componente controlado pelo mesmo motivo. */
  valorBusca?: string;
  onChange?: (categoria: string) => void;
  onBuscarChange?: (busca: string) => void;
}

export default function EventosFilters({
  categoriaAtiva = CATEGORIAS[0],
  valorBusca = "",
  onChange,
  onBuscarChange,
}: EventosFiltersProps) {
  return (
    <div className="flex flex-col gap-[13px]">
      <div className="flex h-9 lg:h-10 w-full max-w-[408px] lg:max-w-[495px] items-center gap-2 rounded-[999px] border border-[#424350] lg:border-eventos-border bg-[#0a0b1a] lg:bg-eventos-card px-4">
        <IconSearch className="h-4 w-4 shrink-0 text-zinc-400" />
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={valorBusca}
          onChange={(event) => onBuscarChange?.(event.target.value)}
          className="w-full bg-transparent text-xs lg:text-sm text-white placeholder:text-zinc-400 focus:outline-none"
        />
      </div>

      <div className="hidden lg:flex gap-2 overflow-x-auto pb-1">
        {CATEGORIAS.map((categoria) => (
          <button
            key={categoria}
            type="button"
            aria-pressed={categoriaAtiva === categoria}
            onClick={() => onChange?.(categoria)}
            className={`flex h-[34px] shrink-0 items-center rounded-[999px] px-4 text-[13px] font-semibold transition-colors ${
              categoriaAtiva === categoria
                ? "bg-eventos-pink text-white"
                : "bg-[#12122a] text-eventos-muted hover:bg-white/10"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}
