"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarGroups } from "@/helpers/sidebarLinks";
import { SidebarLink } from "@/interfaces/sidebar";
import {
  IconFacebook,
  IconInstagram,
  IconTelegram,
  IconDiscord,
  IconYoutube,
  IconWhatsapp,
  IconSpotify,
  IconLinkedin,
} from "@/components/shared/icons";

const allLinks = sidebarGroups.flatMap((group) => group.links);

const redesSociais = [
  { label: "Facebook", icon: IconFacebook },
  { label: "Instagram", icon: IconInstagram },
  { label: "Telegram", icon: IconTelegram },
  { label: "Discord", icon: IconDiscord },
  { label: "YouTube", icon: IconYoutube },
  { label: "WhatsApp", icon: IconWhatsapp },
  { label: "Spotify", icon: IconSpotify },
  { label: "LinkedIn", icon: IconLinkedin },
];

export default function Sidebar() {
  const [submenuAberto, setSubmenuAberto] = useState<SidebarLink | null>(
    null,
  );

  return (
    <>
      {/* MD/Tablet: sidebar colapsada, só ícones */}
      <aside className="relative hidden md:flex lg:hidden w-[80px] shrink-0 flex-col border-r border-white/5 bg-[#0a0a18]/90 py-6">
        <div className="scrollbar-none flex flex-col items-center gap-[22px] overflow-y-auto">
          {sidebarGroups.map((group) => (
            <div key={group.title} className="flex flex-col items-center">
              {group.links.map((link) => (
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
          ))}
        </div>

        <div className="mt-auto flex justify-center px-2">
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
          <div className="scrollbar-none absolute left-[64px] top-0 z-20 flex h-full w-[240px] flex-col gap-5 overflow-y-auto border-r border-white/5 bg-eventos-sidebar p-4">
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
      <aside className="scrollbar-none sticky top-0 hidden lg:flex h-[calc(100vh-60px)] w-[250px] shrink-0 flex-col overflow-y-auto border-r border-white/5 bg-eventos-sidebar py-6">
        <div className="flex flex-col gap-[35px] px-4">
          {sidebarGroups.map((group) => (
            <div key={group.title} className="flex flex-col">
              <span className="block px-2 pb-1 text-xs font-semibold leading-4 text-eventos-pink">
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
                    className={`flex items-center gap-3 rounded-[999px] px-4 py-[11px] text-left text-sm transition-colors ${
                      submenuAberto?.href === link.href
                        ? "bg-gradient-to-r from-eventos-pink to-eventos-purple text-white font-medium"
                        : link.active
                          ? "bg-gradient-to-r from-eventos-pink to-eventos-purple text-white font-medium shadow-[0_0_18px_rgba(255,45,175,0.45)]"
                          : "text-eventos-muted hover:bg-white/5"
                    }`}
                  >
                    <link.icon className="h-5 w-5 shrink-0" />
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-[999px] px-4 py-[11px] text-sm transition-colors ${
                      link.active
                        ? "bg-gradient-to-r from-eventos-pink to-eventos-purple text-white font-medium shadow-[0_0_18px_rgba(255,45,175,0.45)]"
                        : "text-eventos-muted hover:bg-white/5"
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

        <div className="mt-auto flex flex-col">
        <div className="mx-4 flex w-[218px] min-h-[158px] shrink-0 flex-col items-center justify-between gap-3 rounded-2xl border-[1.5px] border-eventos-pink/70 bg-[#12122A] px-3 py-3 shadow-[0_0_20px_rgba(255,45,175,0.25)]">
          <div className="flex items-center gap-2 w-full">
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

          <button className="flex h-10 w-full shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] bg-gradient-to-r from-[#3d8bff] to-eventos-cyan px-4 text-sm font-semibold text-[#06121f] shadow-[0_0_14px_rgba(34,228,255,0.35)]">
            Convidar amigos
          </button>
        </div>

        <div className="mx-4 mt-3 mb-6 flex flex-col items-center gap-2">
          <span className="text-[13px] font-semibold text-white">
            Siga a gente
          </span>
          <div className="flex items-center justify-center gap-[7px]">
            {redesSociais.map((rede) => (
              <a
                key={rede.label}
                href="#"
                aria-label={rede.label}
                className="text-eventos-muted transition-colors hover:text-white"
              >
                <rede.icon className="h-[15px] w-[15px]" />
              </a>
            ))}
          </div>
        </div>
        </div>

        {submenuAberto?.submenu && (
          <div className="scrollbar-none absolute left-[250px] top-0 z-20 flex h-full w-[260px] flex-col gap-5 overflow-y-auto border-r border-white/5 bg-eventos-sidebar p-4 shadow-xl">
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
