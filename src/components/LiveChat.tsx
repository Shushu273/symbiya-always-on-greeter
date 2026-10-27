import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from './Effects';
import { useHydrated } from '@tanstack/react-router';
import type { Obor } from '@/data/obory';
export function LiveChat({ lines }: { lines: Obor['prepis'] }) {
  const ref = useRef<HTMLOListElement>(null);
  const preference = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const reduced = hydrated && preference;
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { if (entries[0]?.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: .12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!started || reduced || count >= lines.length) return;
    const id = setTimeout(() => setCount(c => c + 1), count === 0 ? 900 : 1600);
    return () => clearTimeout(id);
  }, [started, count, lines.length, reduced]);
  const visible = reduced ? lines.length : count;
  return <ol ref={ref} className="live-chat">{lines.map((r, i) => <li key={i} className={`chat-row ${r.kdo === 'klient' ? 'chat-client' : 'chat-reception'}`}>
    <motion.div className="chat-bubble" initial={false} animate={{ opacity: i < visible ? 1 : 0 }} transition={{ duration: reduced ? 0 : .5 }} aria-hidden={i >= visible}>
      <span className="chat-role">{r.kdo === 'klient' ? 'Volající' : 'Recepční'}</span>{r.text}
    </motion.div>{!reduced && started && i === visible && r.kdo === 'recepce' && <span className="typing-indicator" aria-label="Recepční píše"><i/><i/><i/></span>}
  </li>)}</ol>;
}
