import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-12 md:py-16">
      <div className="absolute inset-x-0 bottom-0 -z-20 aspect-[1663/633] w-full min-h-[380px]">
        <Image
          src="/assets/hero-bg.png"
          alt="Mascote Galera do TI na cidade"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 -z-10 aspect-[1663/633] w-full min-h-[380px] bg-gradient-to-r from-bg via-bg/80 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto aspect-[1663/633] w-full max-w-6xl min-h-[380px]">
        <div className="absolute inset-0 flex max-w-xl flex-col justify-center">
          <h1 className="text-2xl font-extrabold leading-[1.146] tracking-[0.01em] md:text-[32px]">
            CONECTANDO
            <br />
            <span className="text-gradient">MENTES.</span> CRIANDO
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              OPORTUNIDADES.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-on-surface">
            A maior comunidade de tecnologia para aprender, compartilhar e
            crescer juntos!
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#" variant="gradient" className="shadow-lg shadow-accent/20">
              Entrar na comunidade
            </Button>
            <Button href="#" variant="outline">
              Área do recrutador
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
