"use client";

import { useState } from "react";

/**
 * Pagina uma lista já carregada no cliente, revelando `porPagina` itens por
 * vez. Serve de base para "carregar mais"/scroll infinito enquanto não
 * existe um endpoint paginado (page/limit) no backend — trocar `itens` pela
 * página vinda da API quando esse endpoint existir.
 *
 * `chaveReset` identifica o conjunto de itens atual (ex.: categoria+busca).
 * Quando muda, a paginação volta pro início — feito com ajuste durante a
 * renderização (não useEffect) pra não disparar setState dentro de efeito.
 */
export function useCarregarMais<T>(
  itens: T[],
  porPagina: number,
  chaveReset: string | number,
) {
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(porPagina);
  const [chaveAnterior, setChaveAnterior] = useState(chaveReset);

  if (chaveReset !== chaveAnterior) {
    setChaveAnterior(chaveReset);
    setQuantidadeVisivel(porPagina);
  }

  const itensVisiveis = itens.slice(0, quantidadeVisivel);
  const temMais = quantidadeVisivel < itens.length;

  const carregarMais = () =>
    setQuantidadeVisivel((atual) => Math.min(atual + porPagina, itens.length));

  return { itensVisiveis, temMais, carregarMais };
}
