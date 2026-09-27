"use client";

import { Parceiro } from "@/interfaces/parceiros";
import ParceiroCard from "./ParceiroCard";
import Pagination from "./Pagination";

interface ParceirosGridProps {
  parceiros: Parceiro[];
  deslogado?: boolean;
  colunas?: "padrao" | "tres";
  onResgatar?: (parceiro: Parceiro) => void;
}

const GRID = {
  padrao: "grid-cols-1 @xl:grid-cols-2 @6xl:grid-cols-3",
  tres: "grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3",
};

export default function ParceirosGrid({
  parceiros,
  deslogado,
  colunas = "padrao",
  onResgatar,
}: ParceirosGridProps) {
  return (
    <div className="@container flex flex-col gap-6">
      <div className={`grid gap-4 @xl:gap-5 ${GRID[colunas]}`}>
        {parceiros.map((parceiro) => (
          <ParceiroCard
            key={parceiro.id}
            parceiro={parceiro}
            deslogado={deslogado}
            onResgatar={onResgatar}
          />
        ))}
      </div>

      <Pagination paginaAtual={1} totalPaginas={12} />
    </div>
  );
}
