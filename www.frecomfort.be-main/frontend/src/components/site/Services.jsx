import { Blinds, Sun, Wind, Cog, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    id: "rolluiken",
    n: "01",
    title: "Somfy Solar Rolluiken",
    desc: "Een veilig en geborgen gevoel in huis. Solar rolluiken op maat, ingebouwd zonder hak- of breekwerk in uw gevel. Volledig draadloos en op zonne-energie.",
    icon: Blinds,
    image: "https://www.somfypro.co.uk/contentful/media/48mAlPIIm7vqCbntIxVa9D/95b1bbc6918b7547ab45116941e66d39/banner-solar-roller-shutters.jpg",
    span: "md:col-span-8 md:row-span-2",
    feature: true,
  },
  {
    id: "zonwering",
    n: "02",
    title: "Somfy Solar Screens",
    desc: "RS100 Solar io — fluisterstil, draadloos en aangedreven door de zon. Licht in huis, zonder hitte.",
    icon: Sun,
    image: "https://www.somfy.co.uk/common/img/library/818x612_cover/Shoot_External_screen_Leman_Emmanuelle_Firman_2024_HD_046_V2.jpg",
    span: "md:col-span-4",
  },
  {
    id: "airco",
    n: "03",
    title: "Airco · Daikin",
    desc: "Wij installeren Daikin warmtepompen en split-airco. Een betrouwbare partner voor koeling én verwarming in één discreet systeem.",
    icon: Wind,
    image: "https://images.pexels.com/photos/6585615/pexels-photo-6585615.jpeg?auto=compress&cs=tinysrgb&w=1600",
    span: "md:col-span-4",
  },
  {
    id: "automatisering",
    n: "04",
    title: "Automatisering · TaHoma",
    desc: "Somfy io-homecontrol & TaHoma switch. Bedien rolluiken, screens, airco en verlichting vanaf één app — scènes, schema's en stemcommando's.",
    icon: Cog,
    image: "https://www.somfypro.co.uk/contentful/media/4nlrLuoYwFbbSXMd9xeMqv/26dc7673ab449037b32d4e851e9d3834/solar-roller-shutter-B2B-connectivity.jpg",
    span: "md:col-span-8",
  },
];

export default function Services() {
  return (
    <section id="services" data-testid="services" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#FFD60A]" />
              <span className="text-overline">Wat wij installeren</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Premium <span className="text-[#FFD60A]">Somfy</span> en <span className="text-[#FFD60A]">Daikin</span> — geïnstalleerd door één team.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:pt-4">
            <p className="text-zinc-400 text-base lg:text-lg leading-relaxed">
              Premium rolluiken, screens, airco en automatisering. Elke installatie wordt verzorgd
              door onze eigen vakmensen — geen hak- of breekwerk, en programmering van TaHoma
              gebeurt ter plaatse. Eén aanspreekpunt, één team, één garantie.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                data-testid={`service-${s.id}`}
                className={`group relative bg-[#0A0B0E] hover:bg-[#14151A] transition-colors duration-300 p-8 lg:p-10 ${s.span} ${s.feature ? "min-h-[460px]" : "min-h-[300px]"} flex flex-col justify-between overflow-hidden`}
              >
                {s.image && (
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                    <img src={s.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/70 to-transparent" />
                  </div>
                )}
                <div className="relative flex items-start justify-between">
                  <span className="text-overline text-[#FFD60A]">{s.n}</span>
                  <Icon className="w-5 h-5 text-zinc-500 group-hover:text-[#FFD60A] transition-colors" strokeWidth={1.5} />
                </div>
                <div className="relative">
                  <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-zinc-400 text-sm lg:text-base leading-relaxed max-w-md">{s.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.18em] uppercase text-zinc-500 group-hover:text-white transition-colors">
                    Ontdek <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
