import Link from "next/link";
import { IconUsers } from "@/components/shared/icons";
import { Evento } from "@/interfaces/events";

interface UpcomingEventsStripProps {
  eventos: Evento[];
}

export default function UpcomingEventsStrip({
  eventos,
}: UpcomingEventsStripProps) {
  if (eventos.length === 0) return null;

  return (
    <section className="flex lg:hidden flex-col gap-2 rounded-[18px] bg-[#0e0e22] p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-white">Meus próximos eventos</h2>
        <Link href="/eventos" className="text-xs font-semibold text-eventos-cyan">
          Ver todos
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="flex shrink-0 items-center gap-2 rounded-[999px] border border-eventos-purple bg-[#0e0e22] py-1 pl-1 pr-3"
          >
            <div className="flex h-[42px] w-[41px] shrink-0 flex-col items-center justify-center rounded-[999px] border border-eventos-purple text-[#c9cce5] shadow-[0_8px_12px_6px_rgba(0,0,0,0.15),0_4px_4px_0_rgba(0,0,0,0.3)]">
              <span className="text-sm font-bold leading-none">{evento.dia}</span>
              <span className="text-[8px]">{evento.mes}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-[#f5f5f5]">{evento.titulo}</span>
              <span className="flex items-center gap-1 text-[8px] text-[#f5f5f5]">
                {evento.categoria} • 9h
              </span>
            </div>

            <IconUsers className="h-3 w-3 shrink-0 text-eventos-cyan" />
          </div>
        ))}
      </div>
    </section>
  );
}
