"use client";

import { useSearchParams } from "next/navigation";
import EventosView from "./EventosView";

/**
 * A página de Eventos é pública: quem não está logado vê a listagem sem os
 * blocos privados. A área deslogada não carrega o provider do Amplify, então o
 * estado de sessão não é lido aqui.
 *
 * Enquanto não existe tela de login no projeto, `?preview=logado` força o
 * estado autenticado para conferência visual. Remover quando a rota de login
 * existir.
 */
export default function EventosViewContainer() {
  const searchParams = useSearchParams();
  const previewLogado = searchParams.get("preview") === "logado";

  return (
    <EventosView
      logado={previewLogado}
      nomeUsuario={previewLogado ? "Carlos Silva" : undefined}
    />
  );
}
