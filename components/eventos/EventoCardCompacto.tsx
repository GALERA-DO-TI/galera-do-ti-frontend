import Image from "next/image";
import Link from "next/link";
import { Evento } from "@/interfaces/events";
import { IconLocation } from "@/components/shared/icons";

interface EventoCardCompactoProps {
  evento: Evento;
  priority?: boolean;
}

export default function EventoCardCompacto({
  evento,
  priority,
}: EventoCardCompactoProps) {
  return (
    <div className="relative flex h-[230px] w-[200px] lg:h-[280px] lg:w-[250px] flex-col overflow-hidden rounded-2xl border border-eventos-border bg-eventos-card shadow-[0_8px_24px_rgba(0,0,0,0.251)]">
      <div className="relative h-[110px] lg:h-[140px] w-full bg-gradient-to-br from-[#3D1A6E] via-[#1B0F3D] to-[#0A0520]">
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

      <div className="absolute left-3 top-[49px] flex h-[49px] w-[47px] lg:top-[68px] lg:h-[60px] lg:w-[60px] flex-col items-center justify-center rounded-[10px] bg-eventos-card/85 text-white">
        <span className="text-base lg:text-2xl font-bold leading-none">
          {evento.dia}
        </span>
        <span className="text-xs lg:text-sm font-medium">{evento.mes}</span>
      </div>

      <div className="flex flex-1 flex-col gap-1 lg:gap-2 p-2 pt-1 lg:p-3 lg:pt-2">
        <h3 className="text-sm lg:text-base font-bold text-white">
          {evento.titulo}
        </h3>
        <p className="text-xs lg:text-sm font-normal text-white line-clamp-2">
          {evento.descricao}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1 text-xs lg:text-[13px] font-semibold text-eventos-cyan">
            <IconLocation className="h-4 w-4 shrink-0" />
            <span className="truncate">{evento.local}</span>
          </span>

          <Link
            href={`/eventos/${evento.id}`}
            className="flex shrink-0 items-center gap-1 text-[10px] lg:text-[12px] font-semibold text-eventos-cyan underline"
          >
            Ver detalhes
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {evento.finalizado && (
        <div className="absolute inset-0 flex items-start justify-center rounded-2xl bg-eventos-card/70 pt-[30px]">
          <p className="text-center text-xs lg:text-sm font-normal text-white">
            Este evento já foi finalizado.
          </p>
        </div>
      )}
    </div>
  );
}
