interface EmptyStateProps {
  mensagem: string;
}

export default function EmptyState({ mensagem }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-eventos-border bg-eventos-card p-6 text-sm text-zinc-400">
      {mensagem}
    </div>
  );
}
