import { CarFront, CreditCard, FolderKanban, PhoneCall, Repeat2, Ticket, Truck, Users } from 'lucide-react';
import { Reveal } from './Effects';

const PAINS = [
  { icon: PhoneCall, title: '„Zavolám zítra“ znamená „zavolám konkurenci“', text: 'U aut rozhoduje čas. Kdo potřebuje narychlo dodávku nebo stojí v nouzovém pruhu, nezkusí to za hodinu znovu. Volá další číslo.' },
  { icon: Truck, title: 'Rezervace bez zálohy = auto stojí na place', text: 'Někdo si zamluví devítimístnou dodávku na víkend, vy odmítnete další zájemce a v pátek se nikdo neukáže.' },
  { icon: Repeat2, title: 'Pořád dokola ty samé otázky', text: '„Máte Octavii v automatu?“ „Dáváte k tomu střešní box?“ „Kolik stojí známka?“ Váš čas je drahý na živý ceník po telefonu.' },
  { icon: Users, title: 'Kdo vlastně přijede?', text: 'Zákazník napíše e-mail, pak SMS a nakonec zavolá. Při předávce pak dohledáváte, na čem jste se s „tím pánem z WhatsAppu“ domluvili.' },
];

const FIX = [
  { icon: PhoneCall, title: 'Zvedne hned, nonstop', text: 'V úterý v poledne i v neděli o půlnoci. Zjistí, jaké auto zákazník chce nebo co mu na autě je, a nabídne první volný termín.', state: 'neděle 23:40 · vyřízeno' },
  { icon: CreditCard, title: 'Zálohy předem', text: 'Jakmile se domluví termín, pošle do SMS nebo e-mailu odkaz na zálohu. Bez ní auto nevyjede a místo na zvedáku se neblokuje.', state: 'záloha 2 000 Kč · zaplaceno' },
  { icon: CarFront, title: 'Zná váš vozový park a ceník', text: 'Ví, která auta jsou volná, která mají tažné zařízení a kolik stojí výměna oleje. Odpovídá z vašich podkladů, nic si nedomýšlí.', state: 'transit l2h2 · volný pá–ne' },
  { icon: FolderKanban, title: 'Všechno v jedné kartě', text: 'Hovor, WhatsApp i e-mail spadnou k jednomu zákazníkovi. Na dílně nebo při předávce vidíte přepis, požadavek a jestli je záloha zaplacená.', state: 'hovor + whatsapp + e-mail → 1 karta' },
];

export function AutoSection() {
  return <>
    <section className="section-dark section-space" aria-labelledby="auto-pain-h"><div className="page-width">
      <Reveal><div className="section-heading"><div><h2 id="auto-pain-h">Kde vám utíkají peníze<span className="text-primary">?</span></h2><p className="ability-sub">Zahozené hovory a propadlé rezervace stojí víc, než se zdá. Každý nezvednutý hovor u aut je ztráta v tisících, u opravy i v desítkách tisíc.</p></div><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>
      <ul className="ability-grid auto-pains">
        {PAINS.map(({ icon: Icon, title, text }) => <li className="ability-card" key={title}><span className="ability-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5}/></span><h3>{title}</h3><p>{text}</p></li>)}
      </ul>
    </div></section>

    <section className="section-dark section-space" aria-labelledby="auto-fix-h"><div className="page-width proof-layout auto-fix">
      <div>
        <Reveal><h2 id="auto-fix-h" className="auto-fix-h">Přestaňte dělat dispečera. Začněte řídit byznys<span className="text-primary">.</span></h2></Reveal>
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
  </>;
}
