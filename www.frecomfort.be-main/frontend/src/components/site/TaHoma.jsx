import { Smartphone } from "lucide-react";

const POINTS = [
  "Screens & rolluiken automatisch op zon, tijd of temperatuur",
  "Compatibele Daikin airco mee aansturen vanuit één app",
  "Bedienen via smartphone of stem (Google Home & Alexa)",
];

export default function TaHoma() {
  return (
    <section
      id="tahoma"
      data-testid="tahoma-section"
      className="relative py-20 lg:py-24 border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#FFD60A]" />
            <span className="text-overline">Optioneel · TaHoma Switch</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.05]">
            Maak van uw installatie een <span className="text-[#FFD60A]">smart home.</span>
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Met de TaHoma Switch van Somfy verbinden we uw screens, rolluiken en airco tot
            één systeem. Eenvoudige meerwaarde bovenop uw installatie.
          </p>
        </div>

        <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-white/5">
          <ul className="space-y-5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-4 text-zinc-200">
                <Smartphone className="w-5 h-5 text-[#FFD60A] mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            data-testid="tahoma-cta"
            className="mt-10 inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.2em] uppercase border border-white/20 hover:bg-[#FFD60A] hover:text-black hover:border-[#FFD60A] text-white px-5 py-3 transition-colors"
          >
            Vraag advies →
          </a>
        </div>
      </div>
    </section>
  );
}
