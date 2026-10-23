import { IconBriefcase, IconCode } from "@/components/shared/icons";

/** Dados temporários dos widgets da coluna direita. */
const convites = [
  { n: "1", tag: "NOVO", titulo: "Convite: MentorMatch", sub: "Frontend · responder convite" },
  { n: "2", tag: "PEND", titulo: "Pedidos no EcoTrack", sub: "Novas solicitações de entrada" },
];
const vagas = [
  { titulo: "UX Designer Pleno", sub: "Nimbus · Remoto" },
  { titulo: "Analista de Dados Jr", sub: "Órbita Tech · Híbrido" },
];
const eventos = [
  { dia: "14", mes: "JUL", titulo: "Meetup Dev Rio", sub: "19h · Online" },
  { dia: "22", mes: "JUL", titulo: "Hackathon Galera do TI", sub: "9h · São Paulo" },
];
const sugestoes = [
  { nome: "Juliana Lima", papel: "Product Manager", cor: "from-[#ff9a62] to-[#ff2daf]" },
  { nome: "Bruno Costa", papel: "DevOps Engineer", cor: "from-[#7b2ff7] to-[#22e4ff]" },
];
const comunidades = [
  { nome: "Backend Brasil", membros: "12,4 mil membros", cor: "bg-[#1379f0]" },
  { nome: "Mulheres em Dev", membros: "8,1 mil membros", cor: "bg-[#e0364f]" },
];
// Variante v2 (frames tablet "Logado (v2)" e fundo dos modais tablet)
const projetos = [
  { titulo: "Galera Dev Hub", sub: "Líder · 68% concluído" },
  { titulo: "EcoTrack", sub: "Colaborador · 40%" },
];
const squad = [
  { nome: "Juliana Lima", papel: "UX/UI Designer", cor: "from-[#ff9a62] to-[#ff2daf]" },
  { nome: "Bruno Costa", papel: "Backend · Node.js", cor: "from-[#7b2ff7] to-[#22e4ff]" },
];
const recomendados = [
  { nome: "CodeMentor AI", sub: "92% compatível", cor: "bg-[#1379f0]" },
  { nome: "OpenHealth", sub: "Buscando frontend", cor: "bg-[#e0364f]" },
];

const pulso = "animate-pulse rounded bg-white/10";

function Card({
  titulo,
  verLabel = "Ver todos",
  children,
}: {
  titulo: string;
  verLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-eventos-border bg-eventos-card p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-white">{titulo}</h3>
        <button
          type="button"
          className="shrink-0 text-xs font-semibold text-eventos-cyan hover:underline"
        >
          {verLabel}
        </button>
      </div>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Linha({
  inicio,
  titulo,
  sub,
  acao,
}: {
  inicio: React.ReactNode;
  titulo: string;
  sub: string;
  acao?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      {inicio}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{titulo}</p>
        <p className="truncate text-xs text-eventos-muted">{sub}</p>
      </div>
      {acao}
    </div>
  );
}

const quadrado = "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg";

function Convites() {
  return (
    <Card titulo="Convites e solicitações">
      {convites.map((c) => (
        <Linha
          key={c.titulo}
          titulo={c.titulo}
          sub={c.sub}
          inicio={
            <span className={`${quadrado} flex-col border border-white/10 text-white`}>
              <span className="text-sm font-bold leading-none">{c.n}</span>
              <span className="text-[9px] text-eventos-muted">{c.tag}</span>
            </span>
          }
        />
      ))}
    </Card>
  );
}

function Esqueleto({ titulo }: { titulo: string }) {
  return (
    <Card titulo={titulo}>
      {[0, 1].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <span className={`h-10 w-10 shrink-0 ${pulso}`} />
          <div className="flex flex-1 flex-col gap-2">
            <span className={`h-2.5 w-4/5 ${pulso}`} />
            <span className={`h-2.5 w-1/2 ${pulso}`} />
          </div>
        </div>
      ))}
    </Card>
  );
}

interface ParceirosRightRailProps {
  variante?: "v1" | "v2";
  /** Frames de loading: mostra os cards com esqueleto. */
  carregando?: boolean;
}

/**
 * Coluna direita. Aparece a partir de 1024px (frame tablet do Figma) e
 * alarga no desktop.
 */
export default function ParceirosRightRail({
  variante = "v1",
  carregando = false,
}: ParceirosRightRailProps) {
  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-4 lg:flex xl:w-[300px] 2xl:w-[320px]">
      {carregando ? (
        <>
          <Esqueleto titulo="Solicitações" />
          <Esqueleto titulo="Suas vagas" />
          <Esqueleto titulo="Seus eventos" />
          <Esqueleto titulo="Seus Projetos" />
        </>
      ) : variante === "v2" ? (
        <>
          <Convites />
          <Card titulo="Seus projetos">
            {projetos.map((p) => (
              <Linha
                key={p.titulo}
                titulo={p.titulo}
                sub={p.sub}
                inicio={
                  <span className={`${quadrado} bg-white/5 text-eventos-muted`}>
                    <IconCode className="h-4 w-4" />
                  </span>
                }
              />
            ))}
          </Card>
          <Card titulo="Pessoas para sua squad">
            {squad.map((s) => (
              <Linha
                key={s.nome}
                titulo={s.nome}
                sub={s.papel}
                inicio={<span className={`h-10 w-10 shrink-0 rounded-full bg-gradient-to-br ${s.cor}`} />}
                acao={
                  <button
                    type="button"
                    className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-eventos-muted hover:bg-white/5"
                  >
                    convidar
                  </button>
                }
              />
            ))}
          </Card>
          <Card titulo="Projetos recomendados">
            {recomendados.map((r) => (
              <Linha
                key={r.nome}
                titulo={r.nome}
                sub={r.sub}
                inicio={<span className={`h-10 w-10 shrink-0 rounded-lg ${r.cor}`} />}
                acao={
                  <button
                    type="button"
                    className="shrink-0 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-eventos-muted hover:bg-white/5"
                  >
                    Ver
                  </button>
                }
              />
            ))}
          </Card>
        </>
      ) : (
        <>
          <Convites />
          <Card titulo="Suas vagas" verLabel="Ver todas">
            {vagas.map((v) => (
              <Linha
                key={v.titulo}
                titulo={v.titulo}
                sub={v.sub}
                inicio={
                  <span className={`${quadrado} bg-white/5 text-eventos-muted`}>
                    <IconBriefcase className="h-4 w-4" />
                  </span>
                }
              />
            ))}
          </Card>
          <Card titulo="Seus eventos">
            {eventos.map((e) => (
              <Linha
                key={e.titulo}
                titulo={e.titulo}
                sub={e.sub}
                inicio={
                  <span className={`${quadrado} flex-col border border-white/10 text-white`}>
                    <span className="text-sm font-bold leading-none">{e.dia}</span>
                    <span className="text-[9px] text-eventos-muted">{e.mes}</span>
                  </span>
                }
              />
            ))}
          </Card>
          <Card titulo="Sugestões para seguir">
            {sugestoes.map((s) => (
              <Linha
                key={s.nome}
                titulo={s.nome}
                sub={s.papel}
                inicio={<span className={`h-10 w-10 shrink-0 rounded-full bg-gradient-to-br ${s.cor}`} />}
                acao={
                  <button
                    type="button"
                    className="shrink-0 rounded-lg border border-eventos-cyan px-3 py-1.5 text-xs font-semibold text-eventos-cyan hover:bg-white/5"
                  >
                    Seguir
                  </button>
                }
              />
            ))}
          </Card>
          <Card titulo="Comunidades para você">
            {comunidades.map((c) => (
              <Linha
                key={c.nome}
                titulo={c.nome}
                sub={c.membros}
                inicio={<span className={`h-10 w-10 shrink-0 rounded-lg ${c.cor}`} />}
                acao={
                  <button
                    type="button"
                    className="shrink-0 rounded-lg bg-[#1379f0] px-4 py-1.5 text-xs font-semibold text-white"
                  >
                    Entrar
                  </button>
                }
              />
            ))}
          </Card>
        </>
      )}
    </aside>
  );
}
