import { Ban, BookOpenCheck, FileImage, Headphones, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { Reveal } from './Effects';

const ROWS = [
  { n: 212, d: '3. 11.', what: 'Pohonné hmoty', cat: 'doprava', sum: '1 840 Kč' },
  { n: 213, d: '4. 11.', what: 'Spojovací materiál', cat: 'materiál', sum: '612 Kč' },
  { n: 214, d: '5. 11.', what: 'Sádrokarton, profily, šrouby', cat: 'materiál', sum: '4 386 Kč', fresh: true },
];

export function ReceiptProof() {
  return <section className="section-dark section-space proof-section" aria-labelledby="ucty-h"><div className="page-width proof-layout">
    <Reveal className="proof-copy">
      <span className="journey-num mono">back office · účtenky a doklady</span>
      <h2 id="ucty-h">Vyfotíte účtenku. Zbytek je hotový<span className="text-primary">.</span></h2>
      <p>Zmuchlaná účtenka ze stavebnin, faktura v PDF, paragon z pumpy. Pošlete ji Sáře na WhatsApp a ona ji přečte, zařadí a zapíše do tabulky pro účetní. Žádné večery nad krabicí dokladů.</p>
      <ul className="proof-points"><li>rozpozná datum, dodavatele, položky a částku</li><li>zařadí do kategorie podle vašich pravidel</li><li>když si není jistá, zeptá se, místo aby hádala</li></ul>
    </Reveal>
    <div className="proof-visual">
      <figure className="wa-phone">
        <div className="wa-screen">
          <div className="wa-top"><span className="wa-avatar" aria-hidden="true">S</span><span><strong>Sára</strong><small>vaše asistentka</small></span></div>
          <div className="wa-body">
            <div className="wa-out">
              <div className="receipt" aria-label="Fotka účtenky">
                <FileImage size={16} aria-hidden="true"/>
                <span className="mono">STAVEBNINY · 5. 11.<br/>sádrokarton 12×<br/>profil CW 8×<br/>šrouby 2 bal.<br/>celkem 4 386 Kč</span>
              </div>
              <span className="wa-time mono">16:42 ✓✓</span>
            </div>
            <div className="wa-msg"><p>Uloženo jako náklad za materiál, zakázka Novákovi. Zapsáno do tabulky na řádek 214, částka 4 386 Kč s DPH.</p><span className="wa-time mono">16:42</span></div>
          </div>
        </div>
        <figcaption className="mono">whatsapp · účtenka ze stavby</figcaption>
      </figure>
      <div className="sheet glass-panel" role="table" aria-label="Ukázka tabulky nákladů">
        <div className="sheet-row sheet-head" role="row"><span role="columnheader">#</span><span role="columnheader">datum</span><span role="columnheader">položka</span><span role="columnheader">kategorie</span><span role="columnheader">částka</span></div>
        {ROWS.map((r) => <div className={`sheet-row${r.fresh ? ' is-fresh' : ''}`} role="row" key={r.n}><span role="cell">{r.n}</span><span role="cell">{r.d}</span><span role="cell">{r.what}</span><span role="cell">{r.cat}</span><span role="cell">{r.sum}</span></div>)}
      </div>
    </div>
  </div></section>;
}

const RULES = [
  { icon: BookOpenCheck, title: 'Jen z vašich podkladů', text: 'Odpovídá z ceníku, otevírací doby a pravidel, které jí dáte. Co v nich není, si nedomýšlí.' },
  { icon: Ban, title: 'Žádné sliby mimo pravidla', text: 'Slevy, výjimky, reklamace a ceny mimo ceník nesjednává. Předá je vám se shrnutím.' },
  { icon: UserRoundCheck, title: 'Odborné věci předá člověku', text: 'Zdravotní, právní nebo technické dotazy neřeší. Domluví, že se ozvete, a naléhavé případy odkáže na 155.' },
  { icon: Headphones, title: 'Všechno zpětně zkontrolujete', text: 'Každý hovor a každá zpráva je nahraná a přepsaná. Vidíte přesně, co kdo řekl.' },
];

export function SafetyLimits() {
  return <section className="section-dark section-space safety-section" aria-labelledby="hranice-h"><div className="page-width">
    <Reveal><div className="section-heading"><div><h2 id="hranice-h">Bezpečnost a hranice<span className="text-primary">.</span></h2><p className="ability-sub">Největší strach z AI je, že si něco vymyslí. Sára je nastavená tak, aby se držela jen toho, co jí dáte, a všechno ostatní poslala vám.</p></div><span className="section-marker" aria-hidden="true"><ShieldCheck size={22}/></span></div></Reveal>
    <div className="safety-layout">
      <ul className="safety-rules">
        {RULES.map(({ icon: Icon, title, text }) => <li key={title}><span className="ability-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.5}/></span><div><h3>{title}</h3><p>{text}</p></div></li>)}
      </ul>
      <div className="glass-panel safety-call">
        <p className="mono safety-meta"><span className="status-dot"/>hovor · ordinace · 09:41</p>
        <div className="inbox-bubble is-client">Bolí mě po zákroku koleno. Mám si vzít něco na otok, nebo to nechat být?</div>
        <div className="inbox-bubble is-sara"><span className="mono">Sára</span>Tohle je odborný zdravotní dotaz a ten po telefonu neposoudím. Pan doktor vám ale ještě dnes odpoledne zavolá. Mám mu to předat? Kdyby se stav rychle zhoršoval, volejte prosím 155.</div>
        <div className="inbox-bubble is-client">Ano, předejte to prosím.</div>
        <p className="inbox-handoff">Předáno lékaři: dotaz po zákroku, prosí o zavolání odpoledne. Přepis hovoru je v přehledu.</p>
      </div>
    </div>
  </div></section>;
}
