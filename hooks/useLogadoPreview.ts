"use client";

import { useSearchParams } from "next/navigation";

/**
 * TEMPORÁRIO: enquanto não existe tela de login, `?preview=logado` força o
 * estado autenticado nas páginas de Eventos para conferência visual. A rota
 * de autenticação real fica com o Yago — remover este hook (e trocar pelo
 * estado de sessão de verdade) quando ela existir.
 */
export function useLogadoPreview() {
  const searchParams = useSearchParams();
  const logado = searchParams.get("preview") === "logado";
  return { logado, nomeUsuario: logado ? "Carlos Silva" : undefined };
}
