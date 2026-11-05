import { Ban, BookOpenCheck, CreditCard, FileImage, FileText, Headphones, MessageCircle, Phone, ReceiptText, ShieldCheck, UserRoundCheck } from 'lucide-react';
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


export function OmniBlocks() {
  return <section id="system" className="section-dark section-space omni-section" aria-labelledby="omni-h"><div className="page-width">
    <Reveal><div className="section-heading"><div><h2 id="omni-h">Tohle není jen telefon<span className="text-primary">.</span></h2><p className="ability-sub">Jedna asistentka na tři místa, kde vám dnes utíkají peníze a čas: telefon, zprávy a papíry.</p></div><span className="section-marker" aria-hidden="true">↘</span></div></Reveal>
    <ul className="omni-grid">
      <li className="omni-card">
        <span className="journey-num mono"><Phone size={13} aria-hidden="true"/>telefon · záchrana zakázek</span>
        <h3>Zvedne hned. I v noci.</h3>
        <p>Kdo se nedovolá poprvé, už to nezkusí. Sára zvedá, domlouvá termíny a zapisuje do kalendáře. Vy ráno vidíte hotový rozvrh.</p>
        <div className="omni-mock">
          <p className="mono omni-meta"><span className="status-dot"/>hovor · 22:47</p>
          <div className="inbox-bubble is-client">Dobrý den, potřeboval bych na zítra opravit kapající baterii.</div>
          <div className="inbox-bubble is-sara"><span className="mono">Sára</span>Zítra mezi 8 a 10 může přijet technik. Zapíšu vás a potvrzení pošlu SMS.</div>
          <span className="inbox-status is-done">zapsáno do kalendáře · sms odeslána</span>
        </div>
      </li>
      <li className="omni-card">
        <span className="journey-num mono"><MessageCircle size={13} aria-hidden="true"/>sítě a whatsapp · okamžitá odpověď</span>
        <h3>Ze zpráv rovnou do kalendáře.</h3>
        <p>Kdo nedostane odpověď včas, jde jinam. Sára na Instagramu a WhatsAppu odpoví hned, pošle ceník, zjistí, co zákazník chce, a vybere zálohu.</p>
        <div className="omni-mock">
          <p className="mono omni-meta"><span className="inbox-chip ch-ig"><i aria-hidden="true"/>Instagram</span> 23:05</p>
          <div className="inbox-bubble is-client">Kolik stojí prodloužení řas a máte volno tento týden?</div>
          <div className="inbox-bubble is-sara"><span className="mono">Sára</span>Posílám ceník. Volno mám ve čtvrtek ve 14:00, rezervace je závazná po záloze 300 Kč.
            <span className="dm-file"><FileText size={14} aria-hidden="true"/>cenik.pdf</span>
            <span className="dm-pay"><CreditCard size={14} aria-hidden="true"/>Zaplatit zálohu 300 Kč</span>
          </div>
        </div>
      </li>
      <li className="omni-card">
        <span className="journey-num mono"><ReceiptText size={13} aria-hidden="true"/>operativa · účetnictví bez papírů</span>
        <h3>Vyfotit a zapomenout.</h3>
        <p>Konec večerů nad krabicí dokladů. Fakturu nebo účtenku vyfotíte na WhatsApp, Sára z ní vytáhne data a zapíše ji do tabulky pro účetní.</p>
        <div className="omni-mock omni-wa">
          <div className="wa-out"><div className="receipt"><FileImage size={14} aria-hidden="true"/><span className="mono">STAVEBNINY · 5. 11.<br/>sádrokarton 12×<br/>celkem 4 386 Kč</span></div></div>
          <div className="wa-msg"><p>Uloženo jako náklad na materiál, zapsáno na řádek 214.</p><span className="wa-time mono">16:42</span></div>
        </div>
      </li>
    </ul>
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
    <Reveal><div className="section-heading"><div><h2 id="hranice-h">Sára zná své hranice<span className="text-primary">.</span></h2><p className="ability-sub">Není to volnomyšlenkářský chatbot. Odpovídá jen z vašich dat (ceník, pravidla, otevírací doba), neslibuje slevy a nestanovuje diagnózy. Co neví, předá vám.</p></div><span className="section-marker" aria-hidden="true"><ShieldCheck size={22}/></span></div></Reveal>
    <div className="safety-layout">
      <ul className="safety-rules">
        {RULES.map(({ icon: Icon, title, text }) => <li key={title}><span className="ability-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.5}/></span><div><h3>{title}</h3><p>{text}</p></div></li>)}
      </ul>
      <div className="glass-panel safety-call">
        <p className="mono safety-meta"><span className="status-dot"/>hovor · zubní ordinace · 09:41</p>
        <div className="inbox-bubble is-client">Bolí mě už týden zub, co si na to mám vzít?</div>
        <div className="inbox-bubble is-sara"><span className="mono">Sára</span>Omlouvám se, ale jako recepční nemohu radit s léčbou. Můžu vás ale hned objednat na vyšetření k panu doktorovi. Nejbližší volný termín je zítra v 9:00. Chcete ho?</div>
        <div className="inbox-bubble is-client">Ano, beru.</div>
        <p className="inbox-handoff">Objednáno na zítra 9:00, potvrzení odesláno SMS. Při silné bolesti s otokem nebo horečkou Sára doporučí pohotovost.</p>
      </div>
    </div>
  </div></section>;
}
