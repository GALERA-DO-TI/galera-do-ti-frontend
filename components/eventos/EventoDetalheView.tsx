"use client";

import { ComponentType, useState } from "react";
import Image from "next/image";
import EventosShell from "@/components/eventos/EventosShell";
import EventoTabs, { AbaEvento } from "@/components/eventos/EventoTabs";
import EventoIngressoCard from "@/components/eventos/EventoIngressoCard";
import EventoCtaBanner from "@/components/eventos/EventoCtaBanner";
import EmptyState from "@/components/eventos/EmptyState";
import { Evento } from "@/interfaces/events";
import {
  IconCalendar,
  IconTicket,
  IconUsers,
  IconLocation,
} from "@/components/shared/icons";

interface EventoDetalheViewProps {
  evento: Evento;
  logado?: boolean;
  nomeUsuario?: string;
}

export default function EventoDetalheView({
  evento,
  logado = true,
  nomeUsuario,
}: EventoDetalheViewProps) {
  const [aba, setAba] = useState<AbaEvento>("Sobre");

  return (
    <EventosShell logado={logado} nomeUsuario={nomeUsuario}>
      <div className="flex flex-col gap-6">
        <div className="relative h-45 w-full overflow-hidden rounded-2xl border border-eventos-border md:h-70 bg-gradient-to-br from-[#3D1A6E] via-[#1B0F3D] to-[#0A0520]">
          {evento.imagemUrl && (
            <Image
              src={evento.imagemUrl}
              alt={evento.titulo}
              fill
              priority
              className="object-cover"
            />
          )}
          {evento.finalizado && (
            <div className="absolute inset-0 flex items-center justify-center bg-eventos-card/70">
              <p className="text-sm font-medium text-white">
                Este evento já foi finalizado.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 border-b border-eventos-border pb-4 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-eventos-border bg-eventos-card text-white">
            <span className="text-2xl font-bold leading-none">{evento.dia}</span>
            <span className="text-sm font-medium text-eventos-cyan">{evento.mes}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-white lg:text-[28px]">
              {evento.titulo}
            </h1>
            <p className="text-sm font-medium text-eventos-muted lg:text-base">
              {evento.descricao}
            </p>
          </div>
        </div>

        <InfoStrip evento={evento} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
            <EventoTabs abaAtiva={aba} onChange={setAba} />
            <div
              id={`painel-${aba}`}
              role="tabpanel"
              aria-labelledby={`aba-${aba}`}
              className="flex flex-col gap-4"
            >
              <ConteudoAba aba={aba} evento={evento} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <EventoIngressoCard evento={evento} logado={logado} />
          </div>
        </div>

        {!logado && <EventoCtaBanner evento={evento} />}
      </div>
    </EventosShell>
  );
}

function InfoStrip({ evento }: { evento: Evento }) {
  const itens: { icon: ComponentType<{ className?: string }>; label: string; sub?: string }[] = [];

  if (evento.dataCompleta) {
    itens.push({ icon: IconCalendar, label: evento.dataCompleta, sub: evento.horario });
  }
  if (evento.gratuito !== undefined) {
    itens.push({
      icon: IconTicket,
      label: evento.gratuito ? "Evento Gratuito" : "Evento Pago",
      sub: evento.inscricaoObrigatoria ? "Inscrição Obrigatória" : undefined,
    });
  }
  if (evento.vagas) {
    itens.push({ icon: IconUsers, label: evento.vagas, sub: "Disponíveis" });
  }
  itens.push({
    icon: IconLocation,
    label: evento.enderecoCompleto ?? evento.local,
    sub: evento.enderecoCompleto ? evento.local : undefined,
  });

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-eventos-border pb-4">
      {itens.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <item.icon className="h-5 w-5 shrink-0 text-eventos-cyan" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">{item.label}</span>
            {item.sub && (
              <span className="text-xs font-medium text-eventos-muted">{item.sub}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ConteudoAba({ aba, evento }: { aba: AbaEvento; evento: Evento }) {
  switch (aba) {
    case "Sobre": {
      const paragrafos = evento.sobre ?? (evento.descricao ? [evento.descricao] : []);
      if (paragrafos.length === 0) {
        return (
          <EmptyState
            variant="secao-vazia"
            titulo="Sem informações"
            mensagem="Ainda não há mais detalhes sobre este evento."
          />
        );
      }
      return (
        <div className="flex flex-col gap-3">
          {paragrafos.map((paragrafo, index) => (
            <p key={index} className="text-sm font-normal text-white/90">
              {paragrafo}
            </p>
          ))}
        </div>
      );
    }

    case "Programação": {
      const { programacaoParagrafos, programacaoTopicos } = evento;
      if (!programacaoParagrafos?.length && !programacaoTopicos?.length) {
        return (
          <EmptyState
            variant="secao-vazia"
            titulo="Programação em breve"
            mensagem="A programação detalhada deste evento ainda não foi divulgada."
          />
        );
      }
      return (
        <div className="flex flex-col gap-4">
          {programacaoParagrafos?.map((paragrafo, index) => (
            <p key={index} className="text-sm font-normal text-white/90">
              {paragrafo}
            </p>
          ))}
          {!!programacaoTopicos?.length && (
            <ul className="flex flex-col gap-2">
              {programacaoTopicos.map((topico, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-sm font-normal text-white/90"
                >
                  <span aria-hidden className="text-eventos-pink">•</span>
                  {topico}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    case "Palestrantes": {
      if (!evento.palestrantes?.length) {
        return (
          <EmptyState
            variant="secao-vazia"
            titulo="Nenhum palestrante divulgado"
            mensagem="A lista de palestrantes deste evento ainda não foi divulgada."
          />
        );
      }
      return (
        <ul className="flex flex-col gap-3">
          {evento.palestrantes.map((palestrante) => (
            <li key={palestrante.nome} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-eventos-purple/30 text-sm font-bold text-white">
                {palestrante.nome.charAt(0)}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">
                  {palestrante.nome}
                </span>
                <span className="text-xs font-medium text-eventos-muted">
                  {palestrante.cargo}
                </span>
              </div>
            </li>
          ))}
        </ul>
      );
    }

    case "Localização": {
      const endereco = evento.enderecoCompleto ?? evento.local;
      return (
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <IconLocation className="h-4 w-4 shrink-0" />
            {endereco}
          </p>
          {evento.enderecoCompleto && (
            <p className="text-sm font-medium text-eventos-muted">{evento.local}</p>
          )}
          <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-eventos-border text-xs font-medium text-eventos-muted">
            Mapa indisponível nesta prévia
          </div>
        </div>
      );
    }

    case "Links": {
      if (!evento.linksUteis?.length) {
        return (
          <EmptyState
            variant="secao-vazia"
            titulo="Nenhum link disponível"
            mensagem="Este evento ainda não tem links úteis cadastrados."
          />
        );
      }
      return (
        <ul className="flex flex-col gap-2">
          {evento.linksUteis.map((link) => (
            <li key={link.href + link.label}>
              <a
                href={link.href}
                className="text-sm font-semibold text-eventos-cyan underline underline-offset-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      );
    }

    default:
      return null;
  }
}
