import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_pro-services-202/artifacts/yjp8gm24_LOGO_FRE_BV_web%20PNG%20GOOGLE%20LOGO.png";

const NAV = [
  { label: "Diensten", href: "#services" },
  { label: "Over ons", href: "#about" },
  { label: "Werkwijze", href: "#process" },
  { label: "Werk", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" data-testid="logo-link" className="flex items-center gap-3 group">
          <img src={LOGO_URL} alt="FRE BV" className="h-9 w-9 object-contain" />
          <span className="font-display font-extrabold tracking-tight text-white text-lg">
            FRE BV
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className="font-mono-tech text-xs tracking-[0.18em] uppercase text-zinc-400 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+32478917705"
            data-testid="header-phone"
            className="hidden lg:block font-mono-tech text-xs tracking-[0.18em] uppercase text-zinc-400 hover:text-white transition-colors"
          >
            +32 (0)478 91 77 05
          </a>
          <a
            href="#contact"
            data-testid="header-cta"
            className="hidden md:inline-flex items-center gap-2 bg-[#FFD60A] hover:bg-[#FFC300] text-black font-mono-tech text-xs tracking-[0.18em] uppercase px-4 py-2.5 transition-colors"
          >
            Offerte
          </a>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="font-mono-tech text-sm tracking-[0.18em] uppercase text-zinc-300 hover:text-[#FFD60A]"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              data-testid="mobile-cta"
              className="mt-2 inline-flex items-center justify-center bg-[#FFD60A] text-black font-mono-tech text-xs tracking-[0.18em] uppercase px-4 py-3"
            >
              Offerte
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
