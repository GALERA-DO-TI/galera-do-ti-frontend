import { ComponentType } from "react";
import Link from "next/link";
import { IconCalendar, IconHeart, IconSearch } from "@/components/shared/icons";

/**
 * Cada variante cobre um dos estados vazios previstos no Figma:
 * - secao-vazia: seção de eventos (destaque/próximos/meetups) sem itens.
 * - sem-eventos-confirmados: "Meus eventos confirmados" sem nenhum item.
 * - sem-interesses: "Meus interesses" sem nenhum item.
 * - busca-sem-resultado: busca/filtro ativo que não retornou nenhum evento.
 */
export type EmptyStateVariant =
  | "secao-vazia"
  | "sem-eventos-confirmados"
  | "sem-interesses"
  | "busca-sem-resultado";

interface EmptyStateConfig {
  icon: ComponentType<{ className?: string }>;
  titulo: string;
  mensagem: string;
}

const CONFIG_POR_VARIANTE: Record<EmptyStateVariant, EmptyStateConfig> = {
  "secao-vazia": {
    icon: IconCalendar,
    titulo: "Nada por aqui ainda",
    mensagem: "Ainda não temos eventos agendados para esta seção.",
  },
  "sem-eventos-confirmados": {
    icon: IconCalendar,
    titulo: "Nenhum evento confirmado",
    mensagem:
      "Você ainda não confirmou presença em nenhum evento. Navegue pelas categorias e comece agora mesmo a se conectar e evoluir cada vez mais.",
  },
  "sem-interesses": {
    icon: IconHeart,
    titulo: "Nenhum interesse marcado",
    mensagem: "Você ainda não marcou interesse em nenhum evento.",
  },
  "busca-sem-resultado": {
    icon: IconSearch,
    titulo: "Nenhum resultado encontrado",
    mensagem:
      "Não encontramos eventos para essa busca ou filtro. Tente outros termos ou categorias.",
  },
};

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  /** Sobrescreve o título padrão da variante. */
  titulo?: string;
  /** Sobrescreve a mensagem padrão da variante. */
  mensagem?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export default function EmptyState({
  variant = "secao-vazia",
  titulo,
  mensagem,
  ctaLabel,
  ctaHref,
  className = "",
}: EmptyStateProps) {
  const config = CONFIG_POR_VARIANTE[variant];
  const Icon = config.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex max-w-117.5 items-start gap-3 ${className}`}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-eventos-border text-eventos-cyan">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-white">
          {titulo ?? config.titulo}
        </p>
        <p className="text-xs lg:text-sm font-medium text-[#8e9198]">
          {mensagem ?? config.mensagem}
        </p>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="mt-2 w-fit rounded-full bg-eventos-pink px-4 py-2 text-xs font-semibold text-white"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
