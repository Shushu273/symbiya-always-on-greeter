import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import { AUDIO_DEMO_SRC, audioDemoTranscript } from '@/data/audioDemo';

export function useAudioAvailable() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let live = true;
    fetch(AUDIO_DEMO_SRC, { method: 'HEAD' })
      .then((r) => { if (live) setOk(r.ok); })
      .catch(() => {});
    return () => { live = false; };
  }, []);
  return ok;
}

const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function AudioDemo() {
  const available = useAudioAvailable();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!available) return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    setOpen(true);
    if (playing) { el.pause(); } else { void el.play(); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const active = audioDemoTranscript.reduce((acc, l, i) => (time >= l.t ? i : acc), 0);
  const pct = duration ? (time / duration) * 100 : 0;

  return (
    <div className="audio-demo" id="ukazka">
      <Button variant="secondary" onClick={toggle} aria-expanded={open}>
        {playing ? <Pause size={17} /> : <Play size={17} />}
        {playing ? 'Pozastavit ukázku' : 'Přehrát ukázku hovoru'}
      </Button>
      {open && (
        <div className="audio-player glass-panel">
          <div className="audio-top">
            <button type="button" className="audio-toggle" onClick={toggle} aria-label={playing ? 'Pozastavit' : 'Přehrát'}>
              {playing ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <div className="audio-progress" onClick={seek} role="slider" aria-label="Pozice nahrávky" aria-valuemin={0} aria-valuemax={Math.round(duration)} aria-valuenow={Math.round(time)} tabIndex={0}
              onKeyDown={(e) => { const el = audioRef.current; if (!el) return; if (e.key === 'ArrowRight') el.currentTime += 5; if (e.key === 'ArrowLeft') el.currentTime -= 5; }}>
              <i style={{ width: `${pct}%` }} />
            </div>
            <span className="mono audio-time">{fmtTime(time)} / {fmtTime(duration)}</span>
          </div>
          <ol className="audio-transcript">
            {audioDemoTranscript.map((l, i) => (
              <li key={l.t} className={i === active ? 'active' : i < active ? 'done' : ''}>
                <span className="chat-role">{l.kdo}</span>
                <p>{l.text}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
      <audio
        ref={audioRef}
        src={AUDIO_DEMO_SRC}
        preload="metadata"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
