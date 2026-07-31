import Image from "next/image";
import { Evento } from "@/services/eventos";

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
      className={`flex h-[110px] w-full max-w-[500px] items-center gap-4 overflow-hidden rounded-2xl p-3 ${
        confirmado
          ? "bg-gradient-to-r from-[#FF2DAF] to-[#7B2FF7]"
          : "bg-gradient-to-r from-[#3B4CCA] to-[#22E4FF]"
      }`}
    >
      {confirmado ? (
        <div className="flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-xl bg-white p-2">
          <span className="text-[10px] text-black">QR Code</span>
        </div>
      ) : (
        <div className="relative h-[86px] w-[86px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#3D1A6E] via-[#1B0F3D] to-[#0A0520]">
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

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-baseline gap-2 text-white">
          <span className="text-xl font-bold leading-none">{evento.dia}</span>
          <span className="text-xs uppercase">{evento.mes}</span>
        </div>
        <h3 className="truncate text-sm font-semibold text-white">
          {evento.titulo}
        </h3>
        <span className="text-xs text-white/80">{evento.categoria}</span>
        <span className="text-xs text-white/80">{evento.local}</span>
      </div>

      <button className="shrink-0 rounded-full bg-white/20 px-3 py-2 text-xs font-medium text-white">
        Ver detalhes
      </button>
    </div>
  );
}
