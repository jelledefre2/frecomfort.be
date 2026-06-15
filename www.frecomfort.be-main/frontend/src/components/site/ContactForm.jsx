import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const SERVICES = [
  { v: "rolluiken", label: "Somfy Solar Rolluiken" },
  { v: "zonwering", label: "Somfy Solar Screens" },
  { v: "airco", label: "Airco (Daikin)" },
  { v: "automatisering", label: "Automatisering / TaHoma" },
  { v: "other", label: "Iets anders" },
];

const initial = {
  name: "",
  email: "",
  phone: "",
  service_type: "rolluiken",
  address: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/leads", form);
      toast.success("Aanvraag ontvangen. We nemen binnen 24 uur contact met u op.");
      setDone(true);
      setForm(initial);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string"
          ? detail
          : "Verzenden is niet gelukt. Controleer de gegevens en probeer opnieuw."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#FFD60A]" />
            <span className="text-overline">Contact</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Vraag uw gratis offerte aan.
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Vul het formulier in en wij nemen binnen 24 uur contact met u op voor een vrijblijvend
            adviesgesprek.
          </p>

          <div className="mt-10 space-y-6 border-t border-white/5 pt-10">
            <div>
              <div className="text-overline">Bel</div>
              <a href="tel:+32478917705" data-testid="contact-phone" className="block mt-2 font-display text-2xl font-bold text-white hover:text-[#FFD60A] transition-colors">
                +32 (0)478 91 77 05
              </a>
            </div>
            <div>
              <div className="text-overline">Mail</div>
              <a href="mailto:info@frecomfort.be" data-testid="contact-email" className="block mt-2 font-display text-xl text-white hover:text-[#FFD60A] transition-colors">
                info@frecomfort.be
              </a>
            </div>
            <div>
              <div className="text-overline">Werkgebied</div>
              <div className="mt-2 text-zinc-300">Over geheel België</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {done ? (
            <div data-testid="contact-success" className="border border-[#FFD60A]/40 bg-[#FFD60A]/5 p-10 lg:p-14">
              <div className="text-overline text-[#FFD60A]">Aanvraag ontvangen</div>
              <h3 className="mt-4 font-display text-3xl font-bold text-white">
                Bedankt — we nemen het over.
              </h3>
              <p className="mt-4 text-zinc-300 leading-relaxed">
                Een specialist neemt binnen 24 uur contact met u op. Liever direct?
                <a href="tel:+32478917705" className="text-[#FFD60A] hover:underline"> +32 (0)478 91 77 05</a>.
              </p>
              <button
                onClick={() => setDone(false)}
                data-testid="contact-submit-another"
                className="mt-8 font-mono-tech text-xs tracking-[0.2em] uppercase border border-white/20 hover:bg-white hover:text-black text-white px-5 py-3 transition-colors"
              >
                Nieuwe aanvraag
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} data-testid="contact-form" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Naam" htmlFor="name">
                  <input
                    id="name"
                    data-testid="input-name"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Jan Janssens"
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#FFD60A] outline-none py-3 text-white placeholder:text-zinc-600 transition-colors"
                  />
                </Field>
                <Field label="E-mail" htmlFor="email">
                  <input
                    id="email"
                    data-testid="input-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="naam@domein.be"
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#FFD60A] outline-none py-3 text-white placeholder:text-zinc-600 transition-colors"
                  />
                </Field>
                <Field label="Telefoon" htmlFor="phone">
                  <input
                    id="phone"
                    data-testid="input-phone"
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+32 478 91 77 05"
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#FFD60A] outline-none py-3 text-white placeholder:text-zinc-600 transition-colors"
                  />
                </Field>
                <Field label="Dienst" htmlFor="service_type">
                  <select
                    id="service_type"
                    data-testid="input-service-type"
                    value={form.service_type}
                    onChange={set("service_type")}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#FFD60A] outline-none py-3 text-white transition-colors appearance-none cursor-pointer"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.v} value={s.v} className="bg-[#0A0B0E]">
                        {s.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Adres (optioneel)" htmlFor="address">
                <input
                  id="address"
                  data-testid="input-address"
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Straat 1, 1000 Brussel"
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#FFD60A] outline-none py-3 text-white placeholder:text-zinc-600 transition-colors"
                />
              </Field>

              <Field label="Bericht" htmlFor="message">
                <textarea
                  id="message"
                  data-testid="input-message"
                  required
                  minLength={5}
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Vertel ons over uw woning, type woning, aantal ramen, gewenste opleverdatum…"
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#FFD60A] outline-none py-3 text-white placeholder:text-zinc-600 transition-colors resize-none"
                />
              </Field>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit"
                  className="group inline-flex items-center gap-3 bg-[#FFD60A] hover:bg-[#FFC300] disabled:opacity-60 text-black px-7 py-4 font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Versturen
                    </>
                  ) : (
                    <>
                      Verstuur aanvraag
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
                <p className="mt-4 text-xs text-zinc-500 font-mono-tech tracking-wider">
                  Door te verzenden gaat u akkoord met contact over uw project. Geen spam.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-overline block mb-2">{label}</span>
      {children}
    </label>
  );
}
