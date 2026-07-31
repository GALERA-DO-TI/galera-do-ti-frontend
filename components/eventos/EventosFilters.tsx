"use client";

import { useState } from "react";

const categorias = ["Todos os eventos", "Presencial", "Online", "Workshop", "Meetup"];

interface EventosFiltersProps {
  onChange?: (categoria: string) => void;
}

export default function EventosFilters({ onChange }: EventosFiltersProps) {
  const [ativo, setAtivo] = useState(categorias[0]);

  const selecionar = (categoria: string) => {
    setAtivo(categoria);
    onChange?.(categoria);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          onClick={() => selecionar(categoria)}
          className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
            ativo === categoria
              ? "bg-gradient-to-r from-[#FF2DAF] to-[#7B2FF7] text-white"
              : "bg-eventos-card text-zinc-300 hover:bg-white/10"
          }`}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}
