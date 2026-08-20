import { IconHome, IconBriefcase, IconUsers, IconCalendar, IconSettings } from "@/components/shared/icons";

export const mobileTabBarLinks = [
  { label: "Início", href: "/", icon: IconHome },
  { label: "Vagas", href: "/vagas", icon: IconBriefcase },
  { label: "Comunidade", href: "/comunidades", icon: IconUsers },
  { label: "Eventos", href: "/eventos", icon: IconCalendar, active: true },
  { label: "Menu", href: "/configuracoes", icon: IconSettings },
];
