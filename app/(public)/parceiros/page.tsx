import type { Metadata } from "next";
import ParceirosViewContainer from "@/components/parceiros/ParceirosViewContainer";

export const metadata: Metadata = {
  title: "Parceiros | Galera do TI",
  description:
    "Conheça empresas parceiras e aproveite benefícios exclusivos para membros da Galera do TI.",
};

export default function ParceirosPage() {
  return <ParceirosViewContainer />;
}
