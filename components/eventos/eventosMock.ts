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
      "O maior encontro de desenvolvedores, tecnologia e inovação. Conecte-se, aprenda e cresça com a comunidade.",
    dia: "24",
    mes: "MAI",
    local: "São Paulo, SP",
    categoria: "Presencial",
    imagemUrl: "/cenacard.png",
    // Campos abaixo só alimentam a tela de detalhes (/eventos/1) — demo com
    // o usuário já inscrito (mostra o card "Seu ingresso" com QR).
    dataCompleta: "Sábado, 24 de Jul",
    horario: "09:00 - 18:00",
    gratuito: true,
    inscricaoObrigatoria: true,
    vagas: "+500 Vagas",
    enderecoCompleto: "Expo Center Norte",
    sobre: [
      "O Dev Summit reúne desenvolvedores, arquitetos de software e líderes técnicos de todo o Brasil pra um dia inteiro de conteúdo prático sobre o que está mudando na área.",
      "São trilhas simultâneas de front-end, back-end, dados e carreira, além de espaço aberto pra networking com outras pessoas da comunidade Galera do TI.",
    ],
    programacaoParagrafos: [
      "A programação começa às 9h com credenciamento e abertura, seguida por palestras em duas trilhas simultâneas ao longo do dia.",
      "No fim da tarde tem um painel com convidados e um happy hour de encerramento pra quem quiser continuar a conversa.",
    ],
    programacaoTopicos: [
      "09h00 — Credenciamento e café de boas-vindas",
      "10h00 — Palestras em trilhas simultâneas (front-end, back-end, dados, carreira)",
      "15h30 — Painel com convidados",
      "17h00 — Happy hour de encerramento",
    ],
    palestrantes: [
      { nome: "Ana Ribeiro", cargo: "Head of Engineering, Galera do TI" },
      { nome: "Bruno Alves", cargo: "Staff Engineer, plataforma de dados" },
      { nome: "Camila Duarte", cargo: "Tech Lead front-end" },
    ],
    linksUteis: [
      { label: "Site oficial do evento", href: "#" },
      { label: "Grupo da comunidade no Discord", href: "#" },
    ],
    inscrito: true,
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

/** União de todos os mocks — só pra viabilizar a busca por id da tela de detalhes. */
const todosEventosMock: Evento[] = [
  ...eventosMock,
  ...meusConfirmadosMock,
  ...meetupsMock,
  ...meusInteressesMock,
];

/** Busca um evento (em qualquer um dos mocks) pelo id — usado por /eventos/[id]. */
export function buscarEventoMockPorId(id: string): Evento | undefined {
  return todosEventosMock.find((evento) => evento.id === id);
}
