import { ArrowUpRight, Phone, Plus } from 'lucide-react';
import { mailPilot } from '@/data/offer';
import { Button } from './ui/button';
import { Reveal } from './Effects';
const faq = [
  ['Nepozná klient, že mluví s robotem?', 'Zavolejte si demo a posuďte sami. Na přímou otázku odpoví pravdivě, že je AI.'],
  ['Jaký je rozdíl mezi Sárou a Sárou PRO?', 'Sára pracuje samostatně. U Sáry PRO ji navíc nonstop hlídají a zdokonalují lidé z SYMBIYA.'],
  ['Co když Sára něco neví?', 'Nic si nevymýšlí. Předá vám to s krátkým shrnutím – kdo volal, co potřebuje a kam zavolat zpět.'],
  ['Zůstane mi moje číslo?', 'Ano. Přesměrujete jen hovory, které nezvednete. Vaše číslo zůstává vaše.'],
  ['Jak dlouho trvá spuštění?', 'Nastavíme ji během čtyřtýdenního pilotu. Od vás stačí 1–2 hodiny času.'],
  ['Funguje to s mým rezervačním systémem?', 'Napojení prověříme na začátku pilotu. Když nejde, posílá vám rezervace SMS ke schválení.'],
  ['Co GDPR?', 'Zpracovatelská smlouva je součástí pilotu. Data slouží jen k vyřízení dotazu.'],
  ['Kolik to stojí?', 'Sára stojí 4 990 Kč měsíčně bez DPH, v zaváděcí nabídce 2 495 Kč. Sára PRO od 14 990 Kč měsíčně.'],
];
export function Faq() {
  return <section className="section-dark section-space" aria-labelledby="faq"><Reveal className="page-width faq-layout"><h2 id="faq">Časté otázky<span className="text-primary">.</span></h2><div className="glass-panel faq-panel">{faq.map(([q,a]) => <details key={q} className="faq-item"><summary>{q}<Plus size={20} aria-hidden="true"/></summary><div className="faq-answer"><p>{a}</p></div></details>)}</div></Reveal></section>;
}
export function Zaver({ demo }: { demo?: { cislo: string; tel: string } | undefined }) {
  return <section className="section-dark closing-section" aria-labelledby="zaver"><Reveal className="page-width"><span className="closing-signal" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></span><h2 id="zaver">Kolik hovorů jste dnes <span className="gradient-text">nevzali?</span></h2><div className="closing-actions"><Button asChild><a href={mailPilot}>Rezervovat místo za polovinu<ArrowUpRight size={18}/></a></Button>{demo && <Button asChild variant="secondary"><a href={`tel:${demo.tel}`}><Phone size={16}/>Zavolat demo {demo.cislo}</a></Button>}</div></Reveal></section>;
}
