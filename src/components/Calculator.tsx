import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal, usePrefersReducedMotion } from './Effects';
import { OFFER, ZAKAZKA_PRESETS, mailNasazeni, monthlyLoss, monthlyProfit, noShowLoss, presetForObor, setupPaybackMonths } from '@/data/offer';

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
  const reduced = usePrefersReducedMotion();
  const [missed, setMissed] = useState(15);
  const [share, setShare] = useState(30);
  const [value, setValue] = useState(() => presetForObor(preset ?? '') ?? 700);
  const [active, setActive] = useState<string | undefined>(() => (presetForObor(preset ?? '') ? preset : undefined));

  const [noShows, setNoShows] = useState(() => (preset === 'stavebnictvi' || preset === 'doprava' ? 0 : 4));
  const [rescued, setRescued] = useState(50);
  const callLoss = monthlyLoss(missed, share, value);
  const chairLoss = noShowLoss(noShows, rescued, value);
  const [adminHours, setAdminHours] = useState(4);
  const [rate, setRate] = useState(500);
  const timeValue = Math.round(adminHours * 4.33 * rate * 0.6);
  const loss = callLoss + chairLoss + timeValue;
  const profit = monthlyProfit(loss);
  const months = setupPaybackMonths(loss);

  const lossA = useAnimatedNumber(loss, reduced);
  const profitA = useAnimatedNumber(profit, reduced);
  const monthsA = useAnimatedNumber(months ?? 0, reduced);

  const mesice = (n: number) => n === 1 ? 'měsíc' : n < 5 ? 'měsíce' : 'měsíců';

  return (
    <section className="section-dark section-space calc-section" aria-labelledby="kalkulacka">
      <Reveal className="page-width">
        <div className="section-heading">
          <h2 id="kalkulacka">Kolik vás stojí operativa, kterou může dělat Sára<span className="text-primary">?</span></h2>
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
              <label htmlFor="calc-noshow">Kolik lidí měsíčně nedorazí nebo zruší na poslední chvíli <output>{noShows}</output></label>
              <input id="calc-noshow" type="range" min={0} max={40} value={noShows} onChange={(e) => setNoShows(+e.target.value)} />
            </div>
            <div className="calc-field">
              <label htmlFor="calc-rescued">Kolik z nich zachrání záloha a čekací listina <output>{rescued} %</output></label>
              <input id="calc-rescued" type="range" min={0} max={90} step={5} value={rescued} onChange={(e) => setRescued(+e.target.value)} />
            </div>
            <div className="calc-field">
              <label htmlFor="calc-admin">Hodiny týdně na zprávy, e-maily a účtenky <output>{adminHours} h</output></label>
              <input id="calc-admin" type="range" min={0} max={30} value={adminHours} onChange={(e) => setAdminHours(+e.target.value)} />
            </div>
            <div className="calc-field">
              <label htmlFor="calc-rate">Kolik má hodnotu vaše hodina</label>
              <span className="calc-value-wrap">
                <input id="calc-rate" type="number" min={0} step={100} value={rate} onChange={(e) => setRate(Math.max(0, Math.round(+e.target.value || 0)))} />
                <span className="mono">Kč / h</span>
              </span>
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
              <span className="calc-out-label">vám měsíčně uniká a Sára může vrátit</span>
              <strong className="calc-loss">{fmtKc(lossA)}</strong>
              <p className="calc-split mono">hovory {fmtKc(callLoss)} · prázdná místa {fmtKc(chairLoss)} · váš čas {fmtKc(timeValue)}</p>
            </div>
            <div>
              <span className="calc-out-label">provoz Sáry</span>
              <p className="calc-line"><strong>{fmtKc(OFFER.monthly)}</strong> / měsíc</p>
            </div>
            <div>
              <span className="calc-out-label">čistě vám zůstane</span>
              {profit > 0
                ? <p className="calc-line"><strong className="calc-roi">{fmtKc(profitA)}</strong> měsíčně</p>
                : <p className="calc-line calc-honest">Při těchto číslech se Sára nevyplatí</p>}
            </div>
            {months !== null && <div>
              <span className="calc-out-label">nasazení ({fmtKc(OFFER.setupIntro)}) se vrátí za</span>
              <p className="calc-line"><strong>{monthsA}</strong> {mesice(monthsA)}</p>
            </div>}
            <p className="calc-note">Modelový výpočet z vašich čísel, ne garance. U času počítáme, že Sára převezme 60 % administrativy. Ceny bez DPH.</p>
            <p className="calc-pro-note">Sára PRO: provoz od {fmt.format(OFFER.proMonthly)} Kč / měsíc</p>
            <Button asChild><a href={mailNasazeni}>Chci to zkusit na své firmě<ArrowUpRight size={17} /></a></Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
