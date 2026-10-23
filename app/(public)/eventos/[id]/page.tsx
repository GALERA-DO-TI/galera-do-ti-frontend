import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventoDetalheViewContainer from "@/components/eventos/EventoDetalheViewContainer";
import { buscarEventoMockPorId } from "@/components/eventos/eventosMock";

// TODO: quando existir GET /eventos/:id de verdade, trocar a busca mock
// abaixo por uma chamada real. Como o fetch autenticado (getSession) só
// funciona no client (ver services/eventos.ts), isso provavelmente exige
// mover a checagem de "existe" pro client e usar notFound() por lá, ou
// buscar aqui sem auth (rota pública) e revalidar do lado logado depois.
const USAR_MOCK_TEMPORARIO = true;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const evento = USAR_MOCK_TEMPORARIO ? buscarEventoMockPorId(id) : undefined;
  if (!evento) return { title: "Evento | Galera do TI" };

  return {
    title: `${evento.titulo} | Galera do TI`,
    description: evento.descricao || `Detalhes do evento ${evento.titulo}.`,
  };
}

export default async function EventoDetalhePage({ params }: PageProps) {
  const { id } = await params;
  const evento = USAR_MOCK_TEMPORARIO ? buscarEventoMockPorId(id) : undefined;

  if (!evento) notFound();

  return <EventoDetalheViewContainer evento={evento} />;
}
