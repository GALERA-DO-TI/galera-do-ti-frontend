"use client";

import { useState } from "react";
import Image from "next/image";
import { Parceiro, StatusParceiro } from "@/interfaces/parceiros";
import LogoPlaceholder from "./LogoPlaceholder";
import {
  IconCopy,
  IconCheck,
  IconExternalLink,
  IconLock,
} from "./icons";

interface ParceiroCardProps {
  parceiro: Parceiro;
  deslogado?: boolean;
  onResgatar?: (parceiro: Parceiro) => void;
}

const BORDA: Record<StatusParceiro, string> = {
  disponivel:
    "border-eventos-cyan/40 shadow-[0_0_22px_rgba(34,228,255,0.12)]",
  resgatado:
    "border-eventos-purple/60 shadow-[0_0_22px_rgba(123,47,247,0.16)]",
  expirado: "border-white/5",
  bloqueado:
    "border-eventos-pink/50 shadow-[0_0_22px_rgba(255,45,175,0.14)]",
};

const BADGE: Record<StatusParceiro, { texto: string; classe: string }> = {
  disponivel: {
    texto: "Disponível",
    classe: "text-[#0bc33f] border-[#0bc33f]/50",
  },
  resgatado: {
    texto: "Resgatado",
    classe: "text-eventos-cyan border-eventos-cyan/50",
  },
  expirado: {
    texto: "Expirado",
    classe: "text-zinc-500 border-zinc-600/60",
  },
  bloqueado: {
    texto: "Bloqueado",
    classe: "text-eventos-pink border-eventos-pink/60",
  },
};

function StatusBadge({ status }: { status: StatusParceiro }) {
  const { texto, classe } = BADGE[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold @sm:text-xs ${classe}`}
    >
      {status === "bloqueado" ? (
        <IconLock className="h-3 w-3" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {texto}
    </span>
  );
}

export default function ParceiroCard({
  parceiro,
  deslogado,
  onResgatar,
}: ParceiroCardProps) {
  const [copiado, setCopiado] = useState(false);

  const status: StatusParceiro =
    deslogado && parceiro.exigeLogin ? "bloqueado" : parceiro.status;
  const apagado = status === "expirado";

  const copiarCupom = async () => {
    try {
      await navigator.clipboard.writeText(parceiro.cupom);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    } catch {
    }
  };

  return (
    <article
      className={`@container flex h-full flex-col rounded-2xl border bg-eventos-card ${BORDA[status]}`}
    >
      <div className="flex h-full flex-col gap-3 p-4 @sm:p-5">
        <div className="flex justify-end">
          <StatusBadge status={status} />
        </div>

        <div className={`flex items-center gap-3 ${apagado ? "opacity-60" : ""}`}>
          <span className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#01061a] @sm:h-14 @sm:w-24">
            {parceiro.logoUrl ? (
              <Image
                src={parceiro.logoUrl}
                alt={parceiro.nome ?? "Parceiro"}
                width={160}
                height={80}
                className="h-full w-full object-contain p-1.5"
              />
            ) : (
              <LogoPlaceholder nome={parceiro.nome} className="h-full w-full" />
            )}
          </span>

          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="truncate text-base font-bold text-white @sm:text-lg">
              {parceiro.nome ?? "Cupom"}
            </h3>
            <span
              className={`w-fit rounded-md bg-eventos-purple/20 px-2 py-0.5 text-xs font-medium text-eventos-muted ${
                status === "bloqueado" ? "opacity-40" : ""
              }`}
            >
              {parceiro.categoria}
            </span>
          </div>
        </div>

        {/* Descrição */}
        <p
          className={`line-clamp-2 text-sm text-eventos-muted ${apagado ? "opacity-60" : ""}`}
        >
          {parceiro.descricao}
        </p>

        {/* Cupom */}
        <div className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-white/15 bg-black/20 px-3 py-2">
          <span
            className={`min-w-0 truncate text-sm font-semibold tracking-wide text-white ${
              apagado ? "line-through opacity-60" : ""
            }`}
          >
            {parceiro.cupom}
          </span>

          {status === "resgatado" ? (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-eventos-cyan text-eventos-cyan">
              <IconCheck className="h-4 w-4" />
            </span>
          ) : (
            <button
              type="button"
              onClick={copiarCupom}
              disabled={apagado}
              aria-label={copiado ? "Cupom copiado" : "Copiar cupom"}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 text-zinc-400 transition-colors hover:text-white disabled:cursor-not-allowed ${
                apagado ? "opacity-60" : ""
              }`}
            >
              {copiado ? (
                <IconCheck className="h-4 w-4 text-eventos-cyan" />
              ) : (
                <IconCopy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Saiba mais */}
        <a
          href={parceiro.saibaMaisUrl ?? "#"}
          className={`ml-auto flex items-center gap-1.5 text-sm font-medium text-eventos-muted underline underline-offset-2 hover:text-white ${
            apagado ? "opacity-60" : ""
          }`}
        >
          Saiba mais
          <IconExternalLink className="h-3.5 w-3.5" />
        </a>

        {/* CTA — empurrado para a base para alinhar cards lado a lado */}
        <div className="mt-auto">
          {status === "disponivel" && (
            <button
              type="button"
              onClick={() => onResgatar?.(parceiro)}
              className="w-full rounded-xl bg-gradient-to-r from-eventos-pink to-[#3d8bff] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(255,45,175,0.25)] @sm:text-base"
            >
              Resgatar Benefício
            </button>
          )}

          {status === "resgatado" && (
            <button
              type="button"
              disabled
              className="w-full rounded-xl border border-eventos-cyan px-4 py-3 text-sm font-semibold text-eventos-cyan @sm:text-base"
            >
              Benefício Resgatado
            </button>
          )}

          {status === "expirado" && (
            <button
              type="button"
              disabled
              className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-400 @sm:text-base"
            >
              Expirado!
            </button>
          )}

          {status === "bloqueado" && (
            <a
              href="/parceiros?preview=logado"
              className="flex w-full items-center gap-3 rounded-xl border border-white/15 px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15">
                <IconLock className="h-4 w-4" />
              </span>
              <span className="flex-1 text-center">
                Faça login para visualizar benefício!
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
