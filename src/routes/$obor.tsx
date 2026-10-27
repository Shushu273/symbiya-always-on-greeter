import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Layout";
import { Pilot, Faq, Zaver } from "@/components/Shared";
import { ArrowUpRight, Phone, ArrowRight } from "lucide-react";
import { Photo } from "@/components/Photo";
import { industryPhotos } from "@/data/photos";
import { LiveChat } from "@/components/LiveChat";
import { Reveal } from "@/components/Effects";
import { Button } from "@/components/ui/button";
import { najdiObor, mailUkazka } from "@/data/obory";

export const Route = createFileRoute("/$obor")({
  loader: ({ params }) => {
    const o = najdiObor(params.obor);
    if (!o) throw notFound();
    return o;
  },
  head: ({ loaderData: o }) => ({
    links: o && industryPhotos[o.slug] ? [{ rel: 'preload', as: 'image', href: industryPhotos[o.slug].src, imageSrcSet: industryPhotos[o.slug].srcSet, imageSizes: '100vw' }] : [],
    meta: o
      ? [
          { title: o.title }, { name: "description", content: o.description },
          { property: "og:title", content: o.title }, { property: "og:description", content: o.description },
          { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Stránka nenalezena | SYMBIYA" }, { name: "robots", content: "noindex" }],
  }),
  component: OborPage,
});

function OborPage() {
  const o = Route.useLoaderData();
  return <><Header demo={o.demo}/><main>
    <section className="section-dark industry-hero photo-industry-hero">{industryPhotos[o.slug] && <Photo photo={industryPhotos[o.slug]} hero className="hero-photo industry-cover"/>}<div className="photo-shade" aria-hidden="true"/><div className="page-width industry-hero-layout">
      <div className="industry-hero-copy"><p className="industry-eyebrow">{o.nazev} · {o.podnazev}</p><h1>{o.nadpis}</h1><p className="hero-description">{o.podnadpis}</p>
        {o.demo ? <><div className="demo-console glass-panel"><span className="system-status"><span className="status-dot"/>linka aktivní</span><a href={`tel:${o.demo.tel}`} className="demo-number">{o.demo.cislo}</a><div className="hero-actions"><Button asChild><a href={`tel:${o.demo.tel}`}><Phone size={17}/>Zavolat demo</a></Button><Button asChild variant="secondary"><a href={mailUkazka(o.nazev)}>Domluvit ukázku<ArrowUpRight size={17}/></a></Button></div></div><p className="demo-disclaimer">Ozve se AI recepční smyšleného podniku {o.demo.firma}.</p></> : <div className="hero-actions"><Button asChild><a href={mailUkazka(o.nazev)}>Domluvit ukázku pro váš obor<ArrowUpRight size={17}/></a></Button></div>}
      </div>
    </div></section>
    <section className="section-dark section-space" aria-labelledby="hovory"><Reveal className="page-width"><div className="section-heading"><h2 id="hovory">Typické hovory<span className="text-primary">.</span></h2><span className="section-marker" aria-hidden="true">↘</span></div><ul className="typical-calls">{o.hovory.map(h => <li key={h.dotaz}><p>{h.dotaz}</p><ArrowRight size={18} aria-hidden="true"/><p>{h.akce}</p></li>)}</ul></Reveal></section>
    <section className="section-dark section-space" aria-labelledby="prepis"><div className="page-width transcript-layout"><Reveal><h2 id="prepis">Jak to zní<span className="text-primary">.</span></h2><div className="transcript-wave" aria-hidden="true">{Array.from({length: 25}, (_, i) => <i key={i}/>)}</div></Reveal><div className="glass-panel transcript-panel"><LiveChat key={o.slug} lines={o.prepis}/></div></div></section>
    <section className="section-dark section-space" aria-labelledby="potrebuje"><Reveal className="page-width requirements-layout"><h2 id="potrebuje">Co od vás potřebuje<span className="text-primary">.</span></h2><ul>{o.potrebuje.map(p => <li key={p}><span className="requirement-mark" aria-hidden="true">+</span>{p}</li>)}</ul></Reveal></section>
    <Pilot/><Faq/><Zaver demo={o.demo}/>
  </main><Footer demo={o.demo}/></>;
}
