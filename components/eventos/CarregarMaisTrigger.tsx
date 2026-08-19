"use client";

import { useEffect, useRef } from "react";

interface CarregarMaisTriggerProps {
  onIntersect: () => void;
  /** Só observa quando há mais itens pra carregar — evita disparar depois que a lista acabou. */
  ativo: boolean;
}

/**
 * Sentinela invisível: dispara `onIntersect` quando entra na viewport,
 * completando o "Carregar mais" com scroll infinito. O botão manual
 * continua sendo o controle principal (mais previsível e acessível por
 * teclado) — isto é só um atalho pra quem rola a página até o fim.
 */
export default function CarregarMaisTrigger({
  onIntersect,
  ativo,
}: CarregarMaisTriggerProps) {
  const sentinelaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ativo) return;
    const alvo = sentinelaRef.current;
    if (!alvo) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas[0]?.isIntersecting) onIntersect();
      },
      { rootMargin: "200px" },
    );
    observer.observe(alvo);
    return () => observer.disconnect();
  }, [ativo, onIntersect]);

  return <div ref={sentinelaRef} aria-hidden className="h-px w-full" />;
}
