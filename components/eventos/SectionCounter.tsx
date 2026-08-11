interface SectionCounterProps {
  titulo: string;
  quantidade: number;
}

export default function SectionCounter({
  titulo,
  quantidade,
}: SectionCounterProps) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-[16px] font-bold text-white">{titulo}</h2>
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-eventos-purple text-xs font-semibold text-white">
        {quantidade}
      </span>
    </div>
  );
}
