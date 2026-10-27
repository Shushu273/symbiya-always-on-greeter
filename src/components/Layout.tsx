import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { obory, mailUkazka, MAIL, type Demo } from '@/data/obory';
import { Button } from './ui/button';
import { CursorGlow } from './Effects';
export function Logo() {
  return <Link to="/" className="logo" aria-label="symbiya – úvod"><span className="logo-symbol" aria-hidden="true"><i/><i/><i/><i/><i/></span>symbiya<span className="logo-period">.</span></Link>;
}
export function Header({ demo }: { demo?: Demo | undefined }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', h); document.addEventListener('keydown', k);
    return () => { document.removeEventListener('click', h); document.removeEventListener('keydown', k); };
  }, []);
  return <><CursorGlow/><header className="site-header"><div className="header-inner"><Logo/><nav aria-label="Hlavní navigace">
    {demo && <a className="header-demo" href={`tel:${demo.tel}`}><span className="status-dot"/>{demo.cislo}</a>}
    <div ref={ref} className="relative"><Button variant="ghost" aria-expanded={open} aria-controls="menu-obory" onClick={() => setOpen(v => !v)}>Obory<ChevronDown size={14} className={open ? 'rotate-180' : ''}/></Button>
    {open && <ul id="menu-obory" className="industry-menu glass-panel">{obory.map(o => <li key={o.slug}><Link to="/$obor" params={{ obor: o.slug }} onClick={() => setOpen(false)}>{o.nazev}<ArrowUpRight size={15}/></Link></li>)}</ul>}</div>
    <Button asChild className="header-cta"><a href={mailUkazka()}>Domluvit ukázku<ArrowUpRight size={15}/></a></Button>
  </nav></div></header></>;
}
export function Footer({ demo }: { demo?: { cislo: string; tel: string } | undefined }) {
  return <footer className="site-footer"><div className="page-width footer-top"><div><Logo/><p>SYMBIYA s.r.o., IČO 042 25 899, Praha</p>{demo && <p>Demo: <a href={`tel:${demo.tel}`}>{demo.cislo}</a></p>}<p><a href={`mailto:${MAIL}`}>{MAIL}</a></p></div><ul>{obory.map(o => <li key={o.slug}><Link to="/$obor" params={{ obor: o.slug }}>{o.nazev}<ArrowUpRight size={13}/></Link></li>)}</ul></div></footer>;
}
