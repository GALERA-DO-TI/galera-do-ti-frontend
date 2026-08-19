"use client";

import EventosSecaoView, { Secao } from "./EventosSecaoView";
import { useLogadoPreview } from "@/hooks/useLogadoPreview";

interface EventosSecaoViewContainerProps {
  secao: Secao;
}

export default function EventosSecaoViewContainer({
  secao,
}: EventosSecaoViewContainerProps) {
  const { logado, nomeUsuario } = useLogadoPreview();

  return (
    <EventosSecaoView secao={secao} logado={logado} nomeUsuario={nomeUsuario} />
  );
}
