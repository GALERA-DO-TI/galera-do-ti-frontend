"use client";

import EventosView from "./EventosView";
import Loading from "@/components/shared/Loading";
import { useSessaoUsuario } from "@/hooks/useSessaoUsuario";

/**
 * A página de Eventos é pública: quem não está logado vê a listagem sem os
 * blocos privados. useSessaoUsuario lê a sessão real (Amplify/Cognito) e
 * cai pra deslogado se não houver uma.
 */
export default function EventosViewContainer() {
  const { logado, nomeUsuario, carregando } = useSessaoUsuario();

  // Evita mostrar a versão deslogada por um instante pra quem já está
  // logado, enquanto a sessão real ainda está sendo checada.
  if (carregando) return <Loading comSidebar={false} />;

  return <EventosView logado={logado} nomeUsuario={nomeUsuario} />;
}
