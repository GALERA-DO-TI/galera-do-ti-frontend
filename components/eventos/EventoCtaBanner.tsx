import Link from "next/link";
import { Evento } from "@/interfaces/events";

interface EventoCtaBannerProps {
  evento: Evento;
}

/** Banner de rodapé só pra visitante deslogado — o EventoIngressoCard já cobre os outros estados. */
export default function EventoCtaBanner({ evento }: EventoCtaBannerProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-eventos-purple/60 bg-eventos-card p-6 text-center">
      <h3 className="text-lg font-bold text-white">Não perca essa oportunidade!</h3>
      <p className="text-sm font-medium text-eventos-muted">
        Entre ou crie sua conta para se inscrever no {evento.titulo}.
      </p>
      <div className="mt-2 flex items-center gap-6">
        <Link
          href={`/eventos/${evento.id}?preview=logado`}
          className="text-sm font-semibold text-eventos-cyan"
        >
          Entrar
        </Link>
        <Link
          href={`/eventos/${evento.id}?preview=logado`}
          className="flex h-11 items-center justify-center rounded-full bg-eventos-pink px-6 text-sm font-semibold text-white shadow-[0_0_18px_0_rgba(255,45,175,0.4)]"
        >
          Criar conta
        </Link>
      </div>
    </div>
  );
}
