import { ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      data-testid="hero"
      className="relative pt-32 pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://customer-assets.emergentagent.com/job_pro-services-202/artifacts/5o5qfjur_6017e832-3508-4284-a5e6-765133c8b777.jpg"
          alt=""
          className="w-full h-full object-cover opacity-55 blur-[2px] scale-105"
        />
        {/* Subtle face-level blur lenses (privacy) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute rounded-full"
            style={{
              left: "11%",
              top: "26%",
              width: "9rem",
              height: "9rem",
              backdropFilter: "blur(9px)",
              WebkitBackdropFilter: "blur(9px)",
              maskImage: "radial-gradient(circle, #000 55%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 80%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              left: "21%",
              top: "28%",
              width: "10rem",
              height: "10rem",
              backdropFilter: "blur(9px)",
              WebkitBackdropFilter: "blur(9px)",
              maskImage: "radial-gradient(circle, #000 55%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 80%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              left: "42%",
              top: "15%",
              width: "11rem",
              height: "11rem",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              maskImage: "radial-gradient(circle, #000 55%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 80%)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B0E] via-[#0A0B0E]/50 to-[#0A0B0E]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-[#FFD60A]" />
              <span className="text-overline">Erkend Somfy RS100 Solar io specialist</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase leading-[0.95] text-white">
              Je thuis
              <br />
              in <span className="text-[#FFD60A]">topvorm.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base lg:text-lg text-zinc-400 leading-relaxed">
              Dankzij ons meesterlijk vakmanschap als elektricien en specialist in
              automatisering sinds 2021. Premium zonwering, rolluiken en Somfy TaHoma-installaties
              — fluisterstil, draadloos en op zonne-energie.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                data-testid="hero-cta-quote"
                className="group inline-flex items-center gap-3 bg-[#FFD60A] hover:bg-[#FFC300] text-black px-6 py-4 font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Vraag gratis offerte
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#work"
                data-testid="hero-cta-work"
                className="inline-flex items-center gap-3 border border-white/20 hover:bg-white hover:text-black text-white px-6 py-4 font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Bekijk realisaties
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pb-4">
            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
              {[
                { k: "5+", v: "jaar ervaring" },
                { k: "50+", v: "installaties" },
                { k: "7 jaar", v: "Somfy garantie" },
                { k: "100%", v: "maatwerk" },
              ].map((s) => (
                <div
                  key={s.v}
                  data-testid={`hero-stat-${s.v.toLowerCase().replace(/\s/g, "-")}`}
                  className="bg-[#0A0B0E] p-6"
                >
                  <div className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                    {s.k}
                  </div>
                  <div className="text-overline mt-2">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-[#FFD60A]" />
              <span className="font-mono-tech text-xs tracking-[0.15em] uppercase">
                Werkzaam over geheel België
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-20 border-y border-white/5 py-6 overflow-hidden">
        <div className="flex marquee whitespace-nowrap gap-16">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 pr-16">
              {[
                "SOMFY SOLAR ROLLUIKEN",
                "SOMFY RS100 SOLAR IO",
                "DAIKIN AIRCO SYSTEMEN",
                "TAHOMA AUTOMATISERING",
                "SCREENS OP MAAT",
                "DRAADLOOS · STIL · ZONNE-ENERGIE",
              ].map((t) => (
                <span key={`${i}-${t}`} className="font-display text-xl font-extrabold tracking-tight uppercase text-white/40 flex items-center gap-16">
                  {t}
                  <span className="w-1.5 h-1.5 bg-[#FFD60A]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
