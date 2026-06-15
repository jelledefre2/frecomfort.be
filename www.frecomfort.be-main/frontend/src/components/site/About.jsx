import { Award, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <section id="about" data-testid="about" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#FFD60A]" />
            <span className="text-overline">Over ons</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Meesterlijk vakmanschap, <span className="text-[#FFD60A]">stille techniek.</span>
          </h2>
          <p className="mt-8 text-zinc-300 text-base lg:text-lg leading-relaxed max-w-2xl">
            Wij installeren premium solar screens en rolluiken bij particulieren in België.
            Specialist in de <span className="text-white font-medium">Somfy RS100 Solar io</span> —
            fluisterstil, draadloos en aangedreven door zonne-energie.
          </p>
          <p className="mt-6 text-zinc-400 leading-relaxed max-w-2xl">
            Van eerste advies tot programmering van uw TaHoma switch:
            <span className="text-white"> één aanspreekpunt, één team, één garantie.</span>
          </p>

          <a
            href="#contact"
            data-testid="about-cta"
            className="mt-10 inline-flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black text-white px-6 py-4 font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors"
          >
            Plan een adviesgesprek →
          </a>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-white/5 bg-[#14151A] p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <Award className="w-5 h-5 text-[#FFD60A]" strokeWidth={1.5} />
              <span className="text-overline text-[#FFD60A]">Kwaliteit</span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-white">
              De garanties van een Frans merk.
            </h3>
            <p className="mt-5 text-zinc-400 leading-relaxed">
              Onze producten zijn ontworpen in Frankrijk om u optimale kwaliteit, prestaties en
              een lange levensduur te garanderen.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px bg-white/5">
              <Stat k="7 jaar" v="Somfy garantie" />
              <Stat k="Made in" v="France" />
              <Stat k="Solar io" v="draadloos" />
              <Stat k="TaHoma" v="ready" />
            </div>

            <div className="mt-6 flex items-center gap-3 text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-[#FFD60A]" />
              <span className="font-mono-tech text-xs tracking-[0.15em] uppercase">
                Erkend Somfy specialist
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stat({ k, v }) {
  return (
    <div className="bg-[#14151A] p-4">
      <div className="font-display text-xl font-extrabold text-white tracking-tight">{k}</div>
      <div className="text-overline mt-1">{v}</div>
    </div>
  );
}
