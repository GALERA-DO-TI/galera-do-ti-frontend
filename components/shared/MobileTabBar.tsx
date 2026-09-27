"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileTabBarLinks } from "@/helpers/mobileTabBarLinks";

export default function MobileTabBar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 z-10 flex w-[360px] max-w-[calc(100%-32px)] -translate-x-1/2 items-center justify-around rounded-[10px] border border-white/10 bg-eventos-sidebar py-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      {mobileTabBarLinks.map((tab) => {
        const ativo = isActive(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 px-2"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                ativo ? "border border-eventos-pink" : ""
              }`}
            >
              <tab.icon
                className={`h-5 w-5 ${ativo ? "text-eventos-pink" : "text-zinc-400"}`}
              />
            </span>
            <span
              className={`text-xs ${ativo ? "text-eventos-pink font-medium" : "text-zinc-400"}`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
