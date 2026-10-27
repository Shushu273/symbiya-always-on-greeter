import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Layout";
import { Pilot, Faq, Zaver } from "@/components/Shared";
import { najdiObor, mailUkazka } from "@/data/obory";

export const Route = createFileRoute("/$obor")({
  loader: ({ params }) => {
    const o = najdiObor(params.obor);
    if (!o) throw notFound();
    return o;
  },
  head: ({ loaderData: o }) => ({
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
  return (
    <>
      <Header />
      <main>
        <section className="section-dark">
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 md:pt-20">
            <p className="text-haze/60">{o.nazev} · {o.podnazev}</p>
            <h1 className="mt-4 max-w-4xl text-6xl sm:text-8xl">{o.nadpis}</h1>
            <p className="mt-6 max-w-2xl text-lg text-haze/80 sm:text-xl">{o.podnadpis}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {o.demo ? (
                <>
                  <a href={`tel:${o.demo.tel}`} className="btn btn-glow">Zavolat demo {o.demo.cislo}</a>
                  <a href={mailUkazka(o.nazev)} className="btn btn-line">Domluvit ukázku</a>
                </>
              ) : (
                <a href={mailUkazka(o.nazev)} className="btn btn-glow">Domluvit ukázku pro váš obor</a>
              )}
            </div>
            {o.demo && <p className="mt-4 text-sm text-haze/60">Ozve se AI recepční smyšleného podniku {o.demo.firma}.</p>}
          </div>
        </section>

        <section className="section-light" aria-labelledby="hovory">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 id="hovory" className="mb-10 text-5xl sm:text-6xl">Typické hovory</h2>
            <ul className="divide-y border-y">
              {o.hovory.map((h) => (
                <li key={h.dotaz} className="grid gap-2 py-6 md:grid-cols-2 md:gap-10">
                  <p className="font-display text-2xl font-semibold sm:text-3xl">{h.dotaz}</p>
                  <p className="flex gap-3 text-lg"><span aria-hidden className="dot-glow mt-2 shrink-0" />{h.akce}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-dark" aria-labelledby="prepis">
          <div className="mx-auto max-w-2xl px-5 py-20">
            <h2 id="prepis" className="mb-10 text-5xl sm:text-6xl">Jak to zní</h2>
            <ol className="space-y-3">
              {o.prepis.map((r, i) => (
                <li key={i} className={`flex ${r.kdo === "klient" ? "justify-end" : ""}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${r.kdo === "klient" ? "bg-phone text-ink" : "bg-ink-2 text-haze"}`}>
                    <span className="block text-xs opacity-70">{r.kdo === "klient" ? "Volající" : "Recepční"}</span>
                    {r.text}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-light" aria-labelledby="potrebuje">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
            <h2 id="potrebuje" className="text-5xl sm:text-6xl">Co od vás potřebuje</h2>
            <ul className="space-y-4 text-xl">
              {o.potrebuje.map((p) => <li key={p} className="border-b pb-4">{p}</li>)}
            </ul>
          </div>
        </section>

        <Pilot />
        <Faq />
        <Zaver demo={o.demo} />
      </main>
      <Footer demo={o.demo} />
    </>
  );
}
