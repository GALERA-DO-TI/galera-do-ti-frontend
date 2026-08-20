import {
  IconHome,
  IconBriefcase,
  IconShare,
  IconCalendar,
  IconUsers,
  IconStore,
  IconCode,
  IconGraduationCap,
  IconNewspaper,
  IconMedal,
  IconStar,
  IconBookmark,
  IconSettings,
} from "@/components/shared/icons";
import { SidebarGroup } from "@/interfaces/sidebar";

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "PRINCIPAL",
    links: [
      { label: "Início", href: "/", icon: IconHome },
      {
        label: "Vagas",
        href: "/vagas",
        icon: IconBriefcase,
        submenu: [
          {
            title: "VAGAS",
            links: [
              { label: "Explorar vagas", href: "/vagas" },
              { label: "Vagas salvas", href: "/vagas/salvas" },
              { label: "Minhas candidaturas", href: "/candidaturas" },
            ],
          },
        ],
      },
      { label: "Comunidades", href: "/comunidades", icon: IconShare },
      { label: "Eventos", href: "/eventos", icon: IconCalendar, active: true },
    ],
  },
  {
    title: "EXPLORAR",
    links: [
      { label: "Networking", href: "/networking", icon: IconUsers },
      { label: "Marketplace", href: "/marketplace", icon: IconStore },
      { label: "Projetos", href: "/projetos", icon: IconCode },
      { label: "Aprendizado", href: "/aprendizado", icon: IconGraduationCap },
    ],
  },
  {
    title: "CONTEÚDO",
    links: [
      { label: "Notícias", href: "/noticias", icon: IconNewspaper },
      { label: "Parceiros", href: "/parceiros", icon: IconMedal },
      { label: "IA Galera do TI", href: "/ia", icon: IconStar },
    ],
  },
  {
    title: "MINHA ATIVIDADE",
    links: [
      { label: "Itens salvos", href: "/itens-salvos", icon: IconBookmark },
      {
        label: "Meus eventos",
        href: "/eventos/meus-eventos",
        icon: IconMedal,
      },
      {
        label: "Minhas candidaturas",
        href: "/candidaturas",
        icon: IconStar,
      },
      { label: "Meus pedidos", href: "/marketplace/pedidos", icon: IconStar },
    ],
  },
  {
    title: "CONTA",
    links: [
      { label: "Configurações", href: "/configuracoes", icon: IconSettings },
      { label: "Ajuda e suporte", href: "/ajuda", icon: IconMedal },
    ],
  },
];
