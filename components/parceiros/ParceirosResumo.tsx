import { Parceiro } from "@/interfaces/parceiros";

interface ParceirosResumoProps {
  parceiros: Parceiro[];
}

/**
 * Linha de resumo da variante "Logado (v2)" (frames tablet):
 * "6 Benefícios disponíveis · 2 Já Resgatados · 1 Expirado".
 */
export default function ParceirosResumo({ parceiros }: ParceirosResumoProps) {
  const contar = (status: Parceiro["status"]) =>
    parceiros.filter((p) => p.status === status).length;

  const itens = [
    { valor: contar("disponivel"), label: "Benefícios disponíveis" },
    { valor: contar("resgatado"), label: "Já Resgatados" },
    { valor: contar("expirado"), label: "Expirado" },
  ];

  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
      {itens.map((item) => (
        <p key={item.label} className="text-base text-eventos-muted md:text-lg">
          <span className="mr-1.5 font-bold text-white">{item.valor}</span>
          {item.label}
        </p>
      ))}
    </div>
  );
}
