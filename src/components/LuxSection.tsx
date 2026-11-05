import { BadgeCheck, Car, Clock3, CreditCard, Globe, IdCard, MapPin, ShieldAlert } from 'lucide-react';
import { Reveal } from './Effects';

const PAINS = [
  { icon: Clock3, title: 'Poptávka ve 23:00 počká do rána. Klient ne.', text: 'Turista v hotelu nebo podnikatel před eventem píše večer a chce auto ráno. Kdo odpoví první, ten půjčuje.' },
  { icon: ShieldAlert, title: 'Rezervace bez kauce je riziko za statisíce', text: 'Bez složené kauce a ověřených dokladů si auto za miliony nikdo rozumný nepůjčí. Ruční vyřizování ale trvá a klienta odradí.' },
  { icon: Globe, title: 'Polovina klientů nemluví česky', text: 'Zprávy chodí anglicky, německy, rusky. A v každé jsou stejné otázky na cenu, nájezd, věk a pojištění.' },
  { icon: MapPin, title: 'Přistavení, svatby, eventy', text: 'Kam, kdy, s řidičem, nebo bez? Každá domluva je série zpráv, kterou musí někdo hlídat i o víkendu.' },
];

const FIX = [
  { icon: Globe, title: 'Odpoví hned, i anglicky', text: 'Na WhatsAppu, Instagramu i po telefonu, nonstop. Ověří dostupnost vozu a řekne cenu a podmínky podle vašeho ceníku.', state: 'whatsapp · en · 23:11' },
  { icon: IdCard, title: 'Doklady předem', text: 'Před potvrzením si vyžádá řidičský průkaz a doklad totožnosti a ohlídá podmínky věku a praxe, které jí nastavíte.', state: 'řidičák nahrán · ověřte' },
  { icon: CreditCard, title: 'Kauce dřív, než vyjedete', text: 'Pošle odkaz na složení kauce. Rezervace platí až po jejím složení, do té doby auto neblokuje.', state: 'kauce 50 000 Kč · složena' },
  { icon: Car, title: 'Přistavení bez telefonování', text: 'Domluví místo a čas přistavení, zapíše je do rezervace a den předem klientovi připomene.', state: 'so 9:00 · hotel, Malá Strana' },
];

export function LuxSection() {
  return <>
    <section className="section-dark section-space" aria-labelledby="lux-pain-h"><div className="page-width">
      <Reveal><div className="section-heading"><div><h2 id="lux-pain-h">U luxusních aut rozhoduje rychlost a jistota<span className="text-primary">.</span></h2><p className="ability-sub">Jeden propadlý víkend je pro vás desítky tisíc. Jedna nevybraná kauce může být mnohem víc.</p></div><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>
      <ul className="ability-grid auto-pains">
        {PAINS.map(({ icon: Icon, title, text }) => <li className="ability-card" key={title}><span className="ability-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5}/></span><h3>{title}</h3><p>{text}</p></li>)}
      </ul>
    </div></section>

    <section className="section-dark section-space" aria-labelledby="lux-fix-h"><div className="page-width proof-layout auto-fix">
      <div>
        <Reveal><h2 id="lux-fix-h" className="auto-fix-h">Vy předáváte klíčky. Zbytek vyřídí Sára<span className="text-primary">.</span></h2></Reveal>
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
