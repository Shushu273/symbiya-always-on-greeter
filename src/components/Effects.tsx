import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return <motion.div className={`reveal ${className}`} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65 }}>{children}</motion.div>;
}
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e: MouseEvent) => { if (ref.current) { ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; ref.current.style.opacity = '1'; } };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
export function CallCurve() {
  return <div className="call-curve" aria-hidden="true"><div className="curve-label"><span className="status-dot" />tohle bere recepční</div><svg viewBox="0 0 560 190" fill="none"><defs><linearGradient id="curve-color"><stop stopColor="var(--primary)"/><stop offset="1" stopColor="var(--gold)"/></linearGradient></defs><path className="curve-grid" d="M0 45H560M0 95H560M0 145H560M80 0V190M160 0V190M240 0V190M320 0V190M400 0V190M480 0V190"/><path className="curve-line" d="M0 155C20 155 28 145 40 148S62 175 78 112S98 24 117 72S140 159 171 153S200 136 217 150S244 175 268 112S286 28 305 70S329 155 357 143S383 111 409 135S447 160 475 128S497 106 518 140S543 154 560 150" stroke="url(#curve-color)"/><path className="curve-base" d="M0 188H560"/></svg><div className="curve-times"><span>noc</span><span>poledne</span><span>večer</span></div></div>;
}
