import { Evento } from "@/services/eventos";

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
  },
  {
    id: "11",
    titulo: "Dev Summit 2025",
    descricao: "",
    dia: "24",
    mes: "MAI",
    local: "Online",
    categoria: "Online",
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
