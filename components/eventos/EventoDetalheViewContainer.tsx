"use client";

import EventoDetalheView from "./EventoDetalheView";
import Loading from "@/components/shared/Loading";
import { useSessaoUsuario } from "@/hooks/useSessaoUsuario";
import { Evento } from "@/interfaces/events";

interface EventoDetalheViewContainerProps {
  evento: Evento;
}

export default function EventoDetalheViewContainer({
  evento,
}: EventoDetalheViewContainerProps) {
  const { logado, nomeUsuario, carregando } = useSessaoUsuario();

  if (carregando) return <Loading comSidebar={false} quantidadeCards={1} />;

  return (
    <EventoDetalheView evento={evento} logado={logado} nomeUsuario={nomeUsuario} />
  );
}
