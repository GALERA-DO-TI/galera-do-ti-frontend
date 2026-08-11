import Image from "next/image";
import { Evento } from "@/interfaces/events";
import { IconLocation } from "@/components/shared/icons";

interface EventoTicketCardProps {
  evento: Evento;
  confirmado?: boolean;
}

export default function EventoTicketCard({
  evento,
  confirmado,
}: EventoTicketCardProps) {
  return (
    <div
      className={`relative flex h-[110px] w-full max-w-[500px] items-center gap-4 overflow-hidden pr-3 ${
        confirmado
          ? "rounded-xl bg-gradient-to-r from-eventos-pink to-eventos-purple shadow-[0_0_18px_0_rgba(255,45,175,0.45)]"
          : "rounded-[10px] bg-[#1379f0]"
      }`}
    >
      {confirmado && evento.temQrCode ? (
        <div className="ml-[21px] flex h-[61px] w-[67px] shrink-0 items-center justify-center rounded-lg bg-white p-1">
          <span className="text-[10px] text-black">QR Code</span>
        </div>
      ) : (
        <div className="relative h-full w-[115px] shrink-0 overflow-hidden bg-gradient-to-br from-[#3D1A6E] via-[#1B0F3D] to-[#0A0520]">
          {evento.imagemUrl && (
            <Image
              src={evento.imagemUrl}
              alt={evento.titulo}
              fill
              className="object-cover object-center"
            />
          )}
        </div>
      )}

      <div className="flex items-center gap-4 text-white">
        <span className="text-2xl font-bold leading-none">{evento.dia}</span>
        <span className="text-sm uppercase">{evento.mes}</span>
      </div>

      <div className="h-[102px] w-px bg-white/30" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="truncate text-sm font-bold text-white">
          {evento.titulo}
        </h3>
        <span className="text-xs text-white/90">{evento.categoria}</span>
        <span className="flex min-w-0 items-center gap-1 text-xs text-white/90">
          <IconLocation className="h-[17px] w-[17px] shrink-0" />
          <span className="truncate">{evento.local}</span>
        </span>
      </div>

      <button className="shrink-0 rounded-[8px] bg-eventos-pink px-4 py-2 text-[13px] font-semibold text-white">
        Ver detalhes
      </button>

      {evento.finalizado && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-eventos-card/70">
          <p className="text-sm font-normal text-white">
            Este evento já foi finalizado.
          </p>
        </div>
      )}
    </div>
  );
}
