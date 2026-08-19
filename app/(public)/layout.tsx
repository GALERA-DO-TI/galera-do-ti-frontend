import React from "react";
import AmplifyConfig from "@/components/shared/AmplifyConfig";

export default function PublicLayout({ children }: React.PropsWithChildren) {
  // Amplify precisa estar configurado aqui também: páginas públicas como
  // /eventos leem a sessão real (useSessaoUsuario) pra saber se mostram a
  // versão logada, mesmo sem exigir login pra acessar a rota.
  return (
    <AmplifyConfig>
      <div className="flex min-h-screen w-full flex-col">{children}</div>
    </AmplifyConfig>
  );
}
