"use client";
import { useEffect, useState } from "react";
import { NonceContext } from "@/contexts/NonceContext";

/**
 * Provedor de Nonce
 *
 * Este componente provê um valor `nonce` através do contexto `NonceContext`.
 * O nonce é utilizado para injetar scripts de forma segura, garantindo que
 * apenas scripts com o nonce correto sejam executados.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string|null} props.nonce - O valor do nonce a ser fornecido aos componentes filhos.
 * @param {React.ReactNode} props.children - Componentes filhos que terão acesso ao nonce.
 * @returns {JSX.Element} Um elemento JSX que fornece o contexto de nonce.
 *
 */

export default function NonceProvider({ nonce, children }: any) {
  const [nonceKey, setNonceKey] = useState(null);

  useEffect(() => {
    if (!nonceKey) setNonceKey(nonce);
  }, [nonce]);

  return (
    <NonceContext.Provider value={nonceKey}>{children}</NonceContext.Provider>
  );
}
