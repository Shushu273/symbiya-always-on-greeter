import { useEffect, useState, type ReactNode } from 'react';
import { CreditCard, FileText, Heart, MessageCircle, Play, Send, Timer } from 'lucide-react';
import { Reveal, usePrefersReducedMotion } from './Effects';

function Step({ n, label, title, text, children, id }: { n: string; label: string; title: string; text: string; children: ReactNode; id: string }) {
  return <li className="journey-step" aria-labelledby={id}>
    <Reveal className="journey-copy">
      <span className="journey-num mono"><i aria-hidden="true"/>{n} · {label}</span>
      <h3 id={id}>{title}</h3>
      <p>{text}</p>
    </Reveal>
    <div className="journey-visual">{children}</div>
  </li>;
}

function Phone({ name, children, caption }: { name: string; children: ReactNode; caption: string }) {
  return <figure className="wa-phone">
    <div className="wa-screen">
      <div className="wa-top"><span className="wa-avatar" aria-hidden="true">S</span><span><strong>{name}</strong><small>oficiální firemní účet</small></span></div>
      <div className="wa-body">{children}</div>
    </div>
    <figcaption className="mono">{caption}</figcaption>
  </figure>;
}

function WaMsg({ text, buttons }: { text: string; buttons: string[] }) {
  return <div className="wa-msg"><p>{text}</p><span className="wa-time mono">10:02</span>{buttons.map((b) => <span className="wa-btn" key={b}>{b}</span>)}</div>;
}

function HoldTimer() {
  const reduced = usePrefersReducedMotion();
  const [s, setS] = useState(15 * 60);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setS((x) => (x <= 1 ? 15 * 60 : x - 1)), 1000);
    return () => clearInterval(t);
  }, [reduced]);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  const pct = (s / (15 * 60)) * 100;
  return <div className="hold-timer" role="img" aria-label={`Termín držen ještě ${mm} minut ${ss} sekund`}>
    <Timer size={18} aria-hidden="true"/>
    <span><small className="mono">termín držíme pro vás</small><strong className="mono">{mm}:{ss}</strong></span>
    <span className="hold-bar" aria-hidden="true"><i style={{ width: `${pct}%` }}/></span>
    <small className="hold-note">Když záloha nedorazí, termín se sám nabídne dalšímu na čekací listině.</small>
  </div>;
}

export function SalonJourney() {
  return <section id="cesta-zakaznika" className="section-dark section-space journey-section" aria-labelledby="journey-h"><div className="page-width">
    <Reveal><div className="section-heading"><div><h2 id="journey-h">Od komentáře po zaplacený termín<span className="text-primary">.</span></h2><p className="ability-sub">Ne chytrý chatbot, ale systém, který z dosahu na sítích dělá obsazená křesla. Takhle projde zákazník vaším salonem.</p></div><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>

    <ol className="journey">
      <Step n="01" label="získání" id="j1" title="Z komentáře rovnou do křesla. Bez vaší práce." text="Video má dosah, ale vy nemáte čas odpovídat na desítky zpráv. Sára chytí každý zájem ve vteřině, kdy vznikne: pošle ceník, návod nebo e-book a rovnou nabídne volné termíny.">
        <div className="split-mock">
          <div className="ig-post">
            <div className="ig-head"><span className="ig-avatar" aria-hidden="true"/><strong>vas.salon</strong><span className="mono">reels</span></div>
            <div className="ig-media"><Play size={30} aria-hidden="true"/><span>Péče o čerstvé tetování ve 3 krocích</span></div>
            <div className="ig-actions" aria-hidden="true"><Heart size={18}/><MessageCircle size={18}/><Send size={18}/></div>
            <p className="ig-caption"><strong>vas.salon</strong> Napište do komentářů slovo <b>PÉČE</b> a pošlu vám náš manuál, jak se starat o čerstvé tetování.</p>
            <ul className="ig-comments"><li><strong>klara.v</strong> PÉČE</li><li><strong>tom_ink</strong> PÉČE</li><li><strong>bara.n</strong> PÉČE, a kolik stojí menší motiv?</li></ul>
          </div>
          <div className="dm-mock">
            <p className="mono dm-label">zpráva · do 1 vteřiny</p>
            <div className="dm-bubble">Ahoj! Tady je slíbený průvodce péčí o tetování.
              <span className="dm-file"><FileText size={16} aria-hidden="true"/>pece-o-tetovani.pdf</span>
              Kdyby ses chtěl rovnou stavit na konzultaci k dalšímu kousku, tady jsou volné termíny na příští týden:
              <span className="dm-link">Ukázat volné termíny</span>
            </div>
          </div>
        </div>
      </Step>

      <Step n="02" label="filtrace a záloha" id="j2" title="Platba předem rovnou do chatu. Konec prázdných křesel." text="Kdo myslí rezervaci vážně, zálohu zaplatí. Kdo jen zjišťuje cenu, už vás nebude stát ani minutu. Sára zjistí motiv a velikost, domluví termín a pošle odkaz na platbu do WhatsAppu nebo SMS.">
        <div className="pay-mock glass-panel">
          <div className="dm-bubble is-client">Chtěla bych menší motiv na předloktí, nejlépe v pátek odpoledne.</div>
          <div className="dm-bubble">Mám pro vás pátek v 15:00. Pro závaznou rezervaci je potřeba uhradit zálohu 500 Kč. Zaplatit můžete kartou nebo Apple Pay přes tento odkaz:
            <span className="dm-pay"><CreditCard size={16} aria-hidden="true"/>Zaplatit zálohu 500 Kč</span>
          </div>
          <HoldTimer/>
        </div>
      </Step>

      <Step n="03" label="péče a návrat" id="j3" title="Nečekejte, až si vzpomenou. Sára se připomene sama." text="Oficiální WhatsApp šablony s tlačítky: zákazník potvrdí termín nebo si objedná další jedním klepnutím. Žádné vypisování, žádné zdržování.">
        <div className="phones">
          <Phone name="Váš salon" caption="připomínka den předem"><WaMsg text="Dobrý den, Tomáši. Zítra v 10:00 máte termín na fade u Dana. Platí to?" buttons={['Potvrdit', 'Potřebuji zrušit']}/></Phone>
          <Phone name="Váš salon" caption="návrat po 4 týdnech"><WaMsg text="Dobrý den, Petře. Jsou to přesně 4 týdny od vaší poslední návštěvy. Najdeme termín na další úpravu příští týden?" buttons={['Ukázat volné termíny']}/></Phone>
        </div>
      </Step>

      <Step n="04" label="záchrana" id="j4" title="Zrušeno na poslední chvíli? Místo je do hodiny zase plné." text="Jakmile někdo zruší, Sára pošle uvolněný termín lidem na čekací listině, kteří o něj stojí a souhlasili se zprávami. Kdo klepne první, má ho. Ostatním napíše, že už je obsazeno.">
        <div className="phones">
          <Phone name="Váš salon" caption="uvolněný termín · čekací listina"><WaMsg text="Dobrý den, zítra ve 14:00 se uvolnil termín na střední tetování. Kdo klepne první, toho je." buttons={['Beru ten termín']}/></Phone>
          <div className="rescue-log glass-panel">
            <p className="mono">zítra 14:00 · zrušeno v 18:12</p>
            <ol><li><span className="mono">18:12</span>nabídnuto 6 čekajícím</li><li><span className="mono">18:19</span>Klára V. klepla „Beru ten termín“</li><li><span className="mono">18:19</span>potvrzení odesláno, ostatním „už obsazeno“</li></ol>
            <span className="inbox-status is-done">místo zachráněno</span>
          </div>
        </div>
      </Step>
    </ol>
    <p className="ability-note">Ukázka s vymyšlenými zákazníky. Komentáře a zprávy na Instagramu a Facebooku přes oficiální rozhraní Meta, WhatsApp přes oficiální WhatsApp Business API se schválenými šablonami. Platební bránu, ceník a texty nastavíme při nasazení podle vašeho salonu.</p>
  </div></section>;
}
