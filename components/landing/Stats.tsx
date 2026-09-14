const STATS = [
  { value: "+15 mil", label: "Membros conectados", gradient: "from-[#38b6ff] via-[#b44cff] to-accent" },
  { value: "+1.250", label: "Vagas divulgadas", gradient: "from-accent to-accent-2" },
  { value: "+320", label: "Eventos realizados", gradient: "from-[#38b6ff] via-[#b44cff] to-accent" },
  { value: "+180", label: "Empresas parceiras", gradient: "from-accent to-accent-2" },
];

export default function Stats() {
  return (
    <section className="px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-accent-2 bg-accent-3 px-4 py-3"
          >
            <p className={`bg-gradient-to-r bg-clip-text text-2xl font-extrabold text-transparent ${stat.gradient}`}>
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs text-on-surface">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
