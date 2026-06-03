"use client";

/**
 * Contexto para fornecer um nonce a componentes filhos.
 *
 * Este contexto é usado para compartilhar um valor `nonce` (um valor
 * único de segurança) entre componentes da aplicação, permitindo que
 * scripts sejam injetados de forma segura e controlada.
 *
 * @type {React.Context<null|string>}
 */
import { createContext } from "react";

export const NonceContext = createContext(null);
