import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal } from './Effects';
import { OFFER, ZAKAZKA_PRESETS, mailPilot, monthlyLoss, paybackJobs, presetForObor, roiMultiple } from '@/data/offer';

const fmt = new Intl.NumberFormat('cs-CZ');
const fmtKc = (n: number) => `${fmt.format(n)} Kč`;

function useAnimatedNumber(target: number, reduced: boolean | null) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    if (reduced || from === target) { setDisplay(target); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 550);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced]);
  return display;
}

export function Calculator({ preset }: { preset?: string | undefined }) {
  const reduced = useReducedMotion();
  const [missed, setMissed] = useState(15);
  const [share, setShare] = useState(30);
  const [value, setValue] = useState(() => presetForObor(preset ?? '') ?? 700);
  const [active, setActive] = useState<string | undefined>(() => (presetForObor(preset ?? '') ? preset : undefined));

  const loss = monthlyLoss(missed, share, value);
  const jobs = paybackJobs(value);
  const roi = roiMultiple(loss);

  const lossA = useAnimatedNumber(loss, reduced);
  const jobsA = useAnimatedNumber(jobs, reduced);
  const roiA = useAnimatedNumber(Math.round(roi * 10), reduced);

  return (
    <section className="section-dark section-space calc-section" aria-labelledby="kalkulacka">
      <Reveal className="page-width">
        <div className="section-heading">
          <h2 id="kalkulacka">Kolik vás stojí nezvednutý telefon<span className="text-primary">?</span></h2>
          <span className="section-marker" aria-hidden="true">↘</span>
        </div>
        <div className="glass-panel calc-panel">
          <div className="calc-inputs">
            <div className="calc-presets" role="group" aria-label="Předvolby oborů">
              {ZAKAZKA_PRESETS.map((p) => (
                <button key={p.slug} type="button" className={`calc-preset${active === p.slug ? ' active' : ''}`} onClick={() => { setValue(p.value); setActive(p.slug); }}>{p.label}</button>
              ))}
            </div>
            <div className="calc-field">
              <label htmlFor="calc-missed">Zmeškané hovory týdně <output>{missed}</output></label>
              <input id="calc-missed" type="range" min={0} max={100} value={missed} onChange={(e) => setMissed(+e.target.value)} />
            </div>
            <div className="calc-field">
              <label htmlFor="calc-share">Kolik z nich by se stalo zakázkou <output>{share} %</output></label>
              <input id="calc-share" type="range" min={5} max={80} value={share} onChange={(e) => setShare(+e.target.value)} />
            </div>
            <div className="calc-field">
              <label htmlFor="calc-value">Průměrná zakázka</label>
              <span className="calc-value-wrap">
                <input id="calc-value" type="number" min={1} step={50} value={value} onChange={(e) => { setValue(Math.max(1, Math.round(+e.target.value || 1))); setActive(undefined); }} />
                <span className="mono">Kč</span>
              </span>
            </div>
          </div>
          <div className="calc-output">
            <div>
              <span className="calc-out-label">ztráta měsíčně</span>
              <strong className="calc-loss">{fmtKc(lossA)}</strong>
            </div>
            <div>
              <span className="calc-out-label">sára stojí</span>
              <p className="calc-price"><s>{fmtKc(OFFER.priceFull)} / měs.</s><strong>{fmtKc(OFFER.priceIntro)}</strong> v zaváděcí nabídce</p>
            </div>
            <div>
              <span className="calc-out-label">zaplatí se po</span>
              <p className="calc-line"><strong>{jobsA}</strong> zachráněných zakázkách</p>
            </div>
            <div>
              <span className="calc-out-label">návratnost</span>
              <p className="calc-line"><strong className="calc-roi">{fmt.format(roiA / 10)} ×</strong></p>
            </div>
            <p className="calc-note">Modelový výpočet z vašich čísel, ne garance.</p>
            <Button asChild><a href={mailPilot}>Chci to zkusit na své firmě<ArrowUpRight size={17} /></a></Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
