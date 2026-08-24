"use client";

const ABAS = ["Sobre", "Programação", "Palestrantes", "Localização", "Links"] as const;
export type AbaEvento = (typeof ABAS)[number];
export { ABAS };

interface EventoTabsProps {
  abaAtiva: AbaEvento;
  onChange: (aba: AbaEvento) => void;
}

export default function EventoTabs({ abaAtiva, onChange }: EventoTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Seções de detalhes do evento"
      className="scrollbar-none flex gap-6 overflow-x-auto border-b border-eventos-border"
    >
      {ABAS.map((aba) => (
        <button
          key={aba}
          id={`aba-${aba}`}
          type="button"
          role="tab"
          aria-selected={abaAtiva === aba}
          aria-controls={`painel-${aba}`}
          onClick={() => onChange(aba)}
          className={`shrink-0 whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
            abaAtiva === aba
              ? "border-eventos-pink text-eventos-pink"
              : "border-transparent text-eventos-muted hover:text-white"
          }`}
        >
          {aba}
        </button>
      ))}
    </div>
  );
}
