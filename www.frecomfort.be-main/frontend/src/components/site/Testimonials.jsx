import { Quote } from "lucide-react";

const T = [
  {
    quote: "Zeer tevreden. Plaatsing zonder breekwerk en alles netjes afgewerkt. Je merkt direct het verschil in warmte en comfort, en alles werkt heel stil en soepel.",
    name: "Villa Berlare",
    role: "Privéwoning",
  },
];

export default function Testimonials() {
  return (
    <section id="voices" data-testid="testimonials" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-[#FFD60A]" />
          <span className="text-overline">Klanten aan het woord</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mb-16">
          Vertrouwen, in eigen woorden.
        </h2>

        <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5">
          {T.map((t, i) => (
            <figure
              key={i}
              data-testid={`testimonial-${i + 1}`}
              className="bg-[#0A0B0E] hover:bg-[#14151A] transition-colors p-10 lg:p-12 flex flex-col gap-8 min-h-[340px]"
            >
              <Quote className="w-8 h-8 text-[#FFD60A]" strokeWidth={1.5} />
              <blockquote className="text-base lg:text-lg text-zinc-200 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="pt-6 border-t border-white/5">
                <div className="font-display font-bold text-white">{t.name}</div>
                <div className="text-overline mt-1">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
