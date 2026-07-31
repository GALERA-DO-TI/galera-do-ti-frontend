"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconChevronDown,
  IconChevronRight,
  IconUser,
  IconMessageCircle,
} from "./icons";

interface HeaderProps {
  logado: boolean;
  nomeUsuario?: string;
}

const menuPerfil = [
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

const menuPublico = [
  { label: "Início", href: "/", submenu: null },
  { label: "Sobre", href: "/sobre", submenu: submenuPerfilFigma },
  { label: "Comunidade", href: "/comunidades", submenu: null },
  { label: "Oportunidades", href: "/vagas", submenu: submenuPerfilFigma },
  { label: "Conteúdo", href: "/noticias", submenu: null },
  { label: "FAQ", href: "/faq", submenu: null },
];

export default function Header({ logado, nomeUsuario }: HeaderProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [submenuAberto, setSubmenuAberto] = useState<string | null>(null);

  return (
    <header className="relative flex h-full items-center justify-between bg-eventos-sidebar px-6">
      <nav className="hidden lg:flex items-center gap-8 mr-[143px] ml-[89px]">
        {menuPublico.map((item) =>
          item.submenu ? (
            <div key={item.href} className="relative">
              <button
                onClick={() =>
                  setSubmenuAberto((atual) =>
                    atual === item.label ? null : item.label,
                  )
                }
                className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
              >
                {item.label}
                <IconChevronDown className="h-3 w-3" />
              </button>

              {submenuAberto === item.label && (
                <div className="absolute left-0 top-[44px] z-10 w-56">
                  <div className="mx-4 h-3 w-3 rotate-45 border-l border-t border-white/5 bg-eventos-card" />
                  <div className="-mt-1.5 flex flex-col gap-1 rounded-2xl border border-white/5 bg-eventos-card p-2 shadow-xl">
                    {item.submenu.map((sub, index) => (
                      <Link
                        key={`${sub.href}-${index}`}
                        href={sub.href}
                        className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-white hover:bg-white/5"
                      >
                        <span className="flex items-center gap-2">
                          {sub.label === "Sair" ? (
                            <IconMessageCircle className="h-4 w-4" />
                          ) : (
                            <IconUser className="h-4 w-4" />
                          )}
                          {sub.label}
                        </span>
                        <IconChevronRight className="h-4 w-4 text-zinc-500" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-300 hover:text-white"
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>

      {logado ? (
        <div className="ml-auto flex shrink-0 items-center gap-3 pr-5">
          <button
            onClick={() => setMenuAberto((open) => !open)}
            className="flex items-center gap-2"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-eventos-pink">
              <Image src="/axalote.png" alt="Avatar" fill className="object-cover" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-eventos-sidebar bg-green-400" />
            </span>
          </button>

          <Link
            href="/dashboard"
            className="flex h-8 items-center gap-2 rounded-xl border border-eventos-pink px-[28px] py-[14px] text-sm font-medium text-eventos-pink"
          >
            Dashboard
          </Link>

          {menuAberto && (
            <div className="absolute right-6 top-[64px] z-10 w-64 rounded-2xl border border-eventos-border bg-eventos-card p-2 shadow-lg">
              <span className="block px-3 py-2 text-xs font-semibold text-eventos-pink">
                Perfil
              </span>
              <Link
                href="/perfil"
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-eventos-pink">
                  <Image src="/axalote.png" alt="Avatar" fill className="object-cover" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm text-white">
                    {nomeUsuario ?? "Usuário"}
                  </span>
                  <span className="text-xs text-eventos-cyan">
                    Ver meu perfil
                  </span>
                </span>
              </Link>
              {menuPerfil.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <button className="block w-full rounded-xl px-3 py-2 text-left text-sm text-red-400 hover:bg-white/5">
                Sair
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="ml-auto flex shrink-0 items-center gap-2 pr-5">
          <Link
            href="/eventos?logado=1"
            className="flex h-[47px] items-center rounded-xl border-[1.5px] border-eventos-pink px-[28px] py-[14px] text-sm font-medium text-eventos-pink"
          >
            Entrar
          </Link>
          <button className="h-[47px] rounded-xl bg-gradient-to-r from-[#FF2DAF] to-[#7B2FF7] px-[28px] py-[14px] text-sm font-medium text-white">
            Cadastrar
          </button>
        </div>
      )}
    </header>
  );
}
