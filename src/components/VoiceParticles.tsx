import { useEffect, useRef } from 'react';

export default function VoiceParticles({ speaking = false }: { speaking?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const active = useRef(speaking);
  useEffect(() => { active.current = speaking; }, [speaking]);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const style = getComputedStyle(canvas);
    const cyan = style.getPropertyValue('--sphere-cyan').trim();
    const violet = style.getPropertyValue('--sphere-violet').trim();
    const particles = Array.from({ length: 1150 }, (_, i) => {
      const y = 1 - 2 * (i + .5) / 1150;
      const radius = Math.sqrt(1 - y * y);
      const angle = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius, i };
    });
    let frame = 0, visible = true, size = 0;
    const observer = new ResizeObserver(entries => {
      size = entries[0]?.contentRect.width ?? 400;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = size * dpr; canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    });
    const intersection = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; });
    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      const t = reduced ? 0 : time * .00022;
      const radius = size * .355;
      const breathing = 1 + Math.sin(t * 4) * .025;
      const mapped = particles.map(p => {
        const x = p.x * Math.cos(t) + p.z * Math.sin(t);
        const z = p.z * Math.cos(t) - p.x * Math.sin(t);
        const wave = active.current && !reduced ? 1 + Math.sin(p.y * 12 + t * 35) * .065 : 1;
        return { x: size / 2 + x * radius * breathing * wave, y: size / 2 + p.y * radius * breathing * wave, z, i: p.i };
      }).sort((a,b) => a.z - b.z);
      for (const p of mapped) {
        ctx.globalAlpha = .17 + (p.z + 1) * .37;
        ctx.fillStyle = p.x < size * .53 ? cyan : violet;
        ctx.beginPath(); ctx.arc(p.x, p.y, .65 + (p.z + 1) * .55, 0, Math.PI * 2); ctx.fill();
        if (p.i % 3 === 0) {
          ctx.globalAlpha *= .35;
          ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = .5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 5 + p.z * 3, p.y + 2); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }
    function tick(time: number) { if (visible) draw(time); frame = requestAnimationFrame(tick); }
    observer.observe(canvas); intersection.observe(canvas);
    if (!reduced) frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); };
  }, []);
  return <canvas ref={ref} className="voice-particles" aria-hidden="true" />;
}
