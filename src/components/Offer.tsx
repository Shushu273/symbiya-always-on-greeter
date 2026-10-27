import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal } from './Effects';
import { OFFER, mailNasazeni, mailPro } from '@/data/offer';

const fmt = new Intl.NumberFormat('cs-CZ');

const saraUmi = [
  'Nonstop telefon česky i anglicky',
  'WhatsApp',
  'Kalendář a objednávání',
  'SMS potvrzení a připomínky',
  'Pamatuje si zákazníky, přeobjedná a nabídne volné termíny',
  'Účtenky do Excelu',
  'Ranní report a předání výjimek člověku',
];

const proUmi = [
  'Vše ze Sáry',
  'Nonstop lidský dohled nad hovory',
  'Průběžná optimalizace a nové dovednosti',
  'Měsíční vyhodnocení s doporučeními',
  'Přímý kontakt na váš tým v SYMBIYA',
];

export function Offer() {
  return (
    <section id="nabidka" className="section-dark section-space offer-section" aria-labelledby="nabidka-h">
      <Reveal className="page-width">
        <div className="section-heading">
          <h2 id="nabidka-h">Vyberte si Sáru<span className="text-primary">.</span></h2>
          <span className="section-marker" aria-hidden="true">↘</span>
        </div>
        <p className="offer-compare">Lidská recepční vás stojí desítky tisíc měsíčně a pracuje osm hodin denně. Sára pracuje nonstop.</p>
        <div className="offer-grid">
          <div className="offer-panel">
            <h3>Sára</h3>
            <p className="offer-lead">Jedna AI asistentka pro celou firmu.</p>
            <div className="offer-price-rows">
              <p className="offer-price">
                <span className="offer-price-label">Nasazení</span>
                <s>{fmt.format(OFFER.setupFull)} Kč</s>
                <strong>{fmt.format(OFFER.setupIntro)} Kč</strong>
              </p>
              <p className="offer-price">
                <span className="offer-price-label">Provoz měsíčně</span>
                <strong>{fmt.format(OFFER.monthly)} Kč</strong>
              </p>
            </div>
            <span className="offer-badge">prvních {OFFER.slotsTotal} firem · volná místa {OFFER.slotsLeft} z {OFFER.slotsTotal}</span>
            <span className="offer-slots"><span className="offer-bar" aria-hidden="true"><i style={{ width: `${(OFFER.slotsLeft / OFFER.slotsTotal) * 100}%` }} /></span></span>
            <ul className="offer-checklist">
              {saraUmi.map((v) => <li key={v}><Check size={17} aria-hidden="true" />{v}</li>)}
            </ul>
            <Button asChild><a href={mailNasazeni}>Rezervovat místo<ArrowUpRight size={17} /></a></Button>
          </div>
          <div className="offer-panel offer-pro">
            <span className="offer-pro-badge">PRO</span>
            <h3>Sára PRO</h3>
            <p className="offer-lead">Sára + lidé, kteří ji nonstop hlídají a zdokonalují.</p>
            <div className="offer-price-rows">
              <p className="offer-price">
                <span className="offer-price-label">Nasazení</span>
                <strong>od {fmt.format(OFFER.proSetup)} Kč</strong>
              </p>
              <p className="offer-price">
                <span className="offer-price-label">Provoz měsíčně</span>
                <strong>od {fmt.format(OFFER.proMonthly)} Kč</strong>
              </p>
            </div>
            <p className="offer-pro-note">Pro firmy s více pobočkami, více linkami nebo vyššími nároky.</p>
            <ul className="offer-checklist">
              {proUmi.map((v) => <li key={v}><Check size={17} aria-hidden="true" />{v}</li>)}
            </ul>
            <Button asChild variant="secondary"><a href={mailPro}>Domluvit Sáru PRO<ArrowUpRight size={17} /></a></Button>
          </div>
        </div>
        <p className="offer-pilot-note">Nasazení zahrnuje nastavení na vaši firmu, napojení, otestování a zaškolení. Od vás stačí 1–2 hodiny.</p>
      </Reveal>
    </section>
  );
}
