"use client";

import { IconChevronRight } from "@/components/shared/icons";
import { IconChevronLeft } from "./icons";

interface PaginationProps {
  paginaAtual?: number;
  totalPaginas?: number;
  onChange?: (pagina: number) => void;
}


export default function Pagination({
  paginaAtual = 1,
  totalPaginas = 12,
  onChange,
}: PaginationProps) {
  const item =
    "h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors";
  const inativo = "border-white/10 text-eventos-muted hover:bg-white/5";

  const numero = (p: number, display = "flex") => (
    <button
      key={p}
      type="button"
      onClick={() => onChange?.(p)}
      aria-current={p === paginaAtual ? "page" : undefined}
      className={`${item} ${display} ${
        p === paginaAtual
          ? "border-transparent bg-gradient-to-r from-eventos-pink to-eventos-purple text-white"
          : inativo
      }`}
    >
      {p}
    </button>
  );

  return (
    <nav
      aria-label="Paginação de parceiros"
      className="flex flex-wrap items-center justify-center gap-2 pt-2"
    >
      <button
        type="button"
        onClick={() => onChange?.(Math.max(paginaAtual - 1, 1))}
        aria-label="Página anterior"
        className={`${item} ${inativo} flex md:hidden`}
      >
        <IconChevronLeft className="h-4 w-4" />
      </button>

      {numero(1)}
      {totalPaginas >= 2 && numero(2, "hidden md:flex")}
      {totalPaginas >= 3 && numero(3, "hidden md:flex")}
      {totalPaginas > 4 && (
        <span className={`${item} flex border-white/10 text-eventos-muted`}>…</span>
      )}
      {totalPaginas > 3 && numero(totalPaginas)}

      <button
        type="button"
        onClick={() => onChange?.(Math.min(paginaAtual + 1, totalPaginas))}
        aria-label="Próxima página"
        className={`${item} ${inativo} flex`}
      >
        <IconChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
