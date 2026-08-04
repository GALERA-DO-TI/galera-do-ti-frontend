import type { Metadata } from "next";
import EventosView from "@/components/eventos/EventosView";

export const metadata: Metadata = {
  title: "Eventos | Galera do TI",
  description:
    "Descubra eventos, conecte-se e participe da comunidade Galera do TI.",
};

export default function EventosPage() {
  return <EventosView />;
}
