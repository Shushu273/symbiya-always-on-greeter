import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Layout";
import { Faq, Zaver } from "@/components/Shared";
import { CallFeed } from "@/components/CallFeed";
import { ArrowUpRight, ArrowRight, Check, Phone, PhoneIncoming, AudioLines, CheckCheck, Sunrise } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Effects";
import { obory, DEMO_GASTRO } from "@/data/obory";
import { saraPhoto, industryPhotos } from "@/data/photos";
import { Photo } from "@/components/Photo";
import { AbilityGrid } from "@/components/AbilityGrid";
import { PainRows } from "@/components/PainRows";
import { CoreHub } from "@/components/CoreHub";
import { Calculator } from "@/components/Calculator";
import { Offer } from "@/components/Offer";
import { AudioDemo } from "@/components/AudioDemo";

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
      <div className="sara-visual">
        <Photo photo={saraPhoto} hero className="hero-photo sara-photo" />
        <div className="photo-shade" aria-hidden="true"/>
        <div className="gold-dust" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>
      </div>
      <div className="page-width hero-layout sara-layout">
        <div className="hero-copy">
          <p className="system-status sara-identity"><span className="status-dot"/>ai recepční · nonstop · česky / anglicky</p>
          <h1>Tohle je Sára.<br/><span className="gradient-text">Vezme každý<br/>{' '}hovor.</span></h1>
          <p className="hero-description">Každý nepřijatý hovor je zakázka u konkurence. Zatímco stříháte, operujete nebo řídíte, Sára zvedá telefon, objednává a pošle potvrzení SMS. Ve dne, v noci, o víkendu.</p>
          <p className="hero-products mono"><a href="#nabidka">sára</a><span aria-hidden="true"> · </span><a href="#nabidka">sára pro</a></p>
          <a href="#nabidka" className="offer-tag">posledních 10 míst · implementace −50 %<ArrowRight size={11}/></a>
          <div className="hero-actions"><div className="sara-primary"><Button asChild><a href={`tel:${DEMO_GASTRO.tel}`}><Phone size={18}/>Zavolejte Sáře teď</a></Button><span className="mono sara-demo-label">222 760 297 · zvedne ihned · živé demo, nic nekupujete</span></div><AudioDemo/></div>
        </div><CallFeed/>
      </div>
      <div className="hero-cal-shade" aria-hidden="true"/>
      <div className="hero-cal-cover" aria-hidden="true">
        <p><Check size={13}/>termín uložen do kalendáře · st 14:00</p>
        <p><Check size={13}/>sms potvrzení odesláno</p>
        <span className="hero-cal-live"><span className="status-dot"/>live</span>
      </div>
      <div className="hero-baseline hero-trust page-width" aria-hidden="true"><span>napojení: google kalendář · apple kalendář · reservio · raynet</span><span>zvedne ihned · přirozená čeština · gdpr ready</span></div>
    </section>
    <PainRows/>
    <section className="section-dark section-space ability-section" aria-labelledby="sara-umi"><div className="page-width"><Reveal><div className="section-heading ability-heading"><div><h2 id="sara-umi">Víc než zvedání telefonu<span className="text-primary">.</span></h2><p className="ability-sub">Sára hovor nejen vezme, ale dotáhne do konce – a druhý den vám řekne, co se dělo.</p></div><span className="section-marker" aria-hidden="true">↘</span></div></Reveal><AbilityGrid/><p className="ability-note">Napojení na kalendář a WhatsApp nastavíme při nasazení podle toho, co už používáte.</p></div></section>
    <CoreHub/>
    <Calculator/>
    <section id="obory" className="section-dark section-space industry-section" aria-labelledby="obory-h"><div className="page-width"><Reveal><div className="section-heading"><h2 id="obory-h">Vyberte svůj obor<span className="text-primary">.</span></h2><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>
      <ul className="industry-list photo-industry-list">{obory.map(o => <li key={o.slug}><Link to="/$obor" params={{ obor: o.slug }} className="industry-row photo-industry-row">{industryPhotos[o.slug] && <Photo photo={industryPhotos[o.slug]} className="industry-row-photo" sizes="(max-width: 760px) 100vw, 400px"/>}<span className="industry-name">{o.nazev}{o.demo && <span className="demo-badge">živé demo</span>}</span><span className="industry-pain">{o.bolest}</span><ArrowUpRight className="industry-arrow" size={30}/></Link></li>)}</ul>
    </div></section>
    <section id="jak-to-funguje" className="section-dark section-space" aria-labelledby="umi"><Reveal className="page-width"><div className="section-heading"><h2 id="umi">Jak to funguje<span className="text-primary">.</span></h2><span className="mono text-muted-foreground">Co umí</span></div>
      <div className="pipeline">{umi.map(([t, d], i) => { const Icon = [PhoneIncoming, AudioLines, CheckCheck, Sunrise][i] ?? AudioLines; return <div className="pipeline-node" key={t}><span className="pipeline-icon"><Icon size={25}/></span><span className="pipeline-label">{['Hovor', 'Porozumí', 'Vyřídí', 'Ranní předávka'][i]}</span><h3>{t}</h3><p>{d}</p></div>; })}</div>
      <p className="handoff-note"><span className="status-dot"/>Když něco neví, předá to člověku. Nic si nevymýšlí.</p>
    </Reveal></section><Offer/><Faq/><Zaver/>
  </main><Footer/></>;
}
