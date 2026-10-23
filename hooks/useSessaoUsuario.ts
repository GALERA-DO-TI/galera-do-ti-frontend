"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSession } from "@/helpers/auth";

interface SessaoUsuario {
  logado: boolean;
  nomeUsuario?: string;
  /** Sessão real ainda não foi checada — quem chama deve mostrar um loading em vez do estado deslogado, pra não piscar. */
  carregando: boolean;
}

interface AuthSessionComoObjeto {
  tokens?: {
    idToken?: {
      payload?: Record<string, unknown>;
    };
  };
}

/**
 * Sessão do usuário nas rotas públicas (ex.: /eventos), lida via
 * Amplify/Cognito (`fetchAuthSession`, encapsulado em helpers/auth#getSession).
 * A tela de login/cadastro em si continua com o Yago — este hook só lê uma
 * sessão que já exista (ex.: usuário logou pelo fluxo autenticado e depois
 * navegou pro público).
 *
 * `?preview=logado` continua funcionando como override manual pra
 * conferência visual enquanto não existe a UI de login: some sozinho assim
 * que uma sessão real for detectada.
 */
export function useSessaoUsuario(): SessaoUsuario {
  const searchParams = useSearchParams();
  const previewLogado = searchParams.get("preview") === "logado";

  const [carregando, setCarregando] = useState(true);
  const [sessaoReal, setSessaoReal] = useState<{
    logado: boolean;
    nomeUsuario?: string;
  }>({ logado: false });

  useEffect(() => {
    let cancelado = false;

    getSession()
      .then((session) => {
        if (cancelado) return;
        const tokens = (session as AuthSessionComoObjeto | null)?.tokens;
        const claims = tokens?.idToken?.payload;
        const logado = !!tokens?.idToken;
        const nomeUsuario =
          (claims?.name as string | undefined) ??
          (claims?.email as string | undefined);

        setSessaoReal(logado ? { logado, nomeUsuario } : { logado: false });
      })
      .catch(() => {
        if (!cancelado) setSessaoReal({ logado: false });
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  if (sessaoReal.logado) {
    return { logado: true, nomeUsuario: sessaoReal.nomeUsuario, carregando: false };
  }

  if (previewLogado) {
    return { logado: true, nomeUsuario: "Carlos Silva", carregando: false };
  }

  return { logado: false, carregando };
}
