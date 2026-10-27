import { lazy, Suspense } from 'react';
import { ClientOnly } from '@tanstack/react-router';
const Particles = lazy(() => import('./VoiceParticles'));
export function VoiceSphere({ speaking = false, small = false }: { speaking?: boolean; small?: boolean }) {
  return <div className={`voice-sphere ${small ? 'voice-sphere-small' : ''}`}>
    <div className="sphere-orbit orbit-one" aria-hidden="true" /><div className="sphere-orbit orbit-two" aria-hidden="true" />
    <ClientOnly fallback={<div className="sphere-fallback" />}><Suspense fallback={<div className="sphere-fallback" />}><Particles speaking={speaking} /></Suspense></ClientOnly>
    <div className="sphere-cross cross-top" aria-hidden="true">+</div><div className="sphere-cross cross-bottom" aria-hidden="true">+</div>
  </div>;
}
