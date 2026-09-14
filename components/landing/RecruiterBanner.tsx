import Button from "@/components/ui/Button";

export default function RecruiterBanner() {
  return (
    <section className="px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-2xl border border-primary bg-gradient-to-br from-[#101025] via-[#15102a] to-[#250d2d] p-7 text-center md:flex-row md:text-left">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent-6">
            Para empresas e recrutadores
          </p>
          <h2 className="mt-1.5 text-base font-bold">
            Encontre talentos que já fazem parte da comunidade.
          </h2>
          <p className="mt-1 text-sm text-on-surface">
            Divulgue oportunidades e conecte-se com profissionais de tecnologia de diferentes perfis.
          </p>
        </div>
        <Button href="#" variant="gradient-pill">
          Banco de talentos →
        </Button>
      </div>
    </section>
  );
}
