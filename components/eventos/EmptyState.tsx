interface EmptyStateProps {
  mensagem: string;
}

export default function EmptyState({ mensagem }: EmptyStateProps) {
  return (
    <p className="max-w-[470px] text-xs lg:text-sm font-medium text-[#8e9198]">
      {mensagem}
    </p>
  );
}
