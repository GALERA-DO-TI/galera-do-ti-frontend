"use client";

import { useSearchParams } from "next/navigation";
import ParceirosView from "./ParceirosView";
import { EstadoProposta } from "./PropostaParceriaModal";

/**
 *   ?preview=logado                         → versão logada
 *   ?versao=v1|v2                           → variante (logado: v1 padrão;
 *                                             deslogado: v2 padrão, com hero)
 *   ?deslogado=v1|v2                        → atalho antigo para a variante deslogada
 *   ?estado=erro-carregar|carregando        → erro ao carregar / esqueletos
 *   ?busca=<termo>                          → abre com a busca preenchida
 *   ?proposta=aberta|enviando|erro|enviada  → modal de proposta
 *   ?menu=aberto                            → menu mobile (☰) aberto
 */
const MAPA_PROPOSTA: Record<string, EstadoProposta> = {
  aberta: "form",
  enviando: "enviando",
  erro: "erro",
  enviada: "sucesso",
};

export default function ParceirosViewContainer() {
  const searchParams = useSearchParams();

  const logado = searchParams.get("preview") === "logado";
  const versaoParam = searchParams.get("versao") ?? searchParams.get("deslogado");
  const versao: "v1" | "v2" = logado
    ? versaoParam === "v2"
      ? "v2"
      : "v1"
    : versaoParam === "v1"
      ? "v1"
      : "v2";
  const estado = searchParams.get("estado");
  const propostaParam = searchParams.get("proposta");

  return (
    <ParceirosView
      key={searchParams.toString()}
      logado={logado}
      nomeUsuario={logado ? "Carlos Silva" : undefined}
      versao={versao}
      erroCarregarInicial={estado === "erro-carregar"}
      carregando={estado === "carregando"}
      buscaInicial={searchParams.get("busca") ?? ""}
      propostaInicial={propostaParam ? (MAPA_PROPOSTA[propostaParam] ?? null) : null}
      menuInicialAberto={searchParams.get("menu") === "aberto"}
    />
  );
}
