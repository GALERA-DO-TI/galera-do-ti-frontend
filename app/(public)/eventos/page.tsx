import type { Metadata } from "next";
import EventosViewContainer from "@/components/eventos/EventosViewContainer";

export const metadata: Metadata = {
  title: "Eventos | Galera do TI",
  description:
    "Descubra eventos, conecte-se e participe da comunidade Galera do TI.",
};

export default function EventosPage() {
  return <EventosViewContainer />;
}
