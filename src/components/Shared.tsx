import { mailHovor } from "@/data/obory";

const pilot = [
  ["Nastavení", "Naučíme ji váš ceník a pravidla. Od vás 1–2 hodiny času."],
  ["Číslo", "Hovory, které nevezmete, se přesměrují na ni. Vaše číslo zůstává."],
  ["Kontrola", "Každý hovor jde poslechnout a přečíst."],
  ["Měření", "Kolik hovorů vzala a kolik skončilo objednávkou."],
  ["Potom", "Měsíční paušál, nebo konec bez závazku."],
];

export function Pilot() {
  return (
    <section className="section-light" aria-labelledby="pilot">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.4fr]">
        <h2 id="pilot" className="text-5xl sm:text-6xl">Jak začít: pilot na 4 týdny</h2>
        <dl className="divide-y border-y">
          {pilot.map(([t, d]) => (
            <div key={t} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr]">
              <dt className="font-display text-2xl font-bold">{t}</dt>
              <dd className="text-lg text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const faq = [
  ["Nepozná klient, že mluví s robotem?", "Zavolejte si demo a posuďte sami. Na přímou otázku odpoví pravdivě, že je AI."],
  ["Co když neví odpověď?", "Nic si nevymýšlí. Předá vám jméno, číslo a co volající potřebuje."],
  ["Funguje to s mým rezervačním systémem?", "Napojení prověříme na začátku pilotu. Když nejde, posílá vám rezervace SMS ke schválení."],
  ["Co GDPR?", "Zpracovatelská smlouva je součástí pilotu. Data slouží jen k vyřízení dotazu."],
  ["Kolik to stojí?", "Řekneme na 20minutovém hovoru podle počtu hovorů. Když se to nevyplatí, řekneme to rovnou."],
];

export function Faq() {
  return (
    <section className="section-dark" aria-labelledby="faq">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <h2 id="faq" className="mb-8 text-5xl sm:text-6xl">Časté otázky</h2>
        {faq.map(([q, a]) => (
          <details key={q} className="group border-b border-haze/15 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold">
              {q}
              <span aria-hidden className="text-2xl text-glow transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-lg text-haze/75">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Zaver({ demo }: { demo?: { cislo: string; tel: string } | undefined }) {
  return (
    <section className="section-light" aria-labelledby="zaver">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <h2 id="zaver" className="max-w-3xl text-6xl sm:text-8xl">Kolik hovorů jste dnes nevzali?</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={mailHovor} className="btn btn-glow">Domluvit 20min hovor</a>
          {demo && <a href={`tel:${demo.tel}`} className="btn btn-line">Zavolat demo {demo.cislo}</a>}
        </div>
      </div>
    </section>
  );
}
