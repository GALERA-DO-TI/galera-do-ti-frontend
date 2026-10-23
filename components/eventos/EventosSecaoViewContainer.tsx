"use client";

import EventosSecaoView, { Secao } from "./EventosSecaoView";
import Loading from "@/components/shared/Loading";
import { useSessaoUsuario } from "@/hooks/useSessaoUsuario";

interface EventosSecaoViewContainerProps {
  secao: Secao;
}

export default function EventosSecaoViewContainer({
  secao,
}: EventosSecaoViewContainerProps) {
  const { logado, nomeUsuario, carregando } = useSessaoUsuario();

  if (carregando) return <Loading comSidebar={false} />;

  return (
    <EventosSecaoView secao={secao} logado={logado} nomeUsuario={nomeUsuario} />
  );
}
