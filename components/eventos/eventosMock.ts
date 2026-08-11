import { Evento } from "@/interfaces/events";

/**
 * Dados temporários só para visualização durante o desenvolvimento.
 * Remover quando o backend expuser o endpoint /eventos de verdade.
 */
export const eventosMock: Evento[] = [
  {
    id: "1",
    titulo: "Dev Summit 2026",
    descricao:
      "Um dia inteiro de conteúdo, networking e inovação com grandes nomes de tecnologia.",
    dia: "24",
    mes: "MAI",
    local: "São Paulo, SP",
    categoria: "Presencial",
    imagemUrl: "/cenacard.png",
  },
  {
    id: "2",
    titulo: "Dev Summit 2026",
    descricao:
      "Um dia inteiro de conteúdo, networking e inovação com grandes nomes de tecnologia.",
    dia: "24",
    mes: "MAI",
    local: "Online",
    categoria: "Online",
    imagemUrl: "/cenacard.png",
  },
  {
    id: "3",
    titulo: "Dev Summit 2026",
    descricao:
      "Um dia inteiro de conteúdo, networking e inovação com grandes nomes de tecnologia.",
    dia: "24",
    mes: "MAI",
    local: "São Paulo, SP",
    categoria: "Presencial",
    imagemUrl: "/cenacard.png",
  },
  {
    id: "4",
    titulo: "Tech Meetup Recife",
    descricao:
      "Encontro da comunidade para trocar experiências sobre carreira e tecnologia.",
    dia: "12",
    mes: "ABR",
    local: "Recife, PE",
    categoria: "Meetup",
    imagemUrl: "/cenacard.png",
  },
  {
    id: "5",
    titulo: "Workshop de React",
    descricao:
      "Mão na massa com os fundamentos e boas práticas de React em produção.",
    dia: "08",
    mes: "MAR",
    local: "Online",
    categoria: "Workshop",
    imagemUrl: "/cenacard.png",
    finalizado: true,
  },
];

export const meusConfirmadosMock: Evento[] = [
  {
    id: "10",
    titulo: "Dev Summit 2025",
    descricao: "",
    dia: "24",
    mes: "MAI",
    local: "São Paulo, SP",
    categoria: "Presencial",
    imagemUrl: "/cenacard.png",
    temQrCode: true,
  },
  {
    id: "11",
    titulo: "AWS Workshop",
    descricao: "",
    dia: "24",
    mes: "MAI",
    local: "Online",
    categoria: "Online",
    imagemUrl: "/cenacard.png",
  },
];

export const meetupsMock: Evento[] = [
  {
    id: "30",
    titulo: "AI na Prática",
    descricao: "Como aplicar IA no dia a dia de devs e times de produto.",
    dia: "24",
    mes: "MAI",
    local: "Online",
    categoria: "Meetup",
    imagemUrl: "/cenacard.png",
  },
  {
    id: "31",
    titulo: "AI na Prática",
    descricao: "Como aplicar IA no dia a dia de devs e times de produto.",
    dia: "24",
    mes: "MAI",
    local: "Online",
    categoria: "Meetup",
    imagemUrl: "/cenacard.png",
  },
];

export const meusInteressesMock: Evento[] = [
  {
    id: "20",
    titulo: "Dev Summit 2025",
    descricao: "",
    dia: "24",
    mes: "MAI",
    local: "São Paulo, SP",
    categoria: "Presencial",
    imagemUrl: "/cenacard.png",
  },
  {
    id: "21",
    titulo: "Dev Summit 2025",
    descricao: "",
    dia: "24",
    mes: "MAI",
    local: "São Paulo, SP",
    categoria: "Presencial",
    imagemUrl: "/cenacard.png",
  },
];
