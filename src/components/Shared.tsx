import { ArrowUpRight, Phone, Plus } from 'lucide-react';
import { mailHovor } from '@/data/obory';
import { Button } from './ui/button';
import { Reveal } from './Effects';
const pilot = [
  ['Nastavení', 'Naučíme ji váš ceník a pravidla. Od vás 1–2 hodiny času.'],
  ['Číslo', 'Hovory, které nevezmete, se přesměrují na ni. Vaše číslo zůstává.'],
  ['Kontrola', 'Každý hovor jde poslechnout a přečíst.'],
  ['Měření', 'Kolik hovorů vzala a kolik skončilo objednávkou.'],
  ['Potom', 'Měsíční paušál, nebo konec bez závazku.'],
];
export function Pilot() {
  return <section className="section-dark section-space" aria-labelledby="pilot"><Reveal className="page-width pilot-layout"><div><span className="section-marker" aria-hidden="true">+</span><h2 id="pilot">Jak začít: pilot na <span className="text-primary">4 týdny</span></h2></div><dl className="glass-panel pilot-panel">{pilot.map(([t,d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl></Reveal></section>;
}
const faq = [
  ['Nepozná klient, že mluví s robotem?', 'Zavolejte si demo a posuďte sami. Na přímou otázku odpoví pravdivě, že je AI.'],
  ['Co když neví odpověď?', 'Nic si nevymýšlí. Předá vám jméno, číslo a co volající potřebuje.'],
  ['Funguje to s mým rezervačním systémem?', 'Napojení prověříme na začátku pilotu. Když nejde, posílá vám rezervace SMS ke schválení.'],
  ['Co GDPR?', 'Zpracovatelská smlouva je součástí pilotu. Data slouží jen k vyřízení dotazu.'],
  ['Kolik to stojí?', 'Řekneme na 20minutovém hovoru podle počtu hovorů. Když se to nevyplatí, řekneme to rovnou.'],
];
export function Faq() {
  return <section className="section-dark section-space" aria-labelledby="faq"><Reveal className="page-width faq-layout"><h2 id="faq">Časté otázky<span className="text-primary">.</span></h2><div className="glass-panel faq-panel">{faq.map(([q,a]) => <details key={q} className="faq-item"><summary>{q}<Plus size={20} aria-hidden="true"/></summary><div className="faq-answer"><p>{a}</p></div></details>)}</div></Reveal></section>;
}
export function Zaver({ demo }: { demo?: { cislo: string; tel: string } | undefined }) {
  return <section className="section-dark closing-section" aria-labelledby="zaver"><Reveal className="page-width"><span className="closing-signal" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></span><h2 id="zaver">Kolik hovorů jste dnes <span className="gradient-text">nevzali?</span></h2><div className="closing-actions"><Button asChild><a href={mailHovor}>Domluvit 20min hovor<ArrowUpRight size={18}/></a></Button>{demo && <Button asChild variant="secondary"><a href={`tel:${demo.tel}`}><Phone size={16}/>Zavolat demo {demo.cislo}</a></Button>}</div></Reveal></section>;
}
