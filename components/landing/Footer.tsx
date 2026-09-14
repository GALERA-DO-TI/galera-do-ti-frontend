import Image from "next/image";
import Button from "@/components/ui/Button";

const NAV = [
  "Sobre",
  "Embaixadores",
  "Administradores",
  "Parceiros",
  "Canais",
  "Vagas",
  "Eventos",
];

const ACCOUNT = ["Login", "Cadastrar", "Termos de uso", "Privacidade"];

export default function Footer() {
  return (
    <footer className="bg-[#080817] px-6 pt-14 pb-9">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-primary bg-gradient-to-br from-[#101025] via-[#15102a] to-[#250d2d] p-7 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold md:text-[32px]">
              Faça parte da maior comunidade tech
            </h2>
            <p className="mt-1.5 max-w-xl text-on-surface">
              Aprenda, compartilhe, evolua e conquiste novas oportunidades ao
              lado de quem vive tecnologia todos os dias.
            </p>
          </div>
          <Button href="#" variant="gradient-pill">
            Quero Entrar! →
          </Button>
        </div>

        <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-4">
          <div>
            <p className="text-sm text-surface">
              A comunidade tech que conecta pessoas, gera oportunidades e
              transforma carreiras.
            </p>
            <div className="mt-4">
              <Image
                src="/assets/social-icons.svg"
                alt="Redes sociais da Galera do TI"
                width={242}
                height={21}
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-surface">
              <Image src="/assets/ic-outline-email.svg" alt="" width={16} height={16} aria-hidden />
              contato@galeradoti.com.br
            </div>
          </div>

          <div>
            <p className="font-bold">Navegação</p>
            <ul className="mt-3 space-y-2.5 text-sm font-bold text-on-surface">
              {NAV.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-surface">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold">Conta</p>
            <ul className="mt-3 space-y-2.5 text-sm font-bold text-on-surface">
              {ACCOUNT.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-surface">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative h-16 w-[71px] shrink-0 overflow-hidden rounded-md">
              <Image
                src="/assets/img-20260528-wa0268-removebg-preview-1.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm font-bold text-on-surface">
              Até o próximo deploy!
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-on-surface md:flex-row">
          <p>© 2026 GALERA DO T.I.. Todos os direitos reservados.</p>
          <p>Construído com ⚡ pela comunidade.</p>
        </div>
      </div>
    </footer>
  );
}
