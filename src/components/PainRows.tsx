import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Effects';

const pains: [string, string, string][] = [
  ['Nezvednutý hovor = zakázka u konkurence.', 'Kdo se nedovolá, nezkouší to znovu.', 'Sára zvedne do pár vteřin, i v noci.'],
  ['Telefonujete při práci.', 'Přerušený střih, ošetření, jízda – a chyby z nepozornosti.', 'Pracujete v klidu, Sára objedná.'],
  ['Prázdná místa a no-show.', 'Zrušený termín, který už nikdo nezaplní.', 'Připomínka SMS a nabídka uvolněného místa dalším.'],
  ['Večery a víkendy.', 'Nejvíc lidí volá, když máte zavřeno.', 'Sára má otevřeno nonstop.'],
  ['Papíry a účtenky.', 'Večery nad krabicí dokladů místo s rodinou.', 'Vyfotíte účtenku, Sára ji přepíše do Excelu.'],
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: .09, delayChildren: .05 } } };
const row: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .5, ease: 'easeOut' } } };

export function PainRows() {
  const reduced = useReducedMotion();
  return (
    <section className="section-dark section-space pain-section" aria-labelledby="pali">
      <div className="page-width">
        <Reveal>
          <div className="section-heading">
            <h2 id="pali">Telefon zvoní vždycky, když se to nehodí<span className="text-primary">.</span></h2>
            <span className="section-marker" aria-hidden="true">↘</span>
          </div>
        </Reveal>
        <motion.ul className="pain-list" {...(reduced ? {} : { variants: container, initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, amount: .15 } })}>
          {pains.map(([pain, cost, fix]) => (
            <motion.li className="pain-row" {...(reduced ? {} : { variants: row })} key={pain}>
              <h3>{pain}</h3>
              <p className="pain-cost">{cost}</p>
              <p className="pain-fix"><ArrowRight size={16} aria-hidden="true" />{fix}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
