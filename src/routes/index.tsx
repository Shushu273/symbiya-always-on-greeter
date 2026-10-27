import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Layout";
import { Pilot, Faq, Zaver } from "@/components/Shared";
import { CallFeed } from "@/components/CallFeed";
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
  return (
    <>
      <Header />
      <main>
        <section className="section-dark">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 md:grid-cols-[1.2fr_1fr] md:pt-20">
            <div>
              <h1 className="text-6xl sm:text-8xl">Vaše recepce. <span className="text-glow">Nonstop.</span></h1>
              <p className="mt-6 max-w-xl text-lg text-haze/80 sm:text-xl">
                AI recepční, která vezme každý hovor a odpoví na každou zprávu. I když stříháte, operujete, jste na stavbě nebo za volantem. Ve dne, v noci, o víkendu.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#obory" className="btn btn-glow">Vyberte svůj obor</a>
                <a href={mailUkazka()} className="btn btn-line">Domluvit ukázku</a>
              </div>
            </div>
            <CallFeed />
          </div>
        </section>

        <section className="section-light">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="max-w-4xl text-5xl sm:text-7xl">Kdo se nedovolá, zavolá konkurenci.</h2>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">Recepční to vezme za vás, zeptá se na to podstatné a zapíše to.</p>
          </div>
        </section>

        <section id="obory" className="section-dark scroll-mt-16" aria-labelledby="obory-h">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 id="obory-h" className="mb-10 text-5xl sm:text-6xl">Vyberte svůj obor</h2>
            <ul className="grid border-t border-haze/15 md:grid-cols-2">
              {obory.map((o) => (
                <li key={o.slug} className="border-b border-haze/15 md:odd:border-r">
                  <Link to="/$obor" params={{ obor: o.slug }} className="group flex h-full items-end justify-between gap-4 p-6 transition-colors hover:bg-glow hover:text-ink sm:p-8">
                    <span>
                      <span className="block font-display text-4xl font-bold tracking-tight sm:text-5xl">{o.nazev}</span>
                      <span className="mt-2 block text-haze/70 group-hover:text-ink">{o.bolest}</span>
                    </span>
                    <span aria-hidden className="font-display text-4xl transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-light" aria-labelledby="umi">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 id="umi" className="mb-10 text-5xl sm:text-6xl">Co umí</h2>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {umi.map(([t, d]) => (
                <li key={t} className="border-t-2 border-text-light pt-4">
                  <h3 className="text-3xl">{t}</h3><p className="mt-2 text-lg text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-12 max-w-2xl font-display text-2xl font-semibold">Když něco neví, předá to člověku. Nic si nevymýšlí.</p>
          </div>
        </section>

        <Pilot />
        <Faq />
        <Zaver />
      </main>
      <Footer />
    </>
  );
}
