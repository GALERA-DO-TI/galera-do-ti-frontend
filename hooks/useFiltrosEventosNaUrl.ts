"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CATEGORIA_PADRAO = "Todos os eventos";
/** Espera o usuário parar de digitar antes de gravar a busca na URL, pra não empilhar navegação a cada tecla. */
const DEBOUNCE_BUSCA_MS = 400;

/**
 * Deriva categoria/busca de `?categoria=&busca=` e mantém as duas em
 * sincronia com a URL via router.replace (sem empilhar histórico, sem
 * scroll) — o filtro fica compartilhável por link e sobrevive a
 * voltar/avançar do navegador. Usado tanto no hub de eventos quanto nas
 * páginas de seção (/eventos/[secao]).
 */
export function useFiltrosEventosNaUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoria = searchParams.get("categoria") ?? CATEGORIA_PADRAO;
  const buscaUrl = searchParams.get("busca") ?? "";

  // Estado local só pra o campo de busca responder a cada tecla sem esperar
  // a URL gravar; a URL é a fonte de verdade. Ajuste durante a renderização
  // (em vez de useEffect) sempre que ela mudar por fora (voltar/avançar do
  // navegador, link compartilhado) — ver "Adjusting state on prop change" nos docs do React.
  const [busca, setBusca] = useState(buscaUrl);
  const [ultimaBuscaUrl, setUltimaBuscaUrl] = useState(buscaUrl);
  if (buscaUrl !== ultimaBuscaUrl) {
    setUltimaBuscaUrl(buscaUrl);
    setBusca(buscaUrl);
  }

  const atualizarQuery = (chave: string, valor: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (valor) {
      params.set(chave, valor);
    } else {
      params.delete(chave);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const selecionarCategoria = (valor: string) =>
    atualizarQuery("categoria", valor === CATEGORIA_PADRAO ? "" : valor);

  useEffect(() => {
    if (busca === buscaUrl) return;
    const handle = setTimeout(() => atualizarQuery("busca", busca.trim()), DEBOUNCE_BUSCA_MS);
    return () => clearTimeout(handle);
    // atualizarQuery muda de identidade a cada render (depende de searchParams/router);
    // rodar só quando a busca digitada muda evita recriar o timer sem necessidade.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca]);

  const filtroAtivo = categoria !== CATEGORIA_PADRAO || busca.trim() !== "";

  /** Query string atual completa (inclui categoria/busca e qualquer outro param, ex.: preview=logado). */
  const queryAtual = searchParams.toString();

  return {
    categoria,
    busca,
    setBusca,
    selecionarCategoria,
    filtroAtivo,
    queryAtual,
  };
}
