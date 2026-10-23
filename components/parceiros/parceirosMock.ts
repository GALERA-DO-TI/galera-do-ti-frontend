import { Parceiro } from "@/interfaces/parceiros";

/**
 * Dados temporários só para visualização durante o desenvolvimento.
 * Remover quando o backend expuser o endpoint /parceiros de verdade.
 * Os logos usam os assets já presentes em /public/assets quando existem;
 * o restante cai no placeholder (inicial + gradiente).
 */
export const parceirosMock: Parceiro[] = [
  {
    id: "fiap",
    nome: "FIAP",
    descricao: "50% de desconto em pós-graduação e cursos livres FIAP ON",
    categoria: "Cursos",
    cupom: "GALERA-GCP200",
    status: "disponivel",
    logoUrl: "/assets/parceiros/logo-fiap.png",
  },
  {
    id: "meta",
    nome: "Meta",
    descricao: "Primeira sessão de mentoria de com profissionais gratuita.",
    categoria: "Certificação",
    cupom: "GALERA-GCP200",
    status: "resgatado",
    logoUrl: "/assets/parceiros/logo-meta.png",
  },
  {
    id: "design-coffee",
    nome: "Design Coffee",
    descricao: "Primeira sessão de mentoria de com profissionais gratuita.",
    categoria: "Carreira",
    cupom: "GALERA-GCP200",
    status: "expirado",
    logoUrl: "/assets/parceiros/logo-design-coffee.png",
  },
  {
    id: "google",
    nome: "Google",
    descricao: "US$ 200 em créditos Google Cloud + certificação gratuita",
    categoria: "Cloud",
    cupom: "GALERA-GCP200",
    status: "disponivel",
    logoUrl: "/assets/parceiros/logo-google.png",
  },
  {
    id: "alura",
    nome: "Alura",
    descricao: "3 meses grátis em qualquer curso na Alura + Alura Cloud incluído",
    categoria: "Educação",
    cupom: "GALERA-GCP200",
    status: "disponivel",
    logoUrl: "/assets/parceiros/logo-alura.png",
    exigeLogin: true,
  },
  {
    id: "aws",
    nome: "AWS",
    descricao: "US$ 200 em créditos AWS+ voucher de certificação",
    categoria: "Cloud",
    cupom: "GALERA-GCP200",
    status: "disponivel",
    logoUrl: "/assets/parceiros/logo-aws.png",
  },
];

export const buscasPopulares = [
  "Cloud",
  "Certificação",
  "Certificação AWS",
  "Mentoria",
  "Pós-graduação",
];
