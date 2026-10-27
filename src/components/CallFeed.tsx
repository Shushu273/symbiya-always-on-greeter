import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from './Effects';
import { useHydrated } from '@tanstack/react-router';
import { obory } from '@/data/obory';

const hovory = obory.map(o => ({ obor: o.nazev, q: o.prepis.find(r => r.kdo === 'klient')?.text ?? '', a: o.prepis.filter(r => r.kdo === 'recepce').at(-1)?.text ?? '' }));
export function CallFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 45, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 45, damping: 20 });
  const preference = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const reduced = hydrated && preference;
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (preference) return;
    let visible = true;
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; });
    if (ref.current) observer.observe(ref.current);
    const id = setInterval(() => { if (visible && !document.hidden) setElapsed(t => t + 80); }, 80);
    return () => { clearInterval(id); observer.disconnect(); };
  }, [preference]);
  useEffect(() => {
    if (preference || !window.matchMedia('(pointer: fine) and (min-width: 761px)').matches) return;
    const move = (event: MouseEvent) => { pointerX.set((event.clientX / window.innerWidth - .5) * 18); pointerY.set((event.clientY / window.innerHeight - .5) * 12); };
    const reset = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseout', reset);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseout', reset); reset(); };
  }, [preference, pointerX, pointerY]);
  useEffect(() => {
    if (reduced) { pointerX.set(0); pointerY.set(0); }
  }, [reduced, pointerX, pointerY]);
  const index = reduced ? 0 : Math.floor(elapsed / 9000) % hovory.length;
  const h = hovory[index];
  if (!h) return null;
  const phase = reduced ? 8500 : elapsed % 9000;
  const q = h.q.slice(0, Math.max(0, Math.floor((phase - 700) / 42)));
  const answer = phase >= 3800;
  const done = phase >= 6200;
  return <motion.div ref={ref} className="sara-calls" style={{ x, y }} aria-label="Ukázkový rozhovor s AI recepční">
    <div className="sara-call incoming-call glass-panel"><span className="caption-status"><span className="status-dot"/>příchozí hovor · {h.obor.toLowerCase()}</span><p>„{q || '\u00a0'}“<span className={!reduced && !answer ? 'text-caret' : 'invisible'}>|</span></p></div>
    <div className={`sara-call answer-call glass-panel ${answer ? 'is-visible' : ''}`}><span className="caption-status">Sára · ai recepční</span><p>{h.a}</p><span className={`call-complete ${done ? 'is-visible' : ''}`}><span className="status-dot"/>vyřízeno · 0:38</span></div>
    <div className="sara-call activity-call glass-panel" aria-hidden="true"><span className="audio-signal"><i/><i/><i/><i/><i/><i/><i/></span><span className="mono">linka aktivní</span><span className="voice-cycle">{hovory.map((_, i) => <span key={i} className={i === index ? 'active' : ''} />)}</span></div>
  </motion.div>;
}
