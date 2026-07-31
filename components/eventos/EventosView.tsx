"use client";

import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import MobileTabBar from "@/components/shared/MobileTabBar";
import EventosFilters from "@/components/eventos/EventosFilters";
import EventosGrid from "@/components/eventos/EventosGrid";
import EmptyState from "@/components/eventos/EmptyState";
import SectionCounter from "@/components/eventos/SectionCounter";
import EventoTicketCard from "@/components/eventos/EventoTicketCard";
import { Evento, getEventos } from "@/services/eventos";
import {
  eventosMock,
  meusConfirmadosMock,
  meusInteressesMock,
} from "@/components/eventos/eventosMock";

const USAR_MOCK_TEMPORARIO = true;

export default function EventosView() {
  const { user } = useAuthenticator((context) => [context.user]);
  const searchParams = useSearchParams();

  // Simulação temporária de login, enquanto o Cognito não está configurado.
  // Remover quando a autenticação real estiver disponível.
  const logadoSimulado = searchParams.get("logado") === "1";
  const logado = Boolean(user) || logadoSimulado;

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
  const [categoria, setCategoria] = useState("Todos os eventos");

  useEffect(() => {
    if (USAR_MOCK_TEMPORARIO) return;
    getEventos()
      .then((data) => setEventos(Array.isArray(data) ? data : []))
      .catch(() => setEventos([]));
  }, []);

  const eventosFiltrados =
    categoria === "Todos os eventos"
      ? eventos
      : eventos.filter((evento) => evento.categoria === categoria);

  const eventosDestaque = eventosFiltrados;
  const proximosEventos = eventosFiltrados;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-[60px] border-b border-eventos-border">
        <div className="hidden lg:flex w-[250px] shrink-0 items-center border-r border-eventos-border bg-eventos-sidebar px-6">
          <Image
            src="/logo-galera-do-ti.svg"
            alt="Galera do TI"
            width={180}
            height={28}
            priority
          />
        </div>
        <div className="flex flex-1">
          <Header
            logado={logado}
            nomeUsuario={user?.username ?? (logadoSimulado ? "Carlos Silva" : undefined)}
          />
        </div>
      </div>

      <div className="flex flex-1">
        <Sidebar logado={logado} />

        <main className="flex min-w-0 flex-1 flex-col gap-8 bg-eventos-page p-6 pb-20 lg:pb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Eventos</h1>
            <p className="text-sm text-zinc-400">
              Descubra eventos, conecte-se e participe da comunidade.
            </p>
          </div>

          <EventosFilters onChange={setCategoria} />

          {logado && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="flex flex-col gap-4">
                <SectionCounter
                  titulo="Meus eventos confirmados"
                  quantidade={meusConfirmados.length}
                />
                {meusConfirmados.length === 0 ? (
                  <EmptyState mensagem="Você ainda não confirmou presença em nenhum evento. Navegue pelas categorias e comece agora mesmo a se conectar e evoluir cada vez mais." />
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
                  <EmptyState mensagem="Você ainda não marcou interesse em nenhum evento." />
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

          {eventosDestaque.length === 0 ? (
            <EmptyState mensagem="Ainda não temos eventos agendados." />
          ) : (
            <EventosGrid
              titulo="Eventos em destaque"
              eventos={eventosDestaque}
              // TODO: trocar por /eventos/destaque quando essa rota existir
              verTodosHref="/eventos"
            />
          )}

          {proximosEventos.length === 0 ? (
            <EmptyState mensagem="Ainda não temos eventos agendados." />
          ) : (
            <EventosGrid
              titulo="Próximos eventos"
              eventos={proximosEventos}
              // TODO: trocar por /eventos/proximos quando essa rota existir
              verTodosHref="/eventos"
            />
          )}
        </main>
      </div>

      <MobileTabBar />
    </div>
  );
}
