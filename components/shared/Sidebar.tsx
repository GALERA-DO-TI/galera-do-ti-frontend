"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  IconFacebook,
  IconInstagram,
  IconTelegram,
  IconDiscord,
  IconYoutube,
  IconWhatsapp,
  IconSpotify,
  IconLinkedin,
} from "./icons";

const redesSociais = [
  { label: "Facebook", href: "#", icon: IconFacebook },
  { label: "Instagram", href: "#", icon: IconInstagram },
  { label: "Telegram", href: "#", icon: IconTelegram },
  { label: "Discord", href: "#", icon: IconDiscord },
  { label: "YouTube", href: "#", icon: IconYoutube },
  { label: "WhatsApp", href: "#", icon: IconWhatsapp },
  { label: "Spotify", href: "#", icon: IconSpotify },
  { label: "LinkedIn", href: "#", icon: IconLinkedin },
];

interface SubmenuSection {
  title: string;
  links: { label: string; href: string }[];
}

interface SidebarLink {
  label: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactElement;
  active?: boolean;
  submenu?: SubmenuSection[];
}

interface SidebarGroup {
  title: string;
  links: SidebarLink[];
}

const groups: SidebarGroup[] = [
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
        label: "Meus Eventos",
        href: "/eventos/meus-eventos",
        icon: IconMedal,
      },
      { label: "Meus Pedidos", href: "/marketplace/pedidos", icon: IconStar },
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

const allLinks = groups.flatMap((group) => group.links);

interface SidebarProps {
  logado: boolean;
}

export default function Sidebar({ logado }: SidebarProps) {
  const [submenuAberto, setSubmenuAberto] = useState<SidebarLink | null>(
    null,
  );

  return (
    <>
      {/* MD/Tablet: sidebar colapsada, só ícones */}
      <aside className="relative hidden md:flex lg:hidden w-[64px] shrink-0 flex-col border-r border-eventos-border bg-eventos-sidebar py-6">
        <div className="flex flex-1 flex-col items-center gap-1 overflow-y-auto">
          {allLinks.map((link) => (
            <button
              key={link.href}
              title={link.label}
              onClick={() =>
                link.submenu
                  ? setSubmenuAberto((atual) =>
                      atual?.href === link.href ? null : link,
                    )
                  : setSubmenuAberto(null)
              }
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                link.active
                  ? "bg-gradient-to-r from-[#FF2DAF] to-[#7B2FF7] text-white"
                  : "text-white hover:bg-white/5"
              }`}
            >
              <link.icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-center px-2">
          <span className="relative block h-10 w-10 overflow-hidden rounded-full border-2 border-eventos-pink">
            <Image
              src="/axalote.png"
              alt="Axolote mascote Galera do TI"
              fill
              className="object-cover"
            />
          </span>
        </div>

        {submenuAberto?.submenu && (
          <div className="absolute left-[64px] top-0 z-20 flex h-full w-[240px] flex-col gap-5 overflow-y-auto border-r border-white/5 bg-eventos-sidebar p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                {submenuAberto.label}
              </span>
              <button
                onClick={() => setSubmenuAberto(null)}
                aria-label="Fechar"
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {submenuAberto.submenu.map((section) => (
              <div key={section.title} className="flex flex-col gap-1">
                <span className="px-2 text-xs font-semibold text-eventos-pink">
                  {section.title}
                </span>
                {section.links.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="rounded-xl px-2 py-2 text-sm text-white hover:bg-white/5"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* LG/WEB: sidebar expandida, ícones + labels */}
      <aside className="relative hidden lg:flex w-[250px] shrink-0 flex-col border-r border-white/5 bg-eventos-sidebar py-6">
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4">
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <span className="px-2 text-xs font-semibold text-eventos-pink">
                {group.title}
              </span>
              {group.links.map((link) =>
                link.submenu ? (
                  <button
                    key={link.href}
                    onClick={() =>
                      setSubmenuAberto((atual) =>
                        atual?.href === link.href ? null : link,
                      )
                    }
                    className={`flex items-center gap-3 rounded-xl px-4 py-[11px] text-left text-sm transition-colors ${
                      submenuAberto?.href === link.href
                        ? "bg-gradient-to-r from-[#FF2DAF] to-[#7B2FF7] text-white font-medium"
                        : link.active
                          ? "bg-gradient-to-r from-[#FF2DAF] to-[#7B2FF7] text-white font-medium shadow-[0_0_16px_rgba(255,45,175,0.5)]"
                          : "text-white hover:bg-white/5"
                    }`}
                  >
                    <link.icon className="h-5 w-5 shrink-0" />
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-[11px] text-sm transition-colors ${
                      link.active
                        ? "bg-gradient-to-r from-[#FF2DAF] to-[#7B2FF7] text-white font-medium shadow-[0_0_16px_rgba(255,45,175,0.5)]"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    <link.icon className="h-5 w-5 shrink-0" />
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="mx-4 mt-4 flex w-[218px] shrink-0 flex-col gap-3 rounded-2xl border-[1.5px] border-[#FF2DAF]/70 bg-[#12122A] p-3">
          <div className="flex items-center gap-3">
            <Image
              src="/axalote.png"
              alt="Axolote mascote Galera do TI"
              width={64}
              height={52}
              className="shrink-0"
            />
            <p className="text-xs font-medium text-eventos-muted">
              Faça parte da maior comunidade de tecnologia!
            </p>
          </div>

          {logado && (
            <>
              <button className="w-full rounded-full bg-eventos-pink px-3 py-2 text-sm font-medium text-white">
                Convidar amigos
              </button>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-zinc-400">Siga a gente</span>
                <div className="flex flex-wrap gap-2 text-zinc-300">
                  {redesSociais.map((rede) => (
                    <a
                      key={rede.label}
                      href={rede.href}
                      title={rede.label}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
                    >
                      <rede.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {submenuAberto?.submenu && (
          <div className="absolute left-[250px] top-0 z-20 flex h-full w-[260px] flex-col gap-5 overflow-y-auto border-r border-white/5 bg-eventos-sidebar p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                {submenuAberto.label}
              </span>
              <button
                onClick={() => setSubmenuAberto(null)}
                aria-label="Fechar"
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {submenuAberto.submenu.map((section) => (
              <div key={section.title} className="flex flex-col gap-1">
                <span className="px-2 text-xs font-semibold text-eventos-pink">
                  {section.title}
                </span>
                {section.links.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="rounded-xl px-2 py-2 text-sm text-white hover:bg-white/5"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
