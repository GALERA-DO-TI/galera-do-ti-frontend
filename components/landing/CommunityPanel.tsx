import Image from "next/image";

const TAGS = ["Networking real", "Aprendizado contínuo", "Visibilidade profissional"];

export default function CommunityPanel() {
  return (
    <section className="px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-primary/40 p-8 md:p-12">
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[213px] w-[347px] rounded-full opacity-40 blur-3xl"
          style={{ background: "#7b2ff7" }}
          aria-hidden
        />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-6">
              A comunidade acompanha a sua jornada
            </p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
              Aprenda. Conecte. Construa.
              <br />
              Avance.
            </h2>
            <p className="mt-3 max-w-md text-on-surface">
              Do primeiro contato com tecnologia ao próximo desafio
              profissional, você encontra apoio e espaço para crescer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-on-surface"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-[1000/460] w-full max-w-lg">
            <Image
              src="/assets/faixa-rede-visual.png"
              alt="Rede de mais de 2 mil pessoas conectadas na comunidade"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
