"use client";

import Image from "next/image";

interface ParceirosHeroProps {
  onAbrirProposta?: () => void;
}

/**
 * Hero da tela Deslogado (v2)
 */
export default function ParceirosHero({ onAbrirProposta }: ParceirosHeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/5">
      {/* Posicionado por classe (e não `fill`): o CSP do projeto bloqueia o
          style inline que o `fill` usa, e a imagem sairia do lugar em produção. */}
      <Image
        src="/assets/parceiros/hero-parceiros.png"
        alt=""
        width={2048}
        height={743}
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] md:object-right"
        priority
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-eventos-page via-eventos-page/85 to-eventos-page/40 md:bg-gradient-to-r md:from-eventos-page md:via-eventos-page/85 md:to-transparent"
        aria-hidden
      />

      <div className="max-w-xl px-5 pb-10 pt-40 sm:px-8 md:px-10 md:py-20">
        <h1 className="text-[28px] font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          EXPANDA
          <br />
          <span className="bg-gradient-to-r from-eventos-cyan to-eventos-pink bg-clip-text text-transparent">
            SEU ALCANCE
          </span>
          <br />
          <span className="bg-gradient-to-r from-eventos-pink to-eventos-purple bg-clip-text text-transparent">
            TORNE-SE PARCEIRO
          </span>
        </h1>
        <p className="mt-5 max-w-md text-sm text-eventos-muted md:text-base">
          Posicione sua marca no centro de um ecossistema em constante expansão.
          Junte-se a +180 empresas parceiras e tenha contato direto com +15.2K
          membros. Nossa comunidade gera impacto real, movimentando mais de
          +1.250 vagas abertas e promovendo engajamento através de +320 eventos.
        </p>
        <button
          type="button"
          onClick={onAbrirProposta}
          className="mt-8 rounded-full bg-gradient-to-r from-eventos-pink to-eventos-purple px-7 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(255,45,175,0.3)]"
        >
          Quero ser parceiro
        </button>
      </div>
    </section>
  );
}
