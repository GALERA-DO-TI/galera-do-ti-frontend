"use client";

interface ParceirosBannerProps {
  /** Label do botão. Varia entre "Quero ser parceiro" e "Torne-se parceiro". */
  labelBotao?: string;
  onAbrirProposta?: () => void;
}

export default function ParceirosBanner({
  labelBotao = "Quero ser parceiro",
  onAbrirProposta,
}: ParceirosBannerProps) {
  return (
    <div className="@container rounded-2xl border border-eventos-border bg-gradient-to-br from-[#101025] via-[#15102a] to-[#250d2d]">
      <div className="flex flex-col items-start gap-4 p-5 @sm:flex-row @sm:items-center @sm:justify-between @lg:p-6">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-white @2xl:text-lg">
            É uma empresa? Torne-se parceiro da Galera do TI
          </h2>
          <p className="mt-1 text-xs text-eventos-muted @lg:text-sm">
            Alcance +15.2K membros e mais de 180 empresas já na rede.
          </p>
        </div>

        <button
          type="button"
          onClick={onAbrirProposta}
          className="shrink-0 whitespace-nowrap rounded-full bg-gradient-to-r from-eventos-pink to-eventos-purple px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_18px_rgba(255,45,175,0.3)] @lg:px-6 @lg:py-3"
        >
          {labelBotao}
        </button>
      </div>
    </div>
  );
}
