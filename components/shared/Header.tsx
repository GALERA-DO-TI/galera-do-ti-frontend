"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconChevronDown,
  IconChevronRight,
  IconUser,
  IconMessageCircle,
  IconMenu,
} from "./icons";
import { menuPerfil, menuPublico } from "@/helpers/headerLinks";

interface HeaderProps {
  logado?: boolean;
  nomeUsuario?: string;
}

export default function Header({ logado = true, nomeUsuario }: HeaderProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [submenuAberto, setSubmenuAberto] = useState<string | null>(null);

  return (
    <header className="relative flex h-full w-full flex-1 items-center justify-between bg-[#02010F] px-4 md:px-6">
      <span className={`items-center ${logado ? "flex lg:hidden" : "flex"}`}>
        <Image
          src="/logo-galera-do-ti.svg"
          alt="Galera do TI"
          width={140}
          height={22}
          priority
        />
      </span>

      <nav className="hidden lg:flex items-center gap-8 lg:mr-[143px] lg:ml-[89px]">
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

      {!logado ? (
        <div className="ml-auto flex shrink-0 items-center gap-1 lg:gap-2">
          {/* TEMPORÁRIO: leva direto para a versão logada só para conferência
              visual. A rota de autenticação real fica com o Yago. */}
          <Link
            href="/eventos?preview=logado"
            className="flex items-center justify-center px-3 lg:px-[28px] lg:py-[14px] text-xs lg:text-base font-semibold text-[#ff7acb]"
          >
            Entrar
          </Link>

          <Link
            href="/eventos?preview=logado"
            className="flex h-[23px] w-[73px] lg:h-8 lg:w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-eventos-pink to-eventos-purple text-xs lg:text-base font-semibold text-white shadow-[0_0_18px_0_rgba(255,45,175,0.4)]"
          >
            Cadastrar
          </Link>
        </div>
      ) : (
      <div className="ml-auto flex shrink-0 items-center gap-3 md:pr-5">
        <Link
          href="/dashboard"
          className="hidden lg:flex h-8 w-[120px] items-center justify-center rounded-xl border border-eventos-purple bg-[rgba(14,14,34,0.33)] px-[28px] py-[14px] text-sm font-semibold text-white backdrop-blur-[3.5px]"
        >
          Dashboard
        </Link>

        <button
          onClick={() => setMenuAberto((open) => !open)}
          className="flex items-center gap-2"
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-eventos-pink">
            <Image src="/axalote.png" alt="Avatar" fill className="object-cover" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-eventos-sidebar bg-green-400" />
          </span>
          <span className="hidden md:block lg:hidden text-sm font-medium text-white">
            {nomeUsuario ?? "Usuário"}
          </span>
        </button>

        <button aria-label="Abrir menu" className="flex lg:hidden text-white">
          <IconMenu className="h-6 w-6" />
        </button>

        {menuAberto && (
          <div className="absolute right-4 md:right-6 top-[64px] z-10 w-64 rounded-2xl border border-eventos-border bg-eventos-card p-2 shadow-lg">
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
      )}
    </header>
  );
}
