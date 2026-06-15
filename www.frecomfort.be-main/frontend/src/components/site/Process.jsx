const STEPS = [
  {
    n: "01",
    title: "Advies & inmeting",
    desc: "Een specialist bezoekt u thuis voor technisch advies, kleurkeuze en exacte opmeting.",
  },
  {
    n: "02",
    title: "Maatwerk offerte",
    desc: "Transparante prijs met montagedetails, productspecificaties en doorlooptijd.",
  },
  {
    n: "03",
    title: "Vakkundige montage",
    desc: "Installatie zonder hak- of breekwerk in uw gevel. Eigen team, geen onderaanneming.",
  },
  {
    n: "04",
    title: "Service & garantie",
    desc: "Programmering van TaHoma, persoonlijke uitleg en 7 jaar Somfy garantie.",
  },
];

export default function Process() {
  return (
    <section id="process" data-testid="process" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-[#FFD60A]" />
          <span className="text-overline">Werkwijze</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl">
          Van advies tot eerste zonnestraal.
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-testid={`process-step-${i + 1}`}
              className="bg-[#0A0B0E] p-8 lg:p-10 min-h-[260px] flex flex-col justify-between hover:bg-[#14151A] transition-colors"
            >
              <div className="font-display text-5xl lg:text-6xl font-extrabold text-[#FFD60A] leading-none">
                {s.n}
              </div>
              <div>
                <h3 className="font-display text-lg lg:text-xl font-bold tracking-tight text-white mt-8">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
