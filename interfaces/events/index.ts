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
}
