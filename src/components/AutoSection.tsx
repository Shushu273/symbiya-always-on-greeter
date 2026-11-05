import { CarFront, CreditCard, FolderKanban, PhoneCall, Repeat2, Ticket, Truck, Users } from 'lucide-react';
import { Reveal } from './Effects';

const PAINS = [
  { icon: PhoneCall, title: 'Zahozené hovory = ztracené zakázky', text: 'Zákazník stojí v nouzovém pruhu nebo potřebuje urgentně dodávku na víkend. Když to nevezmete hned, nezkusí to za hodinu. Jde dál a s ním tisíce korun.' },
  { icon: Truck, title: 'Dodávka stojí na place', text: 'Někdo si zarezervuje auto, vy odmítnete tři další zájemce a on si to v pátek rozmyslí. Bez zálohy přicházíte o peníze i nervy. Auto nevydělává.' },
  { icon: Repeat2, title: 'Živý ceník místo dispečinku', text: '„Máte volnou Octavii? Je to automat? Má to známku?“ Pořád stejné dotazy na výbavu, podmínky a ceny. Na informační linku je váš čas příliš drahý.' },
];

const FIX = [
  { icon: PhoneCall, title: 'Zvedá na první dobrou, nonstop', text: 'Když máte plné ruce práce, nebo o půlnoci. Uklidní zákazníka v nouzi, nabídne termín na dílně, předá odtahové službě nebo zarezervuje volný vůz podle kalendáře.', state: 'neděle 23:40 · vyřízeno' },
  { icon: CreditCard, title: 'Záloha jako podmínka výjezdu', text: 'Blokaci auta nepotvrdí, dokud není zaplacená záloha. Platební odkaz pošle do SMS nebo na WhatsApp. Žádné výmluvy, auto nestojí na dobré slovo.', state: 'záloha 2 000 Kč · zaplaceno' },
  { icon: CarFront, title: 'Zná váš fleet do šroubku', text: 'Ceník i detaily vozů: jestli má auto tažné, kolik stojí dětská autosedačka navíc nebo kolik dáte za výměnu oleje u konkrétního modelu. Odpovídá jen z vašich podkladů.', state: 'transit l2h2 · tažné · volný pá–ne' },
  { icon: FolderKanban, title: 'Konec chaosu v historii', text: 'E-mail, SMS, WhatsApp i hovor u jednoho zákazníka. Při předávce vidíte celou domluvu a jestli je záloha zaplacená. Konec dohledávání, co vlastně chtěl ten pán s rozbitým zrcátkem.', state: 'hovor + whatsapp + e-mail → 1 karta' },
];

export function AutoSection() {
  return <>
    <section className="section-dark section-space" aria-labelledby="auto-pain-h"><div className="page-width">
      <Reveal><div className="section-heading"><div><h2 id="auto-pain-h">Kde vám utíkají peníze<span className="text-primary">?</span></h2><p className="ability-sub">Zahozené hovory a propadlé rezervace stojí víc, než se zdá. U aut jde u každého nezvednutého hovoru o tisíce, u opravy i o desítky tisíc.</p></div><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>
      <ul className="ability-grid">
        {PAINS.map(({ icon: Icon, title, text }) => <li className="ability-card" key={title}><span className="ability-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5}/></span><h3>{title}</h3><p>{text}</p></li>)}
      </ul>
    </div></section>

    <section className="section-dark section-space" aria-labelledby="auto-fix-h"><div className="page-width proof-layout auto-fix">
      <div>
        <Reveal><h2 id="auto-fix-h" className="auto-fix-h">Jak Sára zacelí díry v byznysu<span className="text-primary">.</span></h2></Reveal>
        <ul className="auto-fix-list">
          {FIX.map(({ icon: Icon, title, text, state }) => <li key={title}><span className="ability-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.5}/></span><div><h3>{title}</h3><p>{text}</p><span className="ability-state"><i className="status-dot" aria-hidden="true"/>{state}</span></div></li>)}
        </ul>
      </div>
      <figure className="wa-phone">
        <div className="wa-screen">
          <div className="wa-top"><span className="wa-avatar" aria-hidden="true">S</span><span><strong>Autopůjčovna</strong><small>sms · pátek 19:52</small></span></div>
          <div className="wa-body">
            <div className="wa-msg"><p>Dobrý den, potvrzuji dodávku Ford Transit na sobotu 8:00 až neděli 18:00. Cena 3 400 Kč včetně pojištění. Rezervace platí po záloze 2 000 Kč:</p><span className="wa-btn"><Ticket size={14} aria-hidden="true"/> Zaplatit zálohu</span></div>
            <div className="auto-paid"><span className="inbox-status is-done">záloha zaplacena · 19:58</span><span className="mono">auto blokováno v rezervacích</span></div>
          </div>
        </div>
        <figcaption className="mono">zachráněná víkendová dodávka</figcaption>
      </figure>
    </div></section>

    <section className="section-dark auto-payback-wrap" aria-labelledby="auto-pay-h"><div className="page-width">
      <div className="glass-panel auto-payback">
        <h2 id="auto-pay-h">Kdy se Sára zaplatí<span className="text-primary">?</span></h2>
        <ul>
          <li><span className="mono">1 zachráněná víkendová dodávka</span><strong className="mono">3 400 Kč</strong></li>
          <li><span className="mono">1 zakázka v servisu z nočního hovoru</span><strong className="mono">3 500 Kč</strong></li>
          <li className="is-total"><span className="mono">provoz Sáry měsíčně</span><strong className="mono">4 990 Kč</strong></li>
        </ul>
        <p>Stačí dva hovory, které jste nemohli zvednout, protože jste stáli pod zvedákem, a měsíc je zaplacený. Vlastní čísla si spočítejte v kalkulačce níž.</p>
        <p className="ability-note">Příklad s cenami z ukázky. Skutečné částky závisí na vašem ceníku.</p>
      </div>
    </div></section>
  </>;
}
