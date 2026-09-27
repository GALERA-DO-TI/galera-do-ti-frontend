export type StatusParceiro =
  | "disponivel"
  | "resgatado"
  | "expirado"
  | "bloqueado";

export interface Parceiro {
  id: string;
  nome?: string;
  descricao: string;
  categoria: string;
  cupom: string;
  status: StatusParceiro;
  logoUrl?: string;
  saibaMaisUrl?: string;
  exigeLogin?: boolean;
}

export interface PropostaParceria {
  empresa: string;
  email: string;
  telefone: string;
  site: string;
  descricao: string;
}

export interface ResumoParceiros {
  emDestaque: number;
  todos: number;
  recomendados: number;
  disponiveis: number;
}
