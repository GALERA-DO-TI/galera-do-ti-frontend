"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Evento } from "@/interfaces/events";
import EventoCard from "./EventoCard";
import EventoCardCompacto from "./EventoCardCompacto";
import EmptyState, { EmptyStateVariant } from "./EmptyState";
import { IconChevronRight } from "@/components/shared/icons";

interface EventosGridProps {
  titulo: string;
  eventos: Evento[];
  verTodosHref?: string;
  /** Card grande (291–380x336–380) só no desktop; abaixo disso sempre usa o compacto. */
  destaque?: boolean;
  /** Variante do EmptyState quando `eventos` está vazio. @default "secao-vazia" */
  emptyVariant?: EmptyStateVariant;
  /** Sobrescreve a mensagem padrão da variante escolhida. */
  emptyMensagem?: string;
}

export default function EventosGrid({
  titulo,
  eventos,
  verTodosHref,
  destaque,
  emptyVariant = "secao-vazia",
  emptyMensagem,
}: EventosGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);

  const atualizarLimites = () => {
    const container = scrollRef.current;
    if (!container) return;
    setPodeVoltar(container.scrollLeft > 0);
    setPodeAvancar(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1,
    );
  };

  useEffect(() => {
    atualizarLimites();
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", atualizarLimites, { passive: true });
    window.addEventListener("resize", atualizarLimites);
    return () => {
      container.removeEventListener("scroll", atualizarLimites);
      window.removeEventListener("resize", atualizarLimites);
    };
    // eventos.length muda o conteúdo rolável, então precisa recalcular os limites.
  }, [eventos.length]);

  const scrollPorCard = (direcao: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;
    const primeiroCard = container.querySelector<HTMLElement>("[data-evento-card]");
    const largura = (primeiroCard?.offsetWidth ?? 250) + 24;
    container.scrollBy({ left: direcao * largura, behavior: "smooth" });
  };

  const mostrarNavegacao = eventos.length > 1;

  return (
    <section className="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-white">{titulo}</h2>

        {mostrarNavegacao && (
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollPorCard(-1)}
              disabled={!podeVoltar}
              aria-label={`Ver eventos anteriores de ${titulo}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-eventos-border text-white disabled:opacity-30 enabled:hover:bg-white/10"
            >
              <IconChevronRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollPorCard(1)}
              disabled={!podeAvancar}
              aria-label={`Ver mais eventos de ${titulo}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-eventos-border text-white disabled:opacity-30 enabled:hover:bg-white/10"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {eventos.length === 0 && (
        <EmptyState variant={emptyVariant} mensagem={emptyMensagem} />
      )}

      <div
        ref={scrollRef}
        className="scrollbar-none flex gap-1.25 overflow-x-auto scroll-smooth pb-2 md:gap-2 lg:gap-3"
      >
        {eventos.map((evento, index) => (
          <div key={evento.id} data-evento-card className="shrink-0">
            {destaque ? (
              <>
                <div className="lg:hidden">
                  <EventoCardCompacto evento={evento} priority={index === 0} />
                </div>
                <div className="hidden lg:block">
                  <EventoCard evento={evento} priority={index === 0} />
                </div>
              </>
            ) : (
              <EventoCardCompacto evento={evento} priority={index === 0} />
            )}
          </div>
        ))}

        {verTodosHref && eventos.length > 0 && (
          <Link
            href={verTodosHref}
            className="flex h-57.5 w-32 lg:h-82.5 lg:w-65 shrink-0 items-center justify-center gap-1 rounded-2xl border border-eventos-border bg-eventos-card text-sm font-medium text-white hover:bg-white/5"
          >
            Ver todos
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </section>
  );
}
