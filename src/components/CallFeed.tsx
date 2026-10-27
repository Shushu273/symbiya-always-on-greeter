import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { VoiceSphere } from './VoiceSphere';

const hovory = [
  { obor: 'Barbershop', q: 'Máte v sobotu volno na fade?', a: 'Objednáno: So 11:00 u Dana', t: '0:38' },
  { obor: 'Klinika', q: 'Potřebuju přeobjednat kontrolu', a: 'Přesunuto na čt 8:30', t: '0:52' },
  { obor: 'Salon', q: 'Kolik stojí gelové nehty?', a: 'Ceník poslán, objednáno na pátek', t: '1:04' },
  { obor: 'Stavebnictví', q: 'Chci nacenit koupelnu', a: 'Poptávka zapsána, majitel volá zítra', t: '1:47' },
  { obor: 'Doprava', q: 'Kde je moje zásilka?', a: 'Stav zjištěn, řidič je tam do 40 min', t: '0:41' },
  { obor: 'Gastro', q: 'Stůl pro 6 v pátek v 19:00?', a: 'Rezervováno, potvrzeno SMS', t: '0:29' },
];
export function CallFeed() {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    const id = setInterval(() => setElapsed(performance.now() - start), 65);
    return () => clearInterval(id);
  }, [reduced]);
  const index = reduced ? 0 : Math.floor(elapsed / 9000) % hovory.length;
  const h = hovory[index];
  const phase = reduced ? 8500 : elapsed % 9000;
  const q = h.q.slice(0, Math.max(0, Math.floor((phase - 700) / 42)));
  const answer = phase >= 3000;
  const done = phase >= 5300;
  return <div className="voice-experience" aria-label="Ukázka příchozích hovorů">
    <div className="sphere-topline"><span className="status-dot" />příchozí hovory<span>nonstop</span></div>
    <VoiceSphere speaking={answer && !done} />
    <div className="call-captions">
      <div className="caption-incoming glass-panel"><span className="caption-status"><span className="status-dot"/>příchozí hovor · {h.obor.toLowerCase()}</span><p>„{q || '\u00a0'}“<span className={!reduced && !answer ? 'text-caret' : 'invisible'}>|</span></p></div>
      <div className={`caption-answer glass-panel ${answer ? 'is-visible' : ''}`}><span className="caption-status">Recepční</span><p>{h.a}</p><span className={`call-complete ${done ? 'is-visible' : ''}`}><span className="status-dot"/>vyřízeno · {h.t}</span></div>
    </div>
    <div className="voice-cycle" aria-hidden="true">{hovory.map((_, i) => <span key={i} className={i === index ? 'active' : ''} />)}</div>
  </div>;
}
