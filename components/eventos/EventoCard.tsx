import Image from "next/image";
import { Evento } from "@/interfaces/events";
import { IconArrowRight, IconLocation } from "@/components/shared/icons";

interface EventoCardProps {
  evento: Evento;
  priority?: boolean;
  onSaberMais?: (evento: Evento) => void;
}

export default function EventoCard({
  evento,
  priority,
  onSaberMais,
}: EventoCardProps) {
  return (
    <div className="relative flex h-82.5 w-90 flex-col overflow-hidden rounded-2xl border border-eventos-border bg-eventos-card shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
      <div className="relative h-35 w-full shrink-0 bg-linear-to-br from-[#3D1A6E] via-[#1B0F3D] to-[#0A0520]">
        {evento.imagemUrl && (
          <Image
            src={evento.imagemUrl}
            alt={evento.titulo}
            fill
            priority={priority}
            className="object-cover"
          />
        )}
      </div>

      <div className="flex items-start justify-between px-3.25 pt-2">
        <span className="rounded-[18px] bg-eventos-cyan/20 px-2.5 py-0.75 text-3.25 font-semibold text-eventos-cyan">
          {evento.categoria}
        </span>

        <div className="text-right leading-none text-white">
          <div className="text-2xl font-bold">{evento.dia}</div>
          <div className="text-sm font-medium">{evento.mes}</div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1 px-3.25 pt-3">
        <h3 className="text-base font-bold text-white">{evento.titulo}</h3>
        <p className="line-clamp-2 text-sm font-normal text-white">
          {evento.descricao}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pb-1">
          <span className="flex min-w-0 items-center gap-1 text-[13px] font-semibold text-eventos-cyan">
            <IconLocation className="h-4 w-4 shrink-0" />
            <span className="truncate">{evento.local}</span>
          </span>

          <button
            type="button"
            onClick={() => onSaberMais?.(evento)}
            className="flex shrink-0 items-center gap-1.5 rounded-[10px] bg-eventos-pink px-3 py-1.5 text-xs font-semibold text-white"
          >
            Saber mais
            <IconArrowRight className="h-3 w-5 shrink-0" />
          </button>
        </div>
      </div>

      {evento.finalizado && (
        <div className="absolute inset-0 flex items-start justify-center rounded-2xl bg-eventos-card/70 pt-23.25">
          <p className="text-sm font-normal text-white">
            Este evento já foi finalizado.
          </p>
        </div>
      )}
    </div>
  );
}
