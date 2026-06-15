import { useState } from "react";

const PROJECTS = [
  { id: 1, title: "Solar Rolluiken — nieuwbouwwoning", loc: "Berlare", cat: "Rolluiken", img: "https://www.somfypro.co.uk/contentful/media/48mAlPIIm7vqCbntIxVa9D/95b1bbc6918b7547ab45116941e66d39/banner-solar-roller-shutters.jpg" },
  { id: 2, title: "Daikin Perfera vloermodel FVXM-A", loc: "Antwerpen", cat: "Airco", img: "https://customer-assets.emergentagent.com/job_pro-services-202/artifacts/ycwe6eon_Schermafbeelding-2022-12-19-om-10.19.45.png" },
  { id: 3, title: "TaHoma — slimme app bediening Screens/rolluiken", loc: "Gent", cat: "Automatisering", img: "https://www.somfypro.co.uk/contentful/media/4nlrLuoYwFbbSXMd9xeMqv/26dc7673ab449037b32d4e851e9d3834/solar-roller-shutter-B2B-connectivity.jpg" },
  { id: 4, title: "Solar Screens — pannenraam achtergevel", loc: "Berlare", cat: "Screens", img: "https://www.somfy.co.uk/common/img/library/818x612_cover/Shoot_External_screen_Leman_Emmanuelle_Firman_2024_HD_046_V2.jpg" },
  { id: 5, title: "Solar Rolluiken — slaapkamerverduistering", loc: "Brugge", cat: "Rolluiken", img: "https://www.somfypro.co.uk/contentful/media/5KTpcSABmuiN5O9SlZPy3S/a7716a8ef3e3195a01e725e157566af0/Installation-volet-solaire-B2B-2.jpg" },
  { id: 6, title: "Solar Screens — villa renovatie in veranda", loc: "Sint-Martens-Latem", cat: "Screens", img: "https://www.somfy.co.uk/common/img/library/818x612_cover/Shoot_Savigny_2022_Vanessa_Andrieux_HD_370.jpg" },
  { id: 7, title: "Daikin Multi-split in living", loc: "Berlare", cat: "Airco", img: "https://customer-assets.emergentagent.com/job_pro-services-202/artifacts/4ypj286s_66c707fd-f5fe-4f6c-96d0-1e418768a8bb.jpg" },
];

const CATS = ["Alles", "Rolluiken", "Screens", "Airco", "Automatisering"];

export default function Gallery() {
  const [active, setActive] = useState("Alles");
  const filtered = active === "Alles" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);

  return (
    <section id="work" data-testid="gallery" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#FFD60A]" />
              <span className="text-overline">Inspiratie</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Realisaties die spreken voor zich.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                data-testid={`gallery-filter-${c.toLowerCase()}`}
                onClick={() => setActive(c)}
                className={`font-mono-tech text-xs tracking-[0.18em] uppercase px-4 py-2.5 border transition-colors ${
                  active === c
                    ? "bg-[#FFD60A] text-black border-[#FFD60A]"
                    : "border-white/15 text-zinc-400 hover:border-white/50 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {filtered.map((p) => (
            <article
              key={p.id}
              data-testid={`project-${p.id}`}
              className="group relative bg-[#0A0B0E] overflow-hidden aspect-[4/5]"
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                <span className="text-overline text-[#FFD60A] self-start bg-black/40 backdrop-blur px-2 py-1">
                  {p.cat}
                </span>
                <div>
                  <div className="font-mono-tech text-xs tracking-[0.18em] uppercase text-zinc-400">
                    {p.loc}
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold tracking-tight text-white mt-2">
                    {p.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
