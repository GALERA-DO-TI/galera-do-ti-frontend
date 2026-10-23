interface LogoPlaceholderProps {
  nome?: string;
  className?: string;
}

/**
 * Placeholder de logo de parceiro, usado quando não há logo disponível. Mostra a inicial do nome do parceiro.
 */
export default function LogoPlaceholder({
  nome,
  className = "",
}: LogoPlaceholderProps) {
  const inicial = (nome?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <span
      aria-hidden
      className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-eventos-pink/25 via-eventos-purple/20 to-eventos-cyan/20 text-lg font-bold text-white ${className}`}
    >
      {inicial}
    </span>
  );
}
