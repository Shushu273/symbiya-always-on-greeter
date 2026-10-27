import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Layout";
import { Pilot, Faq, Zaver } from "@/components/Shared";
import { CallFeed } from "@/components/CallFeed";
import { ArrowUpRight, ArrowRight, Phone, PhoneIncoming, AudioLines, CheckCheck, Sunrise } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, CallCurve } from "@/components/Effects";
import { obory, DEMO_GASTRO } from "@/data/obory";
import { saraPhoto, industryPhotos } from "@/data/photos";
import { Photo } from "@/components/Photo";

const title = "SYMBIYA – AI recepční nonstop pro malé podniky";
const description = "AI recepční, která vezme každý hovor a odpoví na každou zprávu. Ve dne, v noci, o víkendu. Pro barbershopy, kliniky, salony, řemeslníky, dopravu i gastro.";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: 'preload', as: 'image', href: saraPhoto.src, imageSrcSet: saraPhoto.srcSet, imageSizes: '100vw' }],
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
    <section className="home-hero sara-hero section-dark">
      <Photo photo={saraPhoto} hero className="hero-photo sara-photo" />
      <div className="photo-shade" aria-hidden="true"/>
      <div className="gold-dust" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>
      <div className="page-width hero-layout sara-layout">
        <div className="hero-copy">
          <h1>Tohle je Sára.<br/><span className="gradient-text">Vezme každý<br/>{' '}hovor.</span></h1>
          <p className="system-status sara-identity"><span className="status-dot"/>ai recepční · nonstop · česky / anglicky</p>
          <p className="hero-description">Zatímco stříháte, operujete nebo řídíte, Sára zvedá telefon, objednává a pošle potvrzení SMS. Ve dne, v noci, o víkendu.</p>
          <div className="hero-actions"><div className="sara-primary"><Button asChild><a href={`tel:${DEMO_GASTRO.tel}`}><Phone size={18}/>Zavolejte Sáře teď</a></Button><span className="mono sara-demo-label">222 760 297 · živé demo</span></div><Button asChild variant="secondary"><a href="#obory">Vyberte svůj obor<ArrowRight size={18}/></a></Button></div>
        </div><CallFeed/>
      </div>
      <div className="hero-baseline page-width" aria-hidden="true"><span><i/>nonstop</span><span>↓</span><span>symbiya</span></div>
    </section>
    <section className="section-dark problem-section"><Reveal className="page-width problem-layout"><div><h2>Kdo se nedovolá,<br/><span className="text-muted-foreground">zavolá konkurenci.</span></h2><p>Recepční to vezme za vás, zeptá se na to podstatné a zapíše to.</p></div><CallCurve/></Reveal></section>
    <section id="obory" className="section-dark section-space industry-section" aria-labelledby="obory-h"><div className="page-width"><Reveal><div className="section-heading"><h2 id="obory-h">Vyberte svůj obor<span className="text-primary">.</span></h2><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>
      <ul className="industry-list photo-industry-list">{obory.map(o => <li key={o.slug}><Link to="/$obor" params={{ obor: o.slug }} className="industry-row photo-industry-row">{industryPhotos[o.slug] && <Photo photo={industryPhotos[o.slug]} className="industry-row-photo" sizes="(max-width: 760px) 100vw, 400px"/>}<span className="industry-name">{o.nazev}{o.demo && <span className="demo-badge">živé demo</span>}</span><span className="industry-pain">{o.bolest}</span><ArrowUpRight className="industry-arrow" size={30}/></Link></li>)}</ul>
    </div></section>
    <section className="section-dark section-space" aria-labelledby="umi"><Reveal className="page-width"><div className="section-heading"><h2 id="umi">Jak to funguje<span className="text-primary">.</span></h2><span className="mono text-muted-foreground">Co umí</span></div>
      <div className="pipeline">{umi.map(([t, d], i) => { const Icon = [PhoneIncoming, AudioLines, CheckCheck, Sunrise][i] ?? AudioLines; return <div className="pipeline-node" key={t}><span className="pipeline-icon"><Icon size={25}/></span><span className="pipeline-label">{['Hovor', 'Porozumí', 'Vyřídí', 'Ranní předávka'][i]}</span><h3>{t}</h3><p>{d}</p></div>; })}</div>
      <p className="handoff-note"><span className="status-dot"/>Když něco neví, předá to člověku. Nic si nevymýšlí.</p>
    </Reveal></section><Pilot/><Faq/><Zaver/>
  </main><Footer/></>;
}
