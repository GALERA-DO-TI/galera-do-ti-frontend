"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Início", hasChevron: true },
  { label: "Sobre" },
  { label: "Comunidade" },
  { label: "Oportunidades" },
  { label: "Conteúdo" },
  { label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="relative block h-[19px] w-[120px] shrink-0">
          <Image
            src="/assets/galeradoti-1.svg"
            alt="Galera do TI"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#b8bce0] xl:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href="#" className="flex items-center gap-1.5 hover:text-surface">
              {link.label}
              {link.hasChevron && (
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Button href="#" variant="text" className="hidden md:inline-block">
            Entrar
          </Button>
          <Button href="#" variant="gradient" className="hidden md:inline-block">
            Cadastrar
          </Button>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-5 w-7 items-center justify-center xl:hidden"
          >
            <svg width="27" height="20" viewBox="0 0 27 20" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M2 2l23 16M25 2L2 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path d="M0 1.5h27M0 10h27M0 18.5h27" stroke="white" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/5 px-6 py-4 xl:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="flex items-center gap-1.5 rounded-lg px-2 py-2.5 text-sm font-medium text-[#b8bce0] hover:bg-white/5 hover:text-surface"
            >
              {link.label}
              {link.hasChevron && (
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              )}
            </a>
          ))}

          <div className="mt-3 flex flex-col gap-3 md:hidden">
            <a
              href="#"
              className="rounded-lg border border-white/10 px-5 py-2.5 text-center text-sm font-semibold text-[#ff7acb]"
            >
              Entrar
            </a>
            <Button href="#" variant="gradient" className="w-full">
              Cadastrar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
