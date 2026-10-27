import { useEffect, useState } from "react";

const hovory = [
  { obor: "Barbershop", q: "Máte v sobotu volno na fade?", a: "Objednáno: So 11:00 u Dana", t: "0:38" },
  { obor: "Klinika", q: "Potřebuju přeobjednat kontrolu", a: "Přesunuto na čt 8:30", t: "0:52" },
  { obor: "Salon", q: "Kolik stojí gelové nehty?", a: "Ceník poslán, objednáno na pátek", t: "1:04" },
  { obor: "Stavebnictví", q: "Chci nacenit koupelnu", a: "Poptávka zapsána, majitel volá zítra", t: "1:47" },
  { obor: "Doprava", q: "Kde je moje zásilka?", a: "Stav zjištěn, řidič je tam do 40 min", t: "0:41" },
  { obor: "Gastro", q: "Stůl pro 6 v pátek v 19:00?", a: "Rezervováno, potvrzeno SMS", t: "0:29" },
];

export function CallFeed() {
  const [n, setN] = useState(3);
  const [done, setDone] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t2: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setN((x) => x + 1);
      setDone(false);
      t2 = setTimeout(() => setDone(true), 1300);
    }, 3000);
    return () => { clearInterval(id); clearTimeout(t2); };
  }, []);
  const visible = [0, 1, 2].map((i) => ({ ...hovory[(n - i) % hovory.length], key: n - i, latest: i === 0 }));

  return (
    <div className="mx-auto w-full max-w-sm rounded-[2.5rem] border border-haze/15 bg-ink-2 p-4" aria-label="Ukázka příchozích hovorů">
      <div className="flex items-center justify-between px-2 pb-3 text-sm text-haze/70">
        <span>příchozí hovory</span><span className="flex items-center gap-2"><span className="dot-glow" aria-hidden />nonstop</span>
      </div>
      <ul className="space-y-3" aria-live="polite">
        {visible.map((h) => {
          const ok = !h.latest || done;
          return (
            <li key={h.key} className={`rounded-2xl bg-ink p-4 ${h.latest ? "animate-call" : "opacity-70"}`}>
              <div className="flex justify-between text-xs text-haze/60"><span>{h.obor}</span>{ok && <span>vyřízeno za {h.t}</span>}</div>
              <p className="mt-1 text-haze">„{h.q}“</p>
              <p className={`mt-2 flex items-center gap-2 text-sm font-semibold ${ok ? "text-glow" : "text-phone"}`}>
                <span aria-hidden className={ok ? "dot-glow" : "h-2 w-2 rounded-full bg-phone"} />
                {ok ? h.a : "Recepční mluví…"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
