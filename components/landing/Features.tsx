"use client";

import CarouselDots from "@/components/ui/CarouselDots";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";

const FEATURES = [
  {
    number: "01",
    color: "#38b6ff",
    title: "Comunidade",
    description:
      "Conheça pessoas da área, troque experiências e construa conexões profissionais que fazem sentido.",
  },
  {
    number: "02",
    color: "#ff2daf",
    title: "Oportunidades",
    description:
      "Encontre vagas, processos seletivos e empresas interessadas em talentos da comunidade.",
  },
  {
    number: "03",
    color: "#b44cff",
    title: "Eventos",
    description:
      "Participe de encontros, workshops, mentorias e experiências que aproximam o mercado.",
  },
  {
    number: "04",
    color: "#22e4ff",
    title: "Projetos",
    description:
      "Colabore em projetos reais, monte squads e transforme ideias em portfólio e experiência.",
  },
];

export default function Features() {
  const { ref, index, scrollTo } = useCarouselIndex<HTMLDivElement>(FEATURES.length);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-6">
          Um ecossistema feito para quem vive tecnologia
        </p>
        <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
          Tudo o que você precisa para avançar.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-on-surface">
          Pessoas, empresas e oportunidades reunidas para movimentar
          conhecimento em movimento de carreira.
        </p>

        <div
          ref={ref}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="group flex w-[75%] shrink-0 snap-center flex-col gap-3 rounded-xl border border-primary bg-accent-3 p-4 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent-6/60 hover:shadow-lg hover:shadow-accent-6/10 md:w-auto md:shrink"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: feature.color }}>
                  {feature.number}
                </span>
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#121227] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: feature.color }}
                >
                  ↗
                </span>
              </div>
              <h3 className="text-base font-bold">{feature.title}</h3>
              <p className="text-sm text-on-surface">{feature.description}</p>
              <div
                className="mt-1 h-0.5 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        <CarouselDots count={FEATURES.length} index={index} onSelect={scrollTo} />
      </div>
    </section>
  );
}
