"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { Parceiro, ResumoParceiros } from "@/interfaces/parceiros";
import { parceirosMock } from "./parceirosMock";
import ParceirosBanner from "./ParceirosBanner";
import ParceirosFilters from "./ParceirosFilters";
import ParceirosToolbar, { AbaParceiros } from "./ParceirosToolbar";
import ParceirosGrid from "./ParceirosGrid";
import ParceirosBuscaVazia from "./ParceirosBuscaVazia";
import ParceirosErroCarregar from "./ParceirosErroCarregar";
import ParceirosRightRail from "./ParceirosRightRail";
import ParceirosStats from "./ParceirosStats";
import ParceirosHero from "./ParceirosHero";
import ParceirosResumo from "./ParceirosResumo";
import ParceirosSkeleton from "./ParceirosSkeleton";
import PropostaParceriaModal, { EstadoProposta } from "./PropostaParceriaModal";

const SUBTITULO = {
  v1: "Conheça empresas parceiras e aproveite benefícios exclusivos para membros da Galera do T.I.",
  v2: "Cupons e vantagens exclusivas oferecidas pelas empresas parceiras da comunidade.",
};

const STOPWORDS = new Set(["de", "da", "do", "para", "e", "a", "o", "em", "no", "na", "com"]);

export interface ParceirosViewProps {
  logado?: boolean;
  nomeUsuario?: string;
  /**
   *  - logado v1: banner + abas/ordenação + coluna direita padrão
   *  - logado v2: resumo "N benefícios disponíveis…" + coluna direita de projetos
   *  - deslogado v1: banner + busca + abas (sem hero)
   *  - deslogado v2: hero "Expanda seu alcance" + estatísticas + grade em 3 colunas
   */
  versao?: "v1" | "v2";
  /** Estado "Erro ao carregar informações". */
  erroCarregarInicial?: boolean;
  /** Estado de carregamento (esqueletos). */
  carregando?: boolean;
  /** Termo inicial da busca (permite abrir direto o "Erro de busca"). */
  buscaInicial?: string;
  /** Abre o modal de proposta já em um estado. */
  propostaInicial?: EstadoProposta | null;
  /** Abre o menu mobile (☰) já na primeira renderização. */
  menuInicialAberto?: boolean;
}

export default function ParceirosView({
  logado = true,
  nomeUsuario,
  versao = "v1",
  erroCarregarInicial = false,
  carregando = false,
  buscaInicial = "",
  propostaInicial = null,
  menuInicialAberto = false,
}: ParceirosViewProps) {
  const [parceiros] = useState<Parceiro[]>(parceirosMock);
  const [busca, setBusca] = useState(buscaInicial);
  const [categoria, setCategoria] = useState("Todos");
  const [aba, setAba] = useState<AbaParceiros>("destaque");
  const [ordenar, setOrdenar] = useState("Mais relevantes");
  const [erroCarregar, setErroCarregar] = useState(erroCarregarInicial);
  const [modalAberto, setModalAberto] = useState(propostaInicial !== null);

  const abrirProposta = () => setModalAberto(true);
  const fecharProposta = () => setModalAberto(false);

  const chipsAtivos = useMemo(
    () =>
      busca.trim()
        ? busca
            .trim()
            .split(/\s+/)
            .filter((w) => w.length > 1 && !STOPWORDS.has(w.toLowerCase()))
        : [],
    [busca],
  );

  const parceirosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return parceiros
      .filter((p) => categoria === "Todos" || p.categoria === categoria)
      .filter((p) => {
        if (aba === "disponiveis") return p.status === "disponivel";
        if (aba === "recomendados") return p.status !== "expirado";
        return true;
      })
      .filter((p) => {
        if (!termo) return true;
        return [p.nome, p.categoria, p.descricao, p.cupom]
          .filter(Boolean)
          .some((campo) => campo!.toLowerCase().includes(termo));
      });
  }, [parceiros, categoria, aba, busca]);

  const resumo: ResumoParceiros = useMemo(
    () => ({
      emDestaque: parceiros.length,
      todos: parceiros.length,
      recomendados: parceiros.filter((p) => p.status !== "expirado").length,
      disponiveis: parceiros.filter((p) => p.status === "disponivel").length,
    }),
    [parceiros],
  );

  const buscaVazia = busca.trim() !== "" && parceirosFiltrados.length === 0;

  const limparFiltros = () => {
    setBusca("");
    setCategoria("Todos");
  };

  const removerChip = (chip: string) =>
    setBusca((atual) =>
      atual
        .split(/\s+/)
        .filter((w) => w !== chip)
        .join(" ")
        .trim(),
    );

  const cabecalho = (comSubtitulo: boolean) => (
    <div>
      <h1 className="text-[28px] font-extrabold leading-tight text-white sm:text-3xl xl:text-[40px]">
        Parceiros da comunidade
      </h1>
      {comSubtitulo && (
        <p className="mt-1 text-sm text-eventos-muted md:text-base">
          {SUBTITULO[versao]}
        </p>
      )}
    </div>
  );

  const filtros = (
    <ParceirosFilters
      busca={busca}
      onBuscaChange={setBusca}
      categoria={categoria}
      onCategoriaChange={setCategoria}
      chipsAtivos={chipsAtivos}
      onRemoverChip={removerChip}
      onLimparFiltros={limparFiltros}
    />
  );

  /** Lista (ou o estado que a substitui: erro ao carregar / busca vazia). */
  const lista = (comToolbar: boolean, colunas: "padrao" | "tres") =>
    erroCarregar ? (
      <ParceirosErroCarregar onTentarNovamente={() => setErroCarregar(false)} />
    ) : buscaVazia ? (
      <ParceirosBuscaVazia
        termo={busca.trim()}
        onLimparFiltros={limparFiltros}
        onVerTodos={limparFiltros}
        onBuscarTermo={setBusca}
      />
    ) : (
      <>
        {comToolbar && (
          <ParceirosToolbar
            aba={aba}
            onAbaChange={setAba}
            resumo={resumo}
            ordenar={ordenar}
            onOrdenarChange={setOrdenar}
          />
        )}
        <ParceirosGrid
          parceiros={parceirosFiltrados}
          deslogado={!logado}
          colunas={colunas}
        />
      </>
    );

  const modal = (
    <PropostaParceriaModal
      aberto={modalAberto}
      onClose={fecharProposta}
      estadoInicial={propostaInicial ?? "form"}
      sucessoLabel="Voltar para a comunidade"
      onSucessoAcao={fecharProposta}
    />
  );

  // ---------- Deslogado ----------
  if (!logado) {
    const v2 = versao === "v2";
    return (
      <div className="flex min-h-screen flex-col bg-eventos-page text-white">
        {/* Mesmo header público do eventos (Header com logado={false}). */}
        <div className="flex h-[45px] border-b border-eventos-border md:h-[60px]">
          <Header
            logado={false}
            expandirEm="xl"
            navInicialAberto={menuInicialAberto}
          />
        </div>
        <main
          className={`mx-auto flex w-full flex-1 flex-col gap-6 px-4 py-6 sm:px-6 md:gap-8 md:py-8 ${
            v2 ? "max-w-7xl" : "max-w-6xl"
          }`}
        >
          {v2 ? (
            <>
              <ParceirosHero onAbrirProposta={abrirProposta} />
              <ParceirosStats />
              {cabecalho(false)}
              {carregando ? <ParceirosSkeleton /> : lista(false, "tres")}
            </>
          ) : (
            <>
              {cabecalho(true)}
              {carregando ? (
                <ParceirosSkeleton />
              ) : (
                <>
                  <ParceirosBanner onAbrirProposta={abrirProposta} />
                  {filtros}
                  {lista(true, "padrao")}
                </>
              )}
            </>
          )}
        </main>
        {modal}
      </div>
    );
  }

  // ---------- Logado ----------
  return (
    <div className="flex flex-1 flex-col bg-eventos-page text-white">
      <div className="flex h-[45px] border-b border-eventos-border md:h-[60px]">
        <div className="hidden w-[250px] shrink-0 items-center border-r border-eventos-border bg-eventos-sidebar px-6 xl:flex">
          <Image
            src="/logo-galera-do-ti.svg"
            alt="Galera do TI"
            width={180}
            height={28}
            priority
          />
        </div>
        <div className="flex min-w-0 flex-1">
          <Header
            logado
            nomeUsuario={nomeUsuario}
            expandirEm="xl"
            mostrarDashboard={false}
            navInicialAberto={menuInicialAberto}
          />
        </div>
      </div>

      <div className="flex flex-1">
        <Sidebar expandirEm="xl" />

        <div className="flex min-w-0 flex-1 gap-6 p-4 md:p-6 xl:p-8">
          <main className="mx-auto flex w-full min-w-0 max-w-[1400px] flex-1 flex-col gap-5 md:gap-6">
            {cabecalho(true)}
            {carregando ? (
              <ParceirosSkeleton />
            ) : versao === "v2" ? (
              <>
                <ParceirosBanner
                  labelBotao="Torne-se parceiro"
                  onAbrirProposta={abrirProposta}
                />
                <ParceirosResumo parceiros={parceiros} />
                {filtros}
                {lista(false, "padrao")}
              </>
            ) : (
              <>
                <ParceirosBanner
                  labelBotao="Quero ser parceiro"
                  onAbrirProposta={abrirProposta}
                />
                {filtros}
                {lista(true, "padrao")}
              </>
            )}
          </main>
          <ParceirosRightRail variante={versao} carregando={carregando} />
        </div>
      </div>

      {modal}
    </div>
  );
}
