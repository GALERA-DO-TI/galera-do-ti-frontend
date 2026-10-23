"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Evento } from "@/interfaces/events";

interface EventoIngressoCardProps {
  evento: Evento;
  logado: boolean;
}

const BASE_CARD =
  "flex flex-col items-center gap-3 rounded-2xl border border-eventos-border bg-eventos-card px-8 py-5 text-center";

/**
 * Card de inscrição da tela de detalhes — 3 estados, um por vez:
 * deslogado (pede login), logado sem inscrição (CTA "Inscrever-se") e
 * logado já inscrito (QR do ingresso). Sem endpoint de inscrição ainda —
 * o toggle abaixo é otimista/local só pra demonstrar o fluxo.
 */
export default function EventoIngressoCard({
  evento,
  logado,
}: EventoIngressoCardProps) {
  const [inscrito, setInscrito] = useState(evento.inscrito ?? false);

  if (!logado) {
    return (
      <div className={BASE_CARD}>
        <h3 className="text-xl font-semibold text-white">Garanta sua vaga!</h3>
        <p className="text-sm font-normal text-eventos-muted">
          Faça seu login ou crie sua conta para se inscrever no evento.
        </p>
        <Image
          src="/ticket-icon.png"
          alt=""
          width={113}
          height={120}
          className="mt-4"
        />
      </div>
    );
  }

  if (inscrito) {
    return (
      <div className={BASE_CARD}>
        <h3 className="text-xl font-semibold text-white">Seu ingresso</h3>
        <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
          Você está inscrito!
        </span>
        {/* Placeholder: geração real do QR depende de endpoint de ingresso — segue o mesmo texto usado em EventoTicketCard. */}
        <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-white">
          <span className="text-xs text-black">QR Code</span>
        </div>
        <p className="text-sm font-medium text-eventos-muted">
          Apresente este QR Code na entrada do evento.
        </p>
      </div>
    );
  }

  return (
    <div className={BASE_CARD}>
      <h3 className="text-xl font-semibold text-white">Confirme sua presença!</h3>
      <p className="text-xs font-normal text-eventos-muted">
        Garanta sua vaga em {evento.titulo}
        {evento.gratuito ? " — inscrição gratuita." : "."}
      </p>
      <button
        type="button"
        onClick={() => setInscrito(true)}
        className="mt-1 flex h-11 w-full items-center justify-center rounded-full bg-linear-to-r from-eventos-pink to-eventos-purple text-sm font-medium text-white shadow-[0_0_18px_0_rgba(255,45,175,0.4)]"
      >
        Inscrever-se
      </button>
    </div>
  );
}
