"use client";

import { useState } from "react";

// NOTE: only the first answer comes from the Figma spec. The rest are
// placeholder copy (not in the design) written to avoid empty accordions —
// swap them for the real answers when available.
const COLUMN_1 = [
  {
    q: "O que é a Galera do TI?",
    a: "Somos uma comunidade tech para networking, aprendizado e oportunidades na área de tecnologia.",
  },
  {
    q: "A Comunidade é gratuita?",
    a: "Sim! O acesso à comunidade, aos canais e à maioria dos eventos é totalmente gratuito.",
  },
  {
    q: "Como eu divulgo uma vaga?",
    a: "Empresas parceiras podem cadastrar vagas pelo banco de talentos ou entrar em contato diretamente com a equipe da comunidade.",
  },
  {
    q: "Como entro nos canais oficiais?",
    a: "Os links para os nossos canais (Discord, WhatsApp e redes sociais) ficam disponíveis no rodapé do site e na página de boas-vindas.",
  },
  {
    q: "Posso participar sendo iniciante?",
    a: "Com certeza! A comunidade é aberta a todos os níveis, de quem está começando agora até profissionais experientes.",
  },
];

const COLUMN_2 = [
  {
    q: "Como funcionam os eventos?",
    a: "Organizamos encontros presenciais e online, com palestras, workshops e mentorias abertos a todos os membros da comunidade.",
  },
  {
    q: "Posso propor um evento ou palestra?",
    a: "Pode sim. Envie sua proposta pelos nossos canais oficiais e a equipe de organização entra em contato para alinhar os detalhes.",
  },
  {
    q: "Vocês oferecem mentoria?",
    a: "Sim, temos um programa de mentoria voluntária conectando membros mais experientes a quem está começando na área.",
  },
  {
    q: "Como funciona a moderação?",
    a: "Contamos com uma equipe de moderadores voluntários que zela pelo respeito e a qualidade das discussões em todos os canais.",
  },
];

type FaqItem = { q: string; a: string };

function FaqColumn({
  items,
  openId,
  onToggle,
}: {
  items: FaqItem[];
  openId: string | null;
  onToggle: (q: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.q;
        return (
          <div key={item.q} className="rounded-lg border border-white/10 bg-primary/30">
            <button
              type="button"
              onClick={() => onToggle(item.q)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold"
            >
              {item.q}
              <span
                className={`ml-3 shrink-0 text-on-surface transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              >
                ⌄
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm text-on-surface">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(COLUMN_1[0].q);

  const toggle = (q: string) => setOpenId((current) => (current === q ? null : q));

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-extrabold md:text-3xl">FAQ</h2>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          <FaqColumn items={COLUMN_1} openId={openId} onToggle={toggle} />
          <div className="hidden md:block">
            <FaqColumn items={COLUMN_2} openId={openId} onToggle={toggle} />
          </div>
        </div>
      </div>
    </section>
  );
}
