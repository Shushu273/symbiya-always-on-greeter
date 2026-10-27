import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { obory, mailUkazka, MAIL } from "@/data/obory";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight" aria-label="symbiya – úvod">
      symbiya <span className="dot-glow" aria-hidden />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", h);
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("click", h); document.removeEventListener("keydown", k); };
  }, []);
  return (
    <header className="section-dark sticky top-0 z-50 border-b border-haze/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-4">
          <div ref={ref} className="relative">
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-obory"
              onClick={() => setOpen((v) => !v)}
              className="flex min-h-11 items-center gap-1 px-2 font-medium"
            >
              Obory <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
            </button>
            {open && (
              <ul id="menu-obory" className="section-dark absolute right-0 mt-2 w-64 rounded-xl border border-haze/15 p-2">
                {obory.map((o) => (
                  <li key={o.slug}>
                    <Link to="/$obor" params={{ obor: o.slug }} onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 hover:bg-ink-2 hover:text-glow">
                      {o.nazev}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a href={mailUkazka()} className="btn btn-glow min-h-10 px-4 py-2 text-sm">Domluvit ukázku</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ demo }: { demo?: { cislo: string; tel: string } | undefined }) {
  return (
    <footer className="section-dark border-t border-haze/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2">
        <div className="space-y-2 text-haze/80">
          <Logo />
          <p>SYMBIYA s.r.o., IČO 042 25 899, Praha</p>
          {demo && <p>Demo: <a className="underline hover:text-glow" href={`tel:${demo.tel}`}>{demo.cislo}</a></p>}
          <p><a className="underline hover:text-glow" href={`mailto:${MAIL}`}>{MAIL}</a></p>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-haze/80">
          {obory.map((o) => (
            <li key={o.slug}><Link to="/$obor" params={{ obor: o.slug }} className="hover:text-glow">{o.nazev}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
