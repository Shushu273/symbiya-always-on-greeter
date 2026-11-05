import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BellRing, ListOrdered, UserRound } from 'lucide-react';
import { Reveal, usePrefersReducedMotion } from './Effects';

type Ch = 'Instagram' | 'Facebook' | 'WhatsApp' | 'Sára';
type Msg = { who: string; ch: Ch; time: string; text: string; reply: string; handoff?: boolean; also?: Ch[]; zajem: string; pro: string; next: string };

const CH_CLASS: Record<Ch, string> = { Instagram: 'ch-ig', Facebook: 'ch-fb', WhatsApp: 'ch-wa', 'Sára': 'ch-sara' };

const MSGS: Msg[] = [
  { who: 'Tereza M.', ch: 'Instagram', time: '22:41', text: 'Kolik by stálo menší tetování na předloktí?', reply: 'Záleží na motivu a velikosti. Pošlete mi prosím fotku nebo popis, nabídnu vám konzultaci u tatérky, která dělá jemnou linku.', also: ['WhatsApp'], zajem: 'malé tetování, cena', pro: 'Tatérka 2', next: 'Poslat návrh motivu a cenu' },
  { who: 'Martin K.', ch: 'Sára', time: '07:12', text: 'Hovor: Potřebuju přesunout zítřejší střih.', reply: 'Přesunuto na čtvrtek 16:00 u Dana, potvrzení odešlo SMS. Uvolněný zítřek nabízím čekajícím.', zajem: 'přesun termínu', pro: 'Dan', next: 'Nic, vyřízeno' },
  { who: 'Petra N.', ch: 'Facebook', time: '09:05', text: 'Máte tento týden volno na řasy?', reply: 'Dobrý den, ve čtvrtek ve 14:00 nebo v pátek v 10:00. Který termín vám zapíšu?', zajem: 'řasy, volný termín', pro: 'Asistent', next: 'Nic, čeká na potvrzení zákaznice' },
  { who: 'Jana D.', ch: 'WhatsApp', time: '10:18', text: 'Chtěla bych reklamovat včerejší ošetření.', reply: 'Mrzí mě to. Předávám vás přímo majitelce, ozve se vám ještě dnes.', handoff: true, zajem: 'reklamace', pro: 'Majitelka', next: 'Zavolat zpět do 24 hodin' },
];

const EXTRA = [
  { icon: ListOrdered, title: 'Čekací listina', text: 'Uvolní se termín? Sára ho hned nabídne lidem, kteří čekají na konkrétního člověka, a to jen těm, kdo souhlasili s kontaktem.', state: 'uvolněno pá 15:00 → nabídnuto 3 čekajícím' },
  { icon: BellRing, title: 'Připomínka den předem', text: 'Den před termínem pošle připomínku s instrukcemi. Zákazník odpoví ANO nebo ZRUŠIT, zrušené místo jde rovnou dál.', state: 'připomínka · ano ✓' },
  { icon: UserRound, title: 'Jeden zákazník, jedna karta', text: 'Kdo napsal na Instagram a pak volal, je pořád jeden člověk. Celá historie, zájem a kdo se o něj stará na jednom místě.', state: 'instagram + whatsapp + hovor → 1 karta' },
];

function Chip({ ch }: { ch: Ch }) {
  return <span className={`inbox-chip ${CH_CLASS[ch]}`}><i aria-hidden="true"/>{ch === 'Sára' ? 'hovor · Sára' : ch}</span>;
}

export function OneInbox() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % MSGS.length), 4200);
    return () => clearInterval(t);
  }, [reduced, paused]);
  const m = MSGS[i] ?? MSGS[0]!;

  return <section id="jedno-misto" className="section-dark section-space inbox-section" aria-labelledby="inbox-h"><div className="page-width">
    <Reveal><div className="section-heading"><div><h2 id="inbox-h">Instagram, Facebook, WhatsApp a telefon. Na jednom místě<span className="text-primary">.</span></h2><p className="ability-sub">Sára odpovídá na zprávy i hovory ze všech kanálů. Co vyřídí sama, je hotové. Co patří vám, uvidíte na jednom místě i s navrženou odpovědí.</p></div><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>

    <div className="inbox-panel glass-panel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ul className="inbox-feed" aria-label="Příchozí zprávy ze všech kanálů">
        {MSGS.map((x, k) => <li key={x.who}><button type="button" className={`inbox-item${k === i ? ' is-active' : ''}`} aria-pressed={k === i} onClick={() => { setI(k); setPaused(true); }}>
          <span className="inbox-row"><strong>{x.who}</strong><span className="mono inbox-time">{x.time}</span></span>
          <span className="inbox-text">{x.text}</span>
          <span className="inbox-row inbox-tags"><Chip ch={x.ch}/><span className={`inbox-status ${x.handoff ? 'is-handoff' : 'is-done'}`}>{x.handoff ? 'předáno vám' : 'vyřízeno automaticky'}</span></span>
        </button></li>)}
      </ul>

      <div className="inbox-detail" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }} transition={{ duration: .35 }}>
            <p className="mono inbox-meta"><Chip ch={m.ch}/> {m.who} · {m.time}</p>
            <div className="inbox-bubble is-client">{m.text}</div>
            <div className="inbox-bubble is-sara"><span className="mono">Sára</span>{m.reply}</div>
            {m.handoff && <p className="inbox-handoff">Předáno vám: dostanete upozornění a zákazník je v přehledu označený jako čekající.</p>}
            <dl className="inbox-card">
              <div><dt>Kanály</dt><dd className="inbox-chips"><Chip ch={m.ch}/>{m.also?.map((c) => <Chip key={c} ch={c}/>)}</dd></div>
              <div><dt>Zájem</dt><dd>{m.zajem}</dd></div>
              <div><dt>Stará se</dt><dd>{m.pro}</dd></div>
              <div><dt>Další krok</dt><dd>{m.next}</dd></div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    <p className="ability-note">Ukázka s vymyšlenými zákazníky. Instagram a Facebook napojujeme přes oficiální rozhraní Meta, WhatsApp přes oficiální WhatsApp Business API.</p>

    <ul className="ability-grid inbox-extra">
      {EXTRA.map(({ icon: Icon, title, text, state }) => <li className="ability-card" key={title}>
        <span className="ability-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5}/></span>
        <h3>{title}</h3>
        <p>{text}</p>
        <span className="ability-state"><i className="status-dot" aria-hidden="true"/>{state}</span>
      </li>)}
    </ul>
  </div></section>;
}
