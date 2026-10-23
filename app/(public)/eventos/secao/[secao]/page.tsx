import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventosSecaoViewContainer from "@/components/eventos/EventosSecaoViewContainer";
import { TITULO_SECAO, Secao } from "@/components/eventos/EventosSecaoView";

function isSecaoValida(valor: string): valor is Secao {
  return valor in TITULO_SECAO;
}

interface PageProps {
  params: Promise<{ secao: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { secao } = await params;
  if (!isSecaoValida(secao)) return { title: "Eventos | Galera do TI" };

  const titulo = TITULO_SECAO[secao];
  return {
    title: `${titulo} | Galera do TI`,
    description: `Veja todos os eventos de ${titulo.toLowerCase()} da comunidade Galera do TI.`,
  };
}

export default async function EventosSecaoPage({ params }: PageProps) {
  const { secao } = await params;
  if (!isSecaoValida(secao)) notFound();

  return <EventosSecaoViewContainer secao={secao} />;
}
