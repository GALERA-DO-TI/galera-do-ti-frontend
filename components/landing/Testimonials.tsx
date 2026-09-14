"use client";

import Image from "next/image";
import CarouselDots from "@/components/ui/CarouselDots";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";

const QUOTE =
  "Se você busca um ambiente de alto nível técnico, a Galera do TI é o lugar certo. A troca diária de conhecimento sobre desenvolvimento, arquitetura e segurança me ajuda constantemente a entregar aplicações mais rápidas e estáveis. É uma rede de apoio essencial na minha rotina como desenvolvedor";

const TESTIMONIALS = Array.from({ length: 4 }, () => ({
  name: "Matheus dev",
  handle: "@mathSilms",
  role: "Dev fullstack java",
  quote: QUOTE,
}));

export default function Testimonials() {
  const { ref, index, scrollTo } = useCarouselIndex<HTMLDivElement>(TESTIMONIALS.length);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-2xl font-extrabold md:text-3xl">
          Quer saber o que a galera pensa?
        </h2>
        <p className="mt-2 text-on-surface">
          Deixe você também seu recado no nosso mural!
        </p>

        <div
          ref={ref}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 text-left [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex w-[80%] shrink-0 snap-center flex-col gap-3 rounded-2xl border border-primary bg-accent-3 p-4 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent-6/60 hover:shadow-lg hover:shadow-accent-6/10 md:w-auto md:shrink"
            >
              <div className="flex items-center gap-1.5">
                <div className="relative h-9 w-9 shrink-0">
                  <Image
                    src="/assets/testimonial-avatar.png"
                    alt={t.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <span className="absolute right-0 top-0 h-2 w-2 rounded-full border border-white bg-success" />
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-on-surface">{t.handle}</p>
                  <p className="text-xs font-semibold text-accent-6">{t.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-on-surface">
                <span className="text-accent" aria-hidden>&ldquo;</span>
                {t.quote}
                <span className="text-accent" aria-hidden>&rdquo;</span>
              </p>
            </div>
          ))}
        </div>

        <CarouselDots count={TESTIMONIALS.length} index={index} onSelect={scrollTo} />
      </div>
    </section>
  );
}
