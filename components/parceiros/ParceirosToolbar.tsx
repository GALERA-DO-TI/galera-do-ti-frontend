"use client";

import { IconChevronDown } from "@/components/shared/icons";
import { IconSliders } from "./icons";
import { ResumoParceiros } from "@/interfaces/parceiros";

export type AbaParceiros = "destaque" | "todos" | "recomendados" | "disponiveis";

interface ParceirosToolbarProps {
  aba: AbaParceiros;
  onAbaChange: (aba: AbaParceiros) => void;
  resumo: ResumoParceiros;
  ordenar: string;
  onOrdenarChange: (valor: string) => void;
}

const OPCOES_ORDENACAO = ["Mais relevantes", "Mais recentes", "A-Z"];

export default function ParceirosToolbar({
  aba,
  onAbaChange,
  resumo,
  ordenar,
  onOrdenarChange,
}: ParceirosToolbarProps) {
  const abas: { key: AbaParceiros; label: string; count?: number }[] = [
    { key: "destaque", label: "Em destaque" },
    { key: "todos", label: "Todos os benefícios", count: resumo.todos },
    { key: "recomendados", label: "Recomendados", count: resumo.recomendados },
    { key: "disponiveis", label: "Disponíveis", count: resumo.disponiveis },
  ];

  return (
    <div className="@container rounded-2xl border border-eventos-border bg-eventos-card p-4">
      <div className="flex flex-col gap-4 @4xl:flex-row-reverse @4xl:items-center @4xl:justify-between">
        {/* Ordenar por + toggle de visualização */}
        <div className="flex items-center justify-between gap-3 @4xl:shrink-0 @4xl:justify-end">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 text-sm text-eventos-muted">
              Ordenar por:
            </span>
            <div className="relative min-w-0">
              <select
                value={ordenar}
                onChange={(e) => onOrdenarChange(e.target.value)}
                aria-label="Ordenar benefícios"
                className="w-full max-w-[200px] appearance-none rounded-lg border border-white/10 bg-eventos-page py-2 pl-4 pr-10 text-sm text-white focus:outline-none"
              >
                {OPCOES_ORDENACAO.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-eventos-muted" />
            </div>
          </div>

          <button
            type="button"
            aria-label="Alternar visualização"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-eventos-muted hover:bg-white/5"
          >
            <IconSliders className="h-4 w-4" />
          </button>
        </div>

        {/* Abas com contadores (rolagem horizontal quando não cabem) */}
        <div className="scrollbar-none -mx-1 flex min-w-0 items-center gap-5 overflow-x-auto px-1 @4xl:gap-7">
          {abas.map((item) => {
            const ativo = aba === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onAbaChange(item.key)}
                aria-pressed={ativo}
                className={
                  ativo
                    ? "shrink-0 rounded-full bg-gradient-to-r from-eventos-pink to-eventos-purple px-5 py-2.5 text-sm font-semibold text-white"
                    : "flex shrink-0 flex-col text-left"
                }
              >
                {ativo ? (
                  item.label
                ) : (
                  <>
                    <span className="whitespace-nowrap text-sm text-eventos-muted">
                      {item.label}
                    </span>
                    {item.count !== undefined && (
                      <span className="text-sm font-bold text-eventos-cyan">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
