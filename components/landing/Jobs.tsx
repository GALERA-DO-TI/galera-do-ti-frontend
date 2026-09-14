"use client";

import CarouselDots from "@/components/ui/CarouselDots";
import PillLink from "@/components/ui/PillLink";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";

const JOBS = [
  {
    tag: "FRONT-END",
    tagColor: "#38b6ff",
    title: "Desenvolvedor(a) Front-end Júnior",
    description: "Empresa de produto digital",
    meta: "Remoto • CLT",
    stack: ["React", "TypeScript"],
    published: "Publicada recentemente",
    featured: true,
  },
  {
    tag: "DADOS",
    tagColor: "#b44cff",
    title: "Analista de Dados Pleno",
    description: "Consultoria de tecnologia",
    meta: "Híbrido • PJ",
    stack: ["Python", "Power BI"],
    published: "Publicada recentemente",
    featured: false,
  },
  {
    tag: "UX/UI",
    tagColor: "#ff2daf",
    title: "Product Designer",
    description: "Startup em crescimento",
    meta: "Remoto • CLT",
    stack: ["Figma", "Research"],
    published: "Publicada recentemente",
    featured: false,
  },
];

export default function Jobs() {
  const { ref, index, scrollTo } = useCarouselIndex<HTMLDivElement>(JOBS.length);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Oportunidades para todos os momentos da carreira
            </p>
            <h2 className="mt-3 max-w-lg text-2xl font-extrabold md:text-3xl">
              Seu próximo desafio pode começar aqui.
            </h2>
            <p className="mt-2 max-w-lg text-on-surface">
              Vagas selecionadas, empresas próximas da comunidade e processos
              pensados para diferentes níveis de experiência.
            </p>
          </div>
          <PillLink href="#">
            Ver todas as vagas <span className="text-accent">→</span>
          </PillLink>
        </div>

        <div
          ref={ref}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {JOBS.map((job) => (
            <div
              key={job.title}
              className={`group w-[80%] shrink-0 snap-center rounded-xl border bg-accent-3 p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent-6/60 hover:shadow-lg hover:shadow-accent-6/10 md:w-auto md:shrink ${
                job.featured ? "border-accent-2 shadow-lg shadow-accent-2/20" : "border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="rounded-full bg-[#121227] px-2 py-1 text-[10px] font-bold uppercase tracking-wide"
                  style={{ color: job.tagColor }}
                >
                  {job.tag}
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#121227] text-on-surface transition-all duration-200 hover:scale-110 hover:text-accent-6">
                  ☆
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-on-surface">{job.description}</p>
              <h3 className="mt-1 text-base font-bold">{job.title}</h3>
              <p className="mt-3 text-sm text-on-surface">{job.meta}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-primary bg-[#121227] px-1.5 py-1 text-[10px] font-medium text-[#b8bce0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-primary pt-4 text-xs">
                <span className="text-[#8a8fb5]">{job.published}</span>
                <a
                  href="#"
                  className="group/link text-xs font-semibold transition-colors duration-200 hover:text-accent-6"
                >
                  Ver vaga{" "}
                  <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <CarouselDots count={JOBS.length} index={index} onSelect={scrollTo} />
      </div>
    </section>
  );
}
