"use client";

import { useRef } from "react";
import Link from "next/link";
import { Evento } from "@/services/eventos";
import EventoCard from "./EventoCard";

interface EventosGridProps {
  titulo: string;
  eventos: Evento[];
  verTodosHref?: string;
}

const CARD_WIDTH = 360 + 24;

export default function EventosGrid({
  titulo,
  eventos,
  verTodosHref,
}: EventosGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (eventos.length === 0) return null;

  const avancar = () => {
    scrollRef.current?.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
  };

  const voltar = () => {
    scrollRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-white">{titulo}</h2>
      <div
        ref={scrollRef}
        className="scrollbar-none flex gap-6 overflow-x-auto scroll-smooth pb-2"
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
            <EventoCard evento={evento} priority={index === 0} />
            <button
              onClick={avancar}
              aria-label="Ver próximo evento"
              className="-ml-6 w-6 shrink-0 cursor-pointer"
            />
          </div>
        ))}

        {verTodosHref && (
          <Link
            href={verTodosHref}
            className="flex h-[330px] w-[260px] shrink-0 items-center justify-center gap-1 rounded-2xl border border-eventos-border bg-eventos-card text-sm font-medium text-white hover:bg-white/5"
          >
            Ver todos
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </section>
  );
}
