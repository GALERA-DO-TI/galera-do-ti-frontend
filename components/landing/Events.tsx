import Image from "next/image";
import PillLink from "@/components/ui/PillLink";

const EVENTS = [
  { image: "/assets/screenshot-2026-07-16-at-21-40-17-1.png", city: "São Paulo, SP" },
  { image: "/assets/screenshot-2026-07-16-at-21-40-17-1-2.png", city: "São Paulo, SP" },
  { image: "/assets/screenshot-2026-07-16-at-21-40-17-1-3.png", city: "São Paulo, SP" },
];

export default function Events() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="max-w-lg text-2xl font-extrabold md:text-3xl">
              Participe dos nossos Eventos para a comunidade
            </h2>
            <p className="mt-2 max-w-lg text-on-surface">
              Eventos internos e externos, realizados com parceiros da
              comunidade, para aprender, trocar experiências e criar
              conexões profissionais.
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-accent">
              Oportunidades para todos os momentos da carreira
            </p>
          </div>
          <PillLink href="#">
            Ver todos os eventos <span className="text-accent">→</span>
          </PillLink>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {EVENTS.map((event, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-[#16172b] bg-[#01061a] shadow-lg"
            >
              <div className="relative h-20 w-full md:h-28">
                <Image
                  src={event.image}
                  alt="Foto do evento Dev Summit 2026"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#22e4ff]/20 px-2 py-1 text-[9px] font-semibold text-surface md:px-2.5 md:text-[10px]">
                    Presencial
                  </span>
                  <div className="text-right leading-tight">
                    <p className="text-base font-bold md:text-lg">24</p>
                    <p className="text-[10px] text-surface md:text-xs">MAI</p>
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-bold md:mt-3 md:text-base">Dev Summit 2026</h3>
                <p className="mt-1 hidden text-sm text-on-surface md:block">
                  Um dia inteiro de conteúdo, networking e inovação com
                  grandes nomes de tecnologia.
                </p>
                <div className="mt-3 flex flex-col gap-1 text-xs md:mt-4 md:flex-row md:items-center md:justify-between">
                  <span className="flex items-center gap-1 font-semibold text-accent-6">
                    <span aria-hidden>📍</span>
                    {event.city}
                  </span>
                  <a href="#" className="font-semibold">
                    Saber mais →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
