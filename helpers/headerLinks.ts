export const menuPerfil = [
  { label: "Editar perfil", href: "/perfil/editar" },
  { label: "Minha conta", href: "/conta" },
  { label: "Configurações", href: "/configuracoes" },
];

const submenuPerfilFigma = [
  { label: "Editar perfil", href: "/perfil/editar" },
  { label: "Minha conta", href: "/conta" },
  { label: "Configurações", href: "/configuracoes" },
  { label: "Sair", href: "/sair" },
  { label: "Editar perfil", href: "/perfil/editar" },
  { label: "Minha conta", href: "/conta" },
];

export const menuPublico = [
  { label: "Início", href: "/", submenu: null },
  { label: "Sobre", href: "/sobre", submenu: submenuPerfilFigma },
  { label: "Comunidade", href: "/comunidades", submenu: null },
  { label: "Oportunidades", href: "/vagas", submenu: submenuPerfilFigma },
  { label: "Conteúdo", href: "/noticias", submenu: null },
  { label: "FAQ", href: "/faq", submenu: null },
];
