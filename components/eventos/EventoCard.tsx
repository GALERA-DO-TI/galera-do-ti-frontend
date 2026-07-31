import Image from "next/image";
import { Evento } from "@/services/eventos";
import { IconLocation } from "@/components/shared/icons";

interface EventoCardProps {
  evento: Evento;
  priority?: boolean;
}

export default function EventoCard({ evento, priority }: EventoCardProps) {
  return (
    <div className="flex flex-col w-[360px] h-[330px] rounded-2xl border border-eventos-border bg-eventos-card shadow-[0_8px_24px_rgba(0,0,0,0.251)] overflow-hidden">
      <div className="relative h-[140px] w-full bg-gradient-to-br from-[#3D1A6E] via-[#1B0F3D] to-[#0A0520]">
        {evento.imagemUrl && (
          <Image
            src={evento.imagemUrl}
            alt={evento.titulo}
            fill
            priority={priority}
            className="object-cover"
          />
        )}

        <span className="absolute left-3 top-3 rounded-full bg-eventos-sidebar/90 px-2.5 py-1 text-[13px] font-semibold text-eventos-cyan">
          {evento.categoria}
        </span>

        <div className="absolute right-3 top-3 text-right leading-none text-white">
          <div className="text-xl font-bold">{evento.dia}</div>
          <div className="text-xs uppercase">{evento.mes}</div>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-2 p-4">
        <h3 className="text-base font-semibold text-white">
          {evento.titulo}
        </h3>
        <p className="text-sm font-normal text-white line-clamp-2">
          {evento.descricao}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-eventos-cyan">
            <IconLocation className="h-4 w-4 shrink-0" />
            {evento.local}
          </span>
          <button className="flex items-center gap-1 rounded-full bg-eventos-pink px-4 py-2 text-sm font-medium text-white">
            Saber mais
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
