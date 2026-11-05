import { BadgeCheck, Car, Clock3, CreditCard, Filter, Gauge, LockKeyhole, ShieldAlert, Sparkles } from 'lucide-react';
import { Reveal } from './Effects';

const PAINS = [
  { icon: Filter, title: 'Hodiny vysvětlování lidem, kteří nikdy nezaplatí', text: 'Velkou část zpráv tvoří zvědavci: jak je auto rychlé, kolik stojí hodinová projížďka, jestli to jde bez kauce. Váš čas je na to příliš cenný.' },
  { icon: Clock3, title: 'Pomalá odpověď zabíjí prémiový dojem', text: 'Kdo chce zítra zaplatit desítky tisíc za víkend nebo svatbu, čeká okamžitý servis. Odpověď za pět hodin znamená, že už jednal s konkurencí.' },
  { icon: ShieldAlert, title: 'Vysoké zálohy a kauce přes chat', text: 'U sportovních vozů jde o desítky až stovky tisíc. Domlouvání přes zprávy a e-maily je neohrabané a klient si to na poslední chvíli rozmyslí.' },
  { icon: Gauge, title: 'Pořád dokola stejné detaily', text: '„Jaký je tam motor?“ „Můžu s ním do zahraničí?“ „Jaký je denní limit kilometrů a kolik stojí nadlimit?“ Odpovídat stále znovu ubírá energii celému týmu.' },
];

const FIX = [
  { icon: Sparkles, title: 'Reprezentace na úrovni, nonstop', text: 'Kultivovaný tón odpovídající prémiovému segmentu, česky i anglicky. Okamžitě na Instagramu, WhatsAppu, e-mailu i po telefonu o půlnoci.', state: 'whatsapp · en · 23:11' },
  { icon: Filter, title: 'Filtr na seriózní zájemce', text: 'Zná vaše pravidla: minimální věk, praxe, doklady, výše kauce. Kdo je nesplní, zdvořile se dozví proč. K vám se dostanou jen skuteční klienti.', state: 'nesplňuje věk · zdvořile odmítnuto' },
  { icon: Car, title: 'Zná každý detail vašeho fleetu', text: 'Výbavu, limity kilometrů, ceník i podmínky pro zahraničí. Doporučí vhodný vůz pro svatbu, byznys cestu nebo víkendový zážitek.', state: 'svatba · bílé sedan · s řidičem' },
  { icon: CreditCard, title: 'Záloha a kauce bez kompromisů', text: 'Po potvrzení termínu pošle zabezpečený odkaz na platbu. Bez připsané platby se rezervace nedokončí a vůz se neblokuje na dobré slovo.', state: 'kauce 50 000 Kč · složena' },
  { icon: LockKeyhole, title: 'Diskrétní jedna karta klienta', text: 'Celá historie napříč kanály u jednoho klienta, včetně dokladů a plateb. Před předáním vozu víte všechno, co potřebujete.', state: 'instagram + whatsapp + hovor → 1 karta' },
];

export function LuxSection() {
  return <>
    <section className="section-dark section-space" aria-labelledby="lux-pain-h"><div className="page-width">
      <Reveal><div className="section-heading"><div><h2 id="lux-pain-h">Kde prémiové půjčovny ztrácejí čas a peníze<span className="text-primary">.</span></h2><p className="ability-sub">Ztracené poptávky, zbytečné hovory a nezaplacené kauce. Jeden propadlý víkend jsou desítky tisíc.</p></div><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>
      <ul className="ability-grid auto-pains">
        {PAINS.map(({ icon: Icon, title, text }) => <li className="ability-card" key={title}><span className="ability-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5}/></span><h3>{title}</h3><p>{text}</p></li>)}
      </ul>
    </div></section>

    <section className="section-dark section-space" aria-labelledby="lux-fix-h"><div className="page-width proof-layout auto-fix">
      <div>
        <Reveal><h2 id="lux-fix-h" className="auto-fix-h">Pětihvězdičkový servis od první zprávy po předání klíčků<span className="text-primary">.</span></h2></Reveal>
        <ul className="auto-fix-list">
          {FIX.map(({ icon: Icon, title, text, state }) => <li key={title}><span className="ability-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.5}/></span><div><h3>{title}</h3><p>{text}</p><span className="ability-state"><i className="status-dot" aria-hidden="true"/>{state}</span></div></li>)}
        </ul>
      </div>
      <figure className="wa-phone">
        <div className="wa-screen">
          <div className="wa-top"><span className="wa-avatar" aria-hidden="true">S</span><span><strong>Luxury Rent</strong><small>whatsapp · 23:10</small></span></div>
          <div className="wa-body">
            <div className="wa-out"><p className="lux-out">Hi, is the black coupé available tomorrow 8 am at my hotel in Malá Strana?</p></div>
            <div className="wa-msg"><p>Good evening, yes, it is available. 15 000 CZK per day, 250 km included. To confirm, please upload your driving licence and pay the 50 000 CZK deposit:</p><span className="wa-btn"><BadgeCheck size={14} aria-hidden="true"/> Upload licence &amp; pay deposit</span></div>
            <div className="auto-paid"><span className="inbox-status is-done">kauce složena · 23:24</span><span className="mono">přistavení zítra 8:00 · zapsáno</span></div>
          </div>
        </div>
        <figcaption className="mono">večerní poptávka z hotelu</figcaption>
      </figure>
    </div></section>
  </>;
}
