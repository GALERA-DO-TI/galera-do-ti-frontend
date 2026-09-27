"use client";

import { useEffect, useState } from "react";
import { enviarPropostaParceria } from "@/services/parceiros";
import { PropostaParceria } from "@/interfaces/parceiros";
import { IconClose } from "@/components/shared/icons";
import { IconCheck, IconAlertCircle } from "./icons";

/**
 * Enquanto não existe backend, o envio é simulado (sucesso após um pequeno
 * delay). Trocar para `false` para usar `enviarPropostaParceria` de verdade.
 */
const SIMULAR_ENVIO = true;

export type EstadoProposta = "form" | "enviando" | "sucesso" | "erro";

interface PropostaParceriaModalProps {
  aberto: boolean;
  onClose: () => void;
  /** Estado inicial (usado pelos previews `?proposta=`). */
  estadoInicial?: EstadoProposta;
  /** Label do botão da tela de sucesso ("Voltar para a comunidade" / "Ver meus projetos"). */
  sucessoLabel?: string;
  onSucessoAcao?: () => void;
}

const CAMPO =
  "w-full rounded-lg border border-white/10 bg-eventos-page px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-eventos-purple focus:outline-none";
const LABEL = "text-sm font-medium text-white";

export default function PropostaParceriaModal({
  aberto,
  onClose,
  estadoInicial = "form",
  sucessoLabel = "Voltar para a comunidade",
  onSucessoAcao,
}: PropostaParceriaModalProps) {
  const [estado, setEstado] = useState<EstadoProposta>(estadoInicial);
  const [form, setForm] = useState<PropostaParceria>({
    empresa: "",
    email: "",
    telefone: "",
    site: "",
    descricao: "",
  });

  // Sincroniza o estado interno com as props ao (re)abrir o modal — ajuste
  // durante a renderização, padrão recomendado em vez de useEffect.
  const [chave, setChave] = useState(`${aberto}:${estadoInicial}`);
  const chaveAtual = `${aberto}:${estadoInicial}`;
  if (chave !== chaveAtual) {
    setChave(chaveAtual);
    if (aberto) setEstado(estadoInicial);
  }

  // Enquanto aberto: trava o scroll da página e fecha com Esc.
  useEffect(() => {
    if (!aberto) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, onClose]);

  if (!aberto) return null;

  const atualizar = (campo: keyof PropostaParceria, valor: string) =>
    setForm((atual) => ({ ...atual, [campo]: valor }));

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("enviando");
    try {
      if (SIMULAR_ENVIO) {
        await new Promise((r) => setTimeout(r, 1200));
      } else {
        await enviarPropostaParceria(form);
      }
      setEstado("sucesso");
    } catch {
      setEstado("erro");
    }
  };

  const enviando = estado === "enviando";

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label="Proposta de parceria"
    >
      {/* min-h-full + items-center: centraliza quando cabe, rola quando não cabe */}
      <div
        className="flex min-h-full items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
      {estado === "sucesso" ? (
        <div
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-eventos-card p-6 text-center sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5"
          >
            <IconClose className="h-4 w-4" />
          </button>

          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-eventos-pink to-eventos-purple text-white">
            <IconCheck className="h-8 w-8" />
          </span>
          <h2 className="mt-4 text-2xl font-bold text-white">Proposta enviada!</h2>
          <p className="mt-3 text-sm text-eventos-muted">
            Sua proposta de parceria foi enviada à nossa equipe de moderação. Em
            breve entraremos em contato pelos canais informados para dar
            continuidade ao processo.
          </p>
          <button
            type="button"
            onClick={onSucessoAcao ?? onClose}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-eventos-pink to-eventos-purple px-6 py-3 text-sm font-semibold text-white"
          >
            {sucessoLabel}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
          <form
            onSubmit={enviar}
            className="rounded-2xl border border-white/10 bg-eventos-card p-5 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Proposta de parceria
                </h2>
                <p className="mt-1 text-sm text-eventos-muted">
                  Preencha os dados para a moderação possa entrar em contato.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5"
              >
                <IconClose className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="proposta-empresa">
                  Nome da Instituição
                </label>
                <input
                  id="proposta-empresa"
                  className={CAMPO}
                  placeholder="Ex: Empresa Educação"
                  value={form.empresa}
                  onChange={(e) => atualizar("empresa", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="proposta-email">
                  E-mail Institucional
                </label>
                <input
                  id="proposta-email"
                  type="email"
                  className={CAMPO}
                  placeholder="Ex.: emailinstitucional@gmail.com"
                  value={form.email}
                  onChange={(e) => atualizar("email", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="proposta-telefone">
                  WhatsApp/telefone
                </label>
                <input
                  id="proposta-telefone"
                  className={CAMPO}
                  placeholder="Ex: 11 966123489"
                  value={form.telefone}
                  onChange={(e) => atualizar("telefone", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="proposta-site">
                  Site
                </label>
                <input
                  id="proposta-site"
                  className={`${CAMPO} md:max-w-sm`}
                  placeholder="www.sitedaempresa.com.br"
                  value={form.site}
                  onChange={(e) => atualizar("site", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="proposta-descricao">
                  Descrição
                </label>
                <textarea
                  id="proposta-descricao"
                  rows={4}
                  className={`${CAMPO} resize-none`}
                  placeholder="Conte um pouco sobre a empresa e a proposta de parceria. Nossa equipe irá analisar as informações enviadas."
                  value={form.descricao}
                  onChange={(e) => atualizar("descricao", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 min-[360px]:flex-row min-[360px]:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-eventos-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5 min-[360px]:w-auto"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="rounded-lg bg-gradient-to-r from-eventos-pink to-eventos-purple px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-90 min-[360px]:w-auto"
              >
                {enviando ? "Enviando Proposta..." : "Enviar Proposta"}
              </button>
            </div>
          </form>

          {estado === "erro" && (
            <div className="ml-auto mt-4 flex w-full max-w-sm items-start gap-3 rounded-xl border border-red-500/60 bg-red-950/40 p-4">
              <IconAlertCircle className="h-5 w-5 shrink-0 text-red-400" />
              <div>
                <p className="text-sm font-bold text-red-400">
                  Não foi possível enviar proposta!
                </p>
                <p className="mt-0.5 text-sm text-eventos-muted">
                  Ocorreu um erro ao enviar a proposta. Tente novamente mais
                  tarde.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
