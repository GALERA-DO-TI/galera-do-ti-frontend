"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import MobileTabBar from "@/components/shared/MobileTabBar";
import EventosFilters from "@/components/eventos/EventosFilters";
import EventosGrid from "@/components/eventos/EventosGrid";
import EmptyState, {
  EmptyStateVariant,
} from "@/components/eventos/EmptyState";
import SectionCounter from "@/components/eventos/SectionCounter";
import EventoTicketCard from "@/components/eventos/EventoTicketCard";
import UpcomingEventsStrip from "@/components/eventos/UpcomingEventsStrip";
import { getEventos } from "@/services/eventos";
import { Evento } from "@/interfaces/events";
import {
  eventosMock,
  meusConfirmadosMock,
  meusInteressesMock,
  meetupsMock,
} from "@/components/eventos/eventosMock";

const USAR_MOCK_TEMPORARIO = true;
const CATEGORIA_PADRAO = "Todos os eventos";
/** Espera o usuário parar de digitar antes de gravar a busca na URL, pra não empilhar navegação a cada tecla. */
const DEBOUNCE_BUSCA_MS = 400;

interface EventosViewProps {
  /** A rota pública renderiza a versão deslogada; a autenticada, a completa. */
  logado?: boolean;
  nomeUsuario?: string;
}

export default function EventosView({
  logado = true,
  nomeUsuario,
}: EventosViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  // Categoria e busca vivem na URL (?categoria=&busca=) para o filtro ser
  // compartilhável por link e sobreviver a voltar/avançar do navegador.
  const categoria = searchParams.get("categoria") ?? CATEGORIA_PADRAO;
  const buscaUrl = searchParams.get("busca") ?? "";

  // Estado local só pra o campo de busca responder a cada tecla sem esperar
  // a URL gravar; a URL é a fonte de verdade. Ajuste durante a renderização
  // (em vez de useEffect) sempre que ela mudar por fora (voltar/avançar do
  // navegador, link compartilhado) — ver "Adjusting state on prop change" nos docs do React.
  const [busca, setBusca] = useState(buscaUrl);
  const [ultimaBuscaUrl, setUltimaBuscaUrl] = useState(buscaUrl);
  if (buscaUrl !== ultimaBuscaUrl) {
    setUltimaBuscaUrl(buscaUrl);
    setBusca(buscaUrl);
  }

  const atualizarQuery = (chave: string, valor: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (valor) {
      params.set(chave, valor);
    } else {
      params.delete(chave);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const selecionarCategoria = (valor: string) =>
    atualizarQuery("categoria", valor === CATEGORIA_PADRAO ? "" : valor);

  useEffect(() => {
    if (busca === buscaUrl) return;
    const handle = setTimeout(() => atualizarQuery("busca", busca.trim()), DEBOUNCE_BUSCA_MS);
    return () => clearTimeout(handle);
    // atualizarQuery muda de identidade a cada render (depende de searchParams/router);
    // rodar só quando a busca digitada muda evita recriar o timer sem necessidade.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca]);

  useEffect(() => {
    if (USAR_MOCK_TEMPORARIO) return;
    getEventos()
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
  const filtroAtivo = categoria !== CATEGORIA_PADRAO || busca.trim() !== "";
  const variantListaFiltrada: EmptyStateVariant = filtroAtivo
    ? "busca-sem-resultado"
    : "secao-vazia";

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-11.25 md:h-15 border-b border-eventos-border">
        {logado && (
          <div className="hidden lg:flex w-62.5 shrink-0 items-center border-r border-eventos-border bg-eventos-sidebar px-6">
            <Image
              src="/logo-galera-do-ti.svg"
              alt="Galera do TI"
              width={180}
              height={28}
              priority
            />
          </div>
        )}
        <div className="flex flex-1">
          <Header logado={logado} nomeUsuario={nomeUsuario} />
        </div>
      </div>

      <div className="flex flex-1">
        {logado && <Sidebar />}

        <main
          className={`flex min-w-0 flex-1 flex-col gap-8 bg-eventos-page p-4 pb-28 md:p-8 md:pb-8 ${
            logado ? "" : "lg:px-28"
          }`}
        >
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
            // TODO: trocar por /eventos/destaque quando essa rota existir
            verTodosHref="/eventos"
          />

          <EventosGrid
            titulo="Próximos eventos"
            eventos={proximosEventos}
            emptyVariant={variantListaFiltrada}
            // TODO: trocar por /eventos/proximos quando essa rota existir
            verTodosHref="/eventos"
          />

          <EventosGrid
            titulo="Meetups"
            eventos={meetups}
            emptyMensagem="Ainda não temos meetups agendados."
          />
        </main>
      </div>

      {logado && <MobileTabBar />}
    </div>
  );
}
