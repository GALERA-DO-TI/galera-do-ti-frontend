"use client";

import { useRef } from "react";
import Link from "next/link";
import { Evento } from "@/interfaces/events";
import EventoCard from "./EventoCard";
import EventoCardCompacto from "./EventoCardCompacto";
import EmptyState from "./EmptyState";

interface EventosGridProps {
  titulo: string;
  eventos: Evento[];
  verTodosHref?: string;
  /** Card grande (360x330) só no desktop; abaixo disso sempre usa o compacto. */
  destaque?: boolean;
  mensagemVazia?: string;
}

export default function EventosGrid({
  titulo,
  eventos,
  verTodosHref,
  destaque,
  mensagemVazia = "Ainda não temos eventos agendados.",
}: EventosGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPorCard = (direcao: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;
    const primeiroCard = container.querySelector<HTMLElement>("[data-evento-card]");
    const largura = (primeiroCard?.offsetWidth ?? 250) + 24;
    container.scrollBy({ left: direcao * largura, behavior: "smooth" });
  };

  const avancar = () => scrollPorCard(1);
  const voltar = () => scrollPorCard(-1);

  return (
    <section className="flex flex-col gap-2 md:gap-[10px] lg:gap-3">
      <h2 className="text-[16px] font-bold text-white">{titulo}</h2>

      {eventos.length === 0 && <EmptyState mensagem={mensagemVazia} />}

      <div
        ref={scrollRef}
        className="scrollbar-none flex gap-[5px] overflow-x-auto scroll-smooth pb-2 md:gap-2 lg:gap-3"
      >
        {eventos.map((evento, index) => (
          <div key={evento.id} className="flex shrink-0">
            {index > 0 && (
              <button
                onClick={voltar}
                aria-label="Ver evento anterior"
                className="-mr-6 w-6 shrink-0 cursor-pointer"
              />
            )}
            <div data-evento-card>
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
            <button
              onClick={avancar}
              aria-label="Ver próximo evento"
              className="-ml-6 w-6 shrink-0 cursor-pointer"
            />
          </div>
        ))}

        {verTodosHref && eventos.length > 0 && (
          <Link
            href={verTodosHref}
            className={
              destaque
                ? "flex h-[230px] w-[128px] lg:h-[330px] lg:w-[260px] shrink-0 items-center justify-center gap-1 rounded-2xl border border-eventos-border bg-eventos-card text-sm font-medium text-white hover:bg-white/5"
                : "flex h-[230px] w-[128px] lg:h-[280px] lg:w-[260px] shrink-0 items-center justify-center gap-1 rounded-2xl border border-eventos-border bg-eventos-card text-sm font-medium text-white hover:bg-white/5"
            }
          >
            Ver todos
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </section>
  );
}
