import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Layout";
import { Pilot, Faq, Zaver } from "@/components/Shared";
import { CallFeed } from "@/components/CallFeed";
import { ArrowUpRight, ArrowRight, PhoneIncoming, AudioLines, CheckCheck, Sunrise } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, CallCurve } from "@/components/Effects";
import { obory, mailUkazka } from "@/data/obory";

const title = "SYMBIYA – AI recepční nonstop pro malé podniky";
const description = "AI recepční, která vezme každý hovor a odpoví na každou zprávu. Ve dne, v noci, o víkendu. Pro barbershopy, kliniky, salony, řemeslníky, dopravu i gastro.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const umi = [
  ["Bere hovory 24/7", "Ve dne, v noci, o víkendu i o svátcích."],
  ["Objednává do volných termínů", "Podle vašeho diáře a pravidel."],
  ["Odpovídá na dotazy", "Ceny, otevírací doba, parkování."],
  ["Ráno pošle předávku", "Co je vyřízené a co čeká na vás."],
];

function Index() {
  return <><Header /><main>
    <section className="home-hero section-dark">
      <div className="page-width hero-layout">
        <div className="hero-copy">
          <p className="system-status"><span className="status-dot"/>živě · 24/7 · česky / anglicky</p>
          <h1>Vaše recepce.<br/><span className="gradient-text">Nonstop.</span></h1>
          <p className="hero-description">AI recepční, která vezme každý hovor a odpoví na každou zprávu. I když stříháte, operujete, jste na stavbě nebo za volantem. Ve dne, v noci, o víkendu.</p>
          <div className="hero-actions"><Button asChild><a href="#obory">Vyberte svůj obor<ArrowRight size={18}/></a></Button><Button asChild variant="secondary"><a href={mailUkazka()}>Domluvit ukázku<ArrowUpRight size={18}/></a></Button></div>
        </div><CallFeed/>
      </div>
      <div className="hero-baseline page-width" aria-hidden="true"><span><i/>nonstop</span><span>↓</span><span>symbiya</span></div>
    </section>
    <section className="section-dark problem-section"><Reveal className="page-width problem-layout"><div><h2>Kdo se nedovolá,<br/><span className="text-muted-foreground">zavolá konkurenci.</span></h2><p>Recepční to vezme za vás, zeptá se na to podstatné a zapíše to.</p></div><CallCurve/></Reveal></section>
    <section id="obory" className="section-dark section-space industry-section" aria-labelledby="obory-h"><div className="page-width"><Reveal><div className="section-heading"><h2 id="obory-h">Vyberte svůj obor<span className="text-primary">.</span></h2><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>
      <ul className="industry-list">{obory.map(o => <li key={o.slug}><Link to="/$obor" params={{ obor: o.slug }} className="industry-row"><span className="industry-name">{o.nazev}{o.demo && <span className="demo-badge">živé demo</span>}</span><span className="industry-pain">{o.bolest}</span><ArrowUpRight className="industry-arrow" size={30}/><span className="row-wave" aria-hidden="true"/></Link></li>)}</ul>
    </div></section>
    <section className="section-dark section-space" aria-labelledby="umi"><Reveal className="page-width"><div className="section-heading"><h2 id="umi">Jak to funguje<span className="text-primary">.</span></h2><span className="mono text-muted-foreground">Co umí</span></div>
      <div className="pipeline">{umi.map(([t, d], i) => { const Icon = [PhoneIncoming, AudioLines, CheckCheck, Sunrise][i] ?? AudioLines; return <div className="pipeline-node" key={t}><span className="pipeline-icon"><Icon size={25}/></span><span className="pipeline-label">{['Hovor', 'Porozumí', 'Vyřídí', 'Ranní předávka'][i]}</span><h3>{t}</h3><p>{d}</p></div>; })}</div>
      <p className="handoff-note"><span className="status-dot"/>Když něco neví, předá to člověku. Nic si nevymýšlí.</p>
    </Reveal></section><Pilot/><Faq/><Zaver/>
  </main><Footer/></>;
}
