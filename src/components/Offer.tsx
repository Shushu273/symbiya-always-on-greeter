import { ArrowUpRight, Check, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal } from './Effects';
import { DEMO_GASTRO } from '@/data/obory';
import { OFFER, mailPilot } from '@/data/offer';

const fmt = new Intl.NumberFormat('cs-CZ');

const vCene = [
  'Nonstop příjem hovorů česky i anglicky',
  'Objednávání a SMS potvrzení',
  'Předání výjimek člověku',
  'Ranní report',
  'Nahrávky a přepisy všech hovorů',
  'Nastavení za vás (od vás 1–2 hodiny)',
];

export function Offer() {
  return (
    <section id="nabidka" className="section-dark section-space offer-section" aria-labelledby="nabidka-h">
      <Reveal className="page-width">
        <div className="offer-panel">
          <div className="offer-head">
            <span className="offer-badge">zaváděcí nabídka · prvních {OFFER.slotsTotal} firem</span>
            <span className="offer-slots">
              <span className="mono">volná místa: {OFFER.slotsLeft} z {OFFER.slotsTotal}</span>
              <span className="offer-bar" aria-hidden="true"><i style={{ width: `${(OFFER.slotsLeft / OFFER.slotsTotal) * 100}%` }} /></span>
            </span>
          </div>
          <h2 id="nabidka-h">Recepce Sára za polovinu.</h2>
          <p className="offer-price">
            <s>{fmt.format(OFFER.priceFull)} Kč</s>
            <strong>{fmt.format(OFFER.priceIntro)} Kč</strong>
            <span>/ měsíc bez DPH</span>
          </p>
          <ul className="offer-checklist">
            {vCene.map((v) => <li key={v}><Check size={17} aria-hidden="true" />{v}</li>)}
          </ul>
          <p className="offer-pilot-note">Začínáme 4týdenním pilotem. Když se nezaplatí, skončíte bez závazku.</p>
          <div className="hero-actions offer-actions">
            <Button asChild><a href={mailPilot}>Rezervovat místo<ArrowUpRight size={17} /></a></Button>
            <Button asChild variant="secondary"><a href={`tel:${DEMO_GASTRO.tel}`}><Phone size={16} />Zavolejte Sáře</a></Button>
          </div>
          <p className="offer-custom">Jádro firmy (WhatsApp, kalendář, účtenky do Excelu) – cena na míru.</p>
        </div>
      </Reveal>
    </section>
  );
}
