"use client";

import EventosView from "./EventosView";
import { useLogadoPreview } from "@/hooks/useLogadoPreview";

/**
 * A página de Eventos é pública: quem não está logado vê a listagem sem os
 * blocos privados. A área deslogada não carrega o provider do Amplify, então o
 * estado de sessão não é lido aqui.
 */
export default function EventosViewContainer() {
  const { logado, nomeUsuario } = useLogadoPreview();

  return <EventosView logado={logado} nomeUsuario={nomeUsuario} />;
}
