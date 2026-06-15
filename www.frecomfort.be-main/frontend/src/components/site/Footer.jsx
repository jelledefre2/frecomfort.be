import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_pro-services-202/artifacts/yjp8gm24_LOGO_FRE_BV_web%20PNG%20GOOGLE%20LOGO.png";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative border-t border-white/5 bg-[#0A0B0E]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3">
              <img src={LOGO_URL} alt="FRE BV" className="h-10 w-10 object-contain" />
              <span className="font-display font-extrabold tracking-tight text-white text-lg">
                FRE BV
              </span>
            </Link>
            <p className="mt-6 text-zinc-400 max-w-md leading-relaxed">
              Erkend Somfy RS100 Solar io specialist. Premium zonwering, rolluiken en
              automatisering — fluisterstil, draadloos en op zonne-energie. Daarnaast ruime
              ervaring met de installatie van airco systemen. Werkzaam over geheel België
              sinds 2021.
            </p>
            <div className="mt-8 flex gap-3">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`social-${i}`}
                  className="w-10 h-10 grid place-items-center border border-white/10 hover:border-[#FFD60A] hover:text-[#FFD60A] text-zinc-400 transition-colors"
                  aria-label="social"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-overline mb-5">Diensten</div>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#services" className="hover:text-white">Somfy Solar Rolluiken</a></li>
              <li><a href="#services" className="hover:text-white">Somfy Solar Screens</a></li>
              <li><a href="#services" className="hover:text-white">Airco (Daikin)</a></li>
              <li><a href="#services" className="hover:text-white">Automatisering · TaHoma</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-overline mb-5">Bedrijf</div>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#about" className="hover:text-white">Over ons</a></li>
              <li><a href="#process" className="hover:text-white">Werkwijze</a></li>
              <li><a href="#work" className="hover:text-white">Realisaties</a></li>
              <li><Link to="/admin" data-testid="footer-admin-link" className="hover:text-white">Admin</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-overline mb-5">Contact</div>
            <a href="tel:+32478917705" className="block font-display text-2xl font-bold text-white hover:text-[#FFD60A] transition-colors">
              +32 (0)478 91 77 05
            </a>
            <a href="mailto:info@frecomfort.be" className="mt-2 block text-zinc-300 hover:text-white text-sm">
              info@frecomfort.be
            </a>
            <div className="mt-4 text-xs text-zinc-500 font-mono-tech tracking-wider">
              MA–ZA · 8:00–18:00<br />
              ZONDAG GESLOTEN
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs font-mono-tech tracking-wider text-zinc-500">
          <div>© {new Date().getFullYear()} FRE BV · ALLE RECHTEN VOORBEHOUDEN</div>
          <div>ERKEND SOMFY RS100 SOLAR IO SPECIALIST · WERKZAAM IN BELGIË</div>
        </div>
      </div>
    </footer>
  );
}
