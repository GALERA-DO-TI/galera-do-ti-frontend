export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  dia: string;
  mes: string;
  local: string;
  categoria: "Presencial" | "Online" | "Workshop" | "Meetup";
  imagemUrl?: string;
  /** Ingresso emitido: o card de confirmado mostra o QR em vez da imagem. */
  temQrCode?: boolean;
  /** Evento já ocorreu: o card recebe o overlay "Este evento já foi finalizado." */
  finalizado?: boolean;

  // Campos abaixo só existem pra tela de detalhes (/eventos/[id]) — undefined
  // nos eventos usados só em card/grid. Ficam opcionais pra não obrigar todo
  // mock/uso existente a preenchê-los.
  /** Ex.: "Sábado, 24 de Jul" — data por extenso mostrada na faixa de info. */
  dataCompleta?: string;
  /** Ex.: "09:00 - 18:00". */
  horario?: string;
  gratuito?: boolean;
  inscricaoObrigatoria?: boolean;
  /** Ex.: "+500 Vagas". */
  vagas?: string;
  /** Nome do local, ex.: "Expo Center Norte" (complementa `local`, que já traz cidade/UF). */
  enderecoCompleto?: string;
  /** Parágrafos da aba "Sobre". */
  sobre?: string[];
  /** Parágrafos da aba "Programação". */
  programacaoParagrafos?: string[];
  /** Tópicos em lista da aba "Programação". */
  programacaoTopicos?: string[];
  palestrantes?: { nome: string; cargo: string }[];
  linksUteis?: { label: string; href: string }[];
  /** Usuário logado já confirmou presença nesse evento (mock — sem endpoint real ainda). */
  inscrito?: boolean;
}
