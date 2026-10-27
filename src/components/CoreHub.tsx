import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { saraPhoto } from '@/data/photos';
import { Reveal } from './Effects';

const nodes = [
  { label: 'Telefon', x: 13, y: 16 },
  { label: 'WhatsApp', x: 50, y: 4 },
  { label: 'Kalendář', x: 87, y: 16 },
  { label: 'SMS', x: 13, y: 84 },
  { label: 'Excel / účetnictví', x: 50, y: 96 },
  { label: 'Ranní report', x: 87, y: 84 },
];

const lineVar: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({ pathLength: 1, opacity: 1, transition: { duration: .9, delay: .15 + i * .12, ease: 'easeOut' } }),
};
const nodeVar: Variants = {
  hidden: { opacity: 0, scale: .85 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { duration: .45, delay: .3 + i * .12 } }),
};

export function CoreHub() {
  const reduced = useReducedMotion();
  const lineProps = (i: number) => reduced ? {} : { custom: i, variants: lineVar, initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, amount: .3 } };
  const nodeProps = (i: number) => reduced ? {} : { custom: i, variants: nodeVar, initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, amount: .3 } };
  return (
    <section className="section-dark section-space hub-section" aria-labelledby="jadro">
      <Reveal className="page-width">
        <div className="section-heading">
          <h2 id="jadro">Sára není jen recepce.<br /><span className="text-muted-foreground">Je to jádro vaší firmy.</span></h2>
          <span className="section-marker" aria-hidden="true">↘</span>
        </div>
        <div className="hub-map">
          <svg className="hub-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {nodes.map((n, i) => (
              <motion.line key={n.label} x1={50} y1={50} x2={n.x} y2={n.y} {...lineProps(i)} />
            ))}
          </svg>
          <div className="hub-center">
            <img src={saraPhoto.src} srcSet={saraPhoto.srcSet} sizes="150px" width={150} height={150} alt="Sára, AI recepční" loading="lazy" decoding="async" />
            <span className="mono">sára · jádro</span>
          </div>
          {nodes.map((n, i) => (
            <motion.span key={n.label} className="hub-node" style={{ left: `${n.x}%`, top: `${n.y}%` }} {...nodeProps(i)}>{n.label}</motion.span>
          ))}
        </div>
        <p className="hub-note">Jedno místo, kde se sejde všechno, co dnes držíte v hlavě.</p>
      </Reveal>
    </section>
  );
}
