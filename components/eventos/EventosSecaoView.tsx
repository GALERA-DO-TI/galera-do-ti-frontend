"use client";

import { useEffect, useState } from "react";
import EventosShell from "@/components/eventos/EventosShell";
import EventosFilters from "@/components/eventos/EventosFilters";
import EventoCard from "@/components/eventos/EventoCard";
import EventoCardCompacto from "@/components/eventos/EventoCardCompacto";
import EmptyState from "@/components/eventos/EmptyState";
import CarregarMaisTrigger from "@/components/eventos/CarregarMaisTrigger";
import { getEventosCached } from "@/services/eventosCache";
import { Evento } from "@/interfaces/events";
import { useFiltrosEventosNaUrl, CATEGORIA_PADRAO } from "@/hooks/useFiltrosEventosNaUrl";
import { useCarregarMais } from "@/hooks/useCarregarMais";
import { eventosMock, meetupsMock } from "@/components/eventos/eventosMock";

const USAR_MOCK_TEMPORARIO = true;
const ITENS_POR_PAGINA = 9;

export const TITULO_SECAO = {
  destaque: "Eventos em destaque",
  proximos: "Próximos eventos",
  meetups: "Meetups",
} as const;

export type Secao = keyof typeof TITULO_SECAO;

interface EventosSecaoViewProps {
  secao: Secao;
  logado?: boolean;
  nomeUsuario?: string;
}

export default function EventosSecaoView({
  secao,
  logado = true,
  nomeUsuario,
}: EventosSecaoViewProps) {
  const { categoria, busca, setBusca, selecionarCategoria, filtroAtivo } =
    useFiltrosEventosNaUrl();

  // Destaque e próximos ainda usam o mesmo mock (igual ao hub, EventosView) —
  // quando o backend distinguir os dois feeds, cada seção passa a ter sua
  // própria origem de dados aqui.
  const [eventosBase, setEventosBase] = useState<Evento[]>(
    USAR_MOCK_TEMPORARIO ? (secao === "meetups" ? meetupsMock : eventosMock) : [],
  );

  useEffect(() => {
    if (USAR_MOCK_TEMPORARIO) return;
    getEventosCached()
      .then((data) => setEventosBase(Array.isArray(data) ? data : []))
      .catch(() => setEventosBase([]));
  }, [secao]);

  const eventosFiltrados = eventosBase
    .filter((evento) => categoria === CATEGORIA_PADRAO || evento.categoria === categoria)
    .filter((evento) =>
      evento.titulo.toLowerCase().includes(busca.trim().toLowerCase()),
    );

  const { itensVisiveis, temMais, carregarMais } = useCarregarMais(
    eventosFiltrados,
    ITENS_POR_PAGINA,
    `${categoria}|${busca.trim().toLowerCase()}`,
  );

  const quantidade = eventosFiltrados.length;

  return (
    <EventosShell logado={logado} nomeUsuario={nomeUsuario}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-base lg:text-[28px] font-bold text-white">
            {TITULO_SECAO[secao]}
          </h1>
          <p className="text-xs lg:text-base font-medium text-[#8e9198]">
            {quantidade} evento{quantidade === 1 ? "" : "s"} encontrado
            {quantidade === 1 ? "" : "s"}
          </p>
        </div>

        <EventosFilters
          categoriaAtiva={categoria}
          valorBusca={busca}
          onChange={selecionarCategoria}
          onBuscarChange={setBusca}
        />
      </div>

      {quantidade === 0 ? (
        <EmptyState variant={filtroAtivo ? "busca-sem-resultado" : "secao-vazia"} />
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start lg:gap-6">
            {itensVisiveis.map((evento, index) => (
              <div key={evento.id}>
                <div className="lg:hidden">
                  <EventoCardCompacto evento={evento} priority={index < 4} />
                </div>
                <div className="hidden lg:block">
                  <EventoCard evento={evento} priority={index < 4} />
                </div>
              </div>
            ))}
          </div>

          {temMais && (
            <>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={carregarMais}
                  className="flex h-11 items-center justify-center rounded-full border border-eventos-border px-6 text-sm font-semibold text-white hover:bg-white/5"
                >
                  Carregar mais
                </button>
              </div>
              <CarregarMaisTrigger onIntersect={carregarMais} ativo={temMais} />
            </>
          )}
        </>
      )}
    </EventosShell>
  );
}
