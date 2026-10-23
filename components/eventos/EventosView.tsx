"use client";

import { useEffect, useState } from "react";
import EventosShell from "@/components/eventos/EventosShell";
import EventosFilters from "@/components/eventos/EventosFilters";
import EventosGrid from "@/components/eventos/EventosGrid";
import EmptyState from "@/components/eventos/EmptyState";
import SectionCounter from "@/components/eventos/SectionCounter";
import EventoTicketCard from "@/components/eventos/EventoTicketCard";
import UpcomingEventsStrip from "@/components/eventos/UpcomingEventsStrip";
import { getEventosCached } from "@/services/eventosCache";
import { Evento } from "@/interfaces/events";
import { useFiltrosEventosNaUrl, CATEGORIA_PADRAO } from "@/hooks/useFiltrosEventosNaUrl";
import {
  eventosMock,
  meusConfirmadosMock,
  meusInteressesMock,
  meetupsMock,
} from "@/components/eventos/eventosMock";

const USAR_MOCK_TEMPORARIO = true;

interface EventosViewProps {
  /** A rota pública renderiza a versão deslogada; a autenticada, a completa. */
  logado?: boolean;
  nomeUsuario?: string;
}

export default function EventosView({
  logado = true,
  nomeUsuario,
}: EventosViewProps) {
  const {
    categoria,
    busca,
    setBusca,
    selecionarCategoria,
    filtroAtivo,
    queryAtual,
  } = useFiltrosEventosNaUrl();

  const [eventos, setEventos] = useState<Evento[]>(
    USAR_MOCK_TEMPORARIO ? eventosMock : [],
  );
  // Os setters abaixo ficam sem uso até existir endpoint real para
  // "meus eventos confirmados" e "meus interesses" (hoje só o mock preenche).
  const [meusConfirmados] = useState<Evento[]>(
    USAR_MOCK_TEMPORARIO ? meusConfirmadosMock : [],
  );
  const [meusInteresses] = useState<Evento[]>(
    USAR_MOCK_TEMPORARIO ? meusInteressesMock : [],
  );
  const [meetups] = useState<Evento[]>(
    USAR_MOCK_TEMPORARIO ? meetupsMock : [],
  );

  useEffect(() => {
    if (USAR_MOCK_TEMPORARIO) return;
    getEventosCached()
      .then((data) => setEventos(Array.isArray(data) ? data : []))
      .catch(() => setEventos([]));
  }, []);

  const eventosFiltrados = eventos
    .filter((evento) => categoria === CATEGORIA_PADRAO || evento.categoria === categoria)
    .filter((evento) =>
      evento.titulo.toLowerCase().includes(busca.trim().toLowerCase()),
    );

  const eventosDestaque = eventosFiltrados;
  const proximosEventos = eventosFiltrados;

  // Com busca/filtro ativo, a lista vazia é "sem resultado" e não "seção sem eventos".
  const variantListaFiltrada = filtroAtivo ? "busca-sem-resultado" : "secao-vazia";

  // Propaga o filtro atual (categoria/busca) e o preview de sessão pro "Ver
  // todos" continuar com o mesmo contexto na página de seção.
  const comQueryAtual = (href: string) =>
    queryAtual ? `${href}?${queryAtual}` : href;

  return (
    <EventosShell logado={logado} nomeUsuario={nomeUsuario}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-base lg:text-[28px] font-bold text-white">
            Eventos
          </h1>
          <p className="text-xs lg:text-base font-medium text-[#8e9198]">
            Conecte-se, aprenda e cresça com a comunidade.
          </p>
        </div>

        <EventosFilters
          categoriaAtiva={categoria}
          valorBusca={busca}
          onChange={selecionarCategoria}
          onBuscarChange={setBusca}
        />
      </div>

      {logado && <UpcomingEventsStrip eventos={meusConfirmados} />}

      {logado && (
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="flex flex-col gap-4">
            <SectionCounter
              titulo="Meus eventos confirmados"
              quantidade={meusConfirmados.length}
            />
            {meusConfirmados.length === 0 ? (
              <EmptyState variant="sem-eventos-confirmados" />
            ) : (
              <div className="flex flex-col gap-3">
                {meusConfirmados.map((evento) => (
                  <EventoTicketCard key={evento.id} evento={evento} confirmado />
                ))}
              </div>
            )}
          </section>

          <section className="flex flex-col gap-4">
            <SectionCounter
              titulo="Meus interesses"
              quantidade={meusInteresses.length}
            />
            {meusInteresses.length === 0 ? (
              <EmptyState variant="sem-interesses" />
            ) : (
              <div className="flex flex-col gap-3">
                {meusInteresses.map((evento) => (
                  <EventoTicketCard key={evento.id} evento={evento} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <EventosGrid
        titulo="Eventos em destaque"
        eventos={eventosDestaque}
        destaque
        emptyVariant={variantListaFiltrada}
        verTodosHref={comQueryAtual("/eventos/secao/destaque")}
      />

      <EventosGrid
        titulo="Próximos eventos"
        eventos={proximosEventos}
        emptyVariant={variantListaFiltrada}
        verTodosHref={comQueryAtual("/eventos/secao/proximos")}
      />

      <EventosGrid
        titulo="Meetups"
        eventos={meetups}
        emptyMensagem="Ainda não temos meetups agendados."
        verTodosHref={comQueryAtual("/eventos/secao/meetups")}
      />
    </EventosShell>
  );
}
