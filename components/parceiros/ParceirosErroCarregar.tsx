"use client";

import MascotePlaceholder from "./MascotePlaceholder";

interface ParceirosErroCarregarProps {
  onTentarNovamente?: () => void;
  onReportar?: () => void;
}

export default function ParceirosErroCarregar({
  onTentarNovamente,
  onReportar,
}: ParceirosErroCarregarProps) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-eventos-border bg-eventos-card px-4 py-8 text-center sm:px-6 sm:py-10">
      <MascotePlaceholder className="h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40" />

      <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
        Não foi possível carregar os parceiros
      </h2>
      <p className="max-w-xl text-sm text-eventos-muted">
        A lista não respondeu a tempo. Sua conexão e os outros painéis continuam
        funcionando normalmente, tente carregar de novo.
      </p>

      <hr className="w-full max-w-2xl border-white/10" />

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onTentarNovamente}
          className="rounded-full bg-gradient-to-r from-eventos-pink to-eventos-purple px-6 py-3 text-sm font-semibold text-white"
        >
          Tentar novamente
        </button>
        <button
          type="button"
          onClick={onReportar}
          className="rounded-full border border-eventos-purple px-6 py-3 text-sm font-semibold text-white hover:bg-white/5"
        >
          Reportar Problema
        </button>
      </div>
    </div>
  );
}
