import { IconUsers, IconBriefcase, IconCalendar } from "@/components/shared/icons";
import { IconBuilding } from "./icons";

const STATS = [
  { icon: IconUsers, valor: "+15.2K", label: "Membros" },
  { icon: IconBriefcase, valor: "+1.250", label: "Vagas abertas" },
  { icon: IconCalendar, valor: "+320", label: "Eventos realizados" },
  { icon: IconBuilding, valor: "+180", label: "Empresas parceiras" },
];

/** Faixa de estatísticas da tela Deslogado (v2).*/
export default function ParceirosStats() {
  return (
    <div className="@container rounded-2xl border border-eventos-border bg-eventos-card">
      <div className="grid grid-cols-1 gap-4 p-5 @xs:grid-cols-2 @4xl:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-eventos-purple/20 text-eventos-pink @lg:h-12 @lg:w-12">
              <stat.icon className="h-5 w-5 @lg:h-6 @lg:w-6" />
            </span>
            <div className="min-w-0">
              <p className="bg-gradient-to-r from-eventos-pink to-eventos-purple bg-clip-text text-xl font-extrabold text-transparent @lg:text-2xl">
                {stat.valor}
              </p>
              <p className="truncate text-xs text-eventos-muted @lg:text-sm">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
