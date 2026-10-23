import { ReactNode } from "react";
import Image from "next/image";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import MobileTabBar from "@/components/shared/MobileTabBar";

interface EventosShellProps {
  /** A rota pública renderiza a versão deslogada; a autenticada, a completa. */
  logado?: boolean;
  nomeUsuario?: string;
  children: ReactNode;
}

/**
 * Casca (topo com logo, sidebar, tab bar mobile) compartilhada entre o hub
 * de Eventos e as páginas de seção (/eventos/[secao]) — mantém a navegação
 * idêntica nas duas e evita duplicar esse JSX.
 */
export default function EventosShell({
  logado = true,
  nomeUsuario,
  children,
}: EventosShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-11.25 md:h-15 border-b border-eventos-border">
        {logado && (
          <div className="hidden lg:flex w-62.5 shrink-0 items-center border-r border-eventos-border bg-eventos-sidebar px-6">
            <Image
              src="/logo-galera-do-ti.svg"
              alt="Galera do TI"
              width={180}
              height={28}
              priority
            />
          </div>
        )}
        <div className="flex flex-1">
          <Header logado={logado} nomeUsuario={nomeUsuario} />
        </div>
      </div>

      <div className="flex flex-1">
        {logado && <Sidebar />}

        <main
          className={`flex min-w-0 flex-1 flex-col gap-8 bg-eventos-page p-4 pb-28 md:p-8 md:pb-8 ${
            logado ? "" : "lg:px-28"
          }`}
        >
          {children}
        </main>
      </div>

      {logado && <MobileTabBar />}
    </div>
  );
}
