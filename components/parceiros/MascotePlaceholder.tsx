interface MascotePlaceholderProps {
  className?: string;
}

/**
 * Placeholder do mascote (robô triste) usado nos estados de erro e busca vazia.
 */
export default function MascotePlaceholder({
  className = "",
}: MascotePlaceholderProps) {
  return (
    <svg
      viewBox="0 0 160 170"
      fill="none"
      role="img"
      aria-label="Mascote da Galera do TI"
      className={className}
    >
      <defs>
        <linearGradient id="mascoteCorpo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f5ff" />
          <stop offset="1" stopColor="#c8d2e6" />
        </linearGradient>
        <linearGradient id="mascotePlaca" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7b2ff7" />
          <stop offset="1" stopColor="#22e4ff" />
        </linearGradient>
      </defs>

      {/* Plataforma */}
      <ellipse cx="80" cy="150" rx="52" ry="14" fill="url(#mascotePlaca)" opacity="0.9" />
      <ellipse cx="80" cy="147" rx="40" ry="9" fill="#050510" opacity="0.35" />

      {/* Corpo */}
      <rect x="52" y="86" width="56" height="46" rx="20" fill="url(#mascoteCorpo)" />
      <rect x="66" y="120" width="28" height="8" rx="4" fill="#22e4ff" opacity="0.6" />

      {/* Braços */}
      <rect x="40" y="92" width="12" height="30" rx="6" fill="url(#mascoteCorpo)" />
      <rect x="108" y="92" width="12" height="30" rx="6" fill="url(#mascoteCorpo)" />

      {/* Cabeça */}
      <rect x="46" y="34" width="68" height="56" rx="24" fill="url(#mascoteCorpo)" />
      {/* Antena */}
      <line x1="80" y1="34" x2="80" y2="20" stroke="#c8d2e6" strokeWidth="3" />
      <circle cx="80" cy="17" r="5" fill="#ff2daf" />

      {/* Tela do rosto */}
      <rect x="56" y="46" width="48" height="32" rx="14" fill="#160a22" />
      {/* Olhos tristes (rosa) */}
      <path d="M64 62c3-4 9-4 12 0" stroke="#ff2daf" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M84 62c3-4 9-4 12 0" stroke="#ff2daf" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
