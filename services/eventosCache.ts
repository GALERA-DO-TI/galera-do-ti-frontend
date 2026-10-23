import { getEventos } from "./eventos";
import { Evento } from "@/interfaces/events";

/**
 * Cache de curta duração pra `getEventos()`: evita refazer a chamada toda
 * vez que o usuário troca de filtro/seção ou volta pra página dentro da
 * mesma aba. Não é um cache de longo prazo nem substitui invalidação no
 * servidor — é só pra suavizar navegação client-side.
 */
const TTL_MS = 60_000;
const CHAVE_SESSION = "eventos:cache:v1";

interface CacheEntry {
  eventos: Evento[];
  atualizadoEm: number;
}

let cacheEmMemoria: CacheEntry | null = null;

function lerCacheDaSessao(): CacheEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CHAVE_SESSION);
    return raw ? (JSON.parse(raw) as CacheEntry) : null;
  } catch {
    return null;
  }
}

function gravarCacheNaSessao(entry: CacheEntry) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(CHAVE_SESSION, JSON.stringify(entry));
  } catch {
    // sessionStorage indisponível (modo privado/quota) — segue só com cache em memória.
  }
}

function cacheValido(entry: CacheEntry | null): entry is CacheEntry {
  return !!entry && Date.now() - entry.atualizadoEm < TTL_MS;
}

/**
 * Busca eventos usando o cache quando ainda válido (TTL de 1 min, em
 * memória + sessionStorage); caso contrário, busca de novo e atualiza o
 * cache. Passe `forceRefresh` para ignorar o cache (ex.: botão "atualizar").
 */
export async function getEventosCached(
  opts: { forceRefresh?: boolean } = {},
): Promise<Evento[]> {
  if (!opts.forceRefresh) {
    if (cacheValido(cacheEmMemoria)) return cacheEmMemoria.eventos;

    const daSessao = lerCacheDaSessao();
    if (cacheValido(daSessao)) {
      cacheEmMemoria = daSessao;
      return daSessao.eventos;
    }
  }

  const eventos = await getEventos();
  const entry: CacheEntry = { eventos, atualizadoEm: Date.now() };
  cacheEmMemoria = entry;
  gravarCacheNaSessao(entry);
  return eventos;
}

/** Descarta o cache — usar após uma ação que muda a lista (ex.: confirmar presença num evento). */
export function invalidarCacheEventos() {
  cacheEmMemoria = null;
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(CHAVE_SESSION);
  } catch {
    // ignora — se sessionStorage não gravou, também não há o que limpar.
  }
}
