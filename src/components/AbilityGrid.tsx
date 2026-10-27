import { motion, type Variants } from 'framer-motion';
import { usePrefersReducedMotion } from './Effects';
import { ArrowLeftRight, CalendarCheck, ClipboardList, Clock, FileSpreadsheet, Fingerprint, MessageCircle, MessageSquareText, PhoneForwarded, type LucideIcon } from 'lucide-react';

const ability: { icon: LucideIcon; title: string; text: string; state: string }[] = [
  { icon: CalendarCheck, title: 'Kalendář', text: 'Zapíše termín rovnou do vašeho kalendáře, bez dvojích rezervací.', state: 'čt 14:30 · obsazeno ✓' },
  { icon: MessageSquareText, title: 'SMS potvrzení', text: 'Hned po hovoru pošle zákazníkovi potvrzení a den předem připomínku.', state: 'sms odeslána · 0:02' },
  { icon: MessageCircle, title: 'WhatsApp', text: 'Odpovídá i na WhatsAppu, přes oficiální WhatsApp Business API.', state: 'whatsapp · odpověď za 30 s' },
  { icon: Fingerprint, title: 'Pamatuje si zákazníky', text: 'Pozná stálého zákazníka podle čísla, ví, co si dával minule a ke komu chodí.', state: 'stálý zákazník · 7. návštěva' },
  { icon: ArrowLeftRight, title: 'Přeobjednání a storna', text: 'Zákazník nemůže? Sára termín přesune nebo zruší a uvolněné místo hned nabídne dál.', state: 'přesunuto · pá 10:00' },
  { icon: Clock, title: 'Volné termíny', text: 'Aktivně nabízí nevyužité časy, aby vám nezůstávala prázdná křesla.', state: '3 volná okna zítra' },
  { icon: ClipboardList, title: 'Ranní report', text: 'Každé ráno shrnutí: kdo volal, co se domluvilo a co čeká na vás.', state: 'report · 7:00' },
  { icon: PhoneForwarded, title: 'Předá člověku', text: 'Reklamace, výjimky nebo cokoli mimo pravidla předá vám s krátkým shrnutím.', state: 'předáno · 1 úkol' },
  { icon: FileSpreadsheet, title: 'Účtenky do Excelu', text: 'Vyfotíte účtenku nebo fakturu, Sára ji přepíše do tabulky pro účetní.', state: 'účtenka → řádek 214 ✓' },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: .07, delayChildren: .08 } } };
const item: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .55, ease: 'easeOut' } } };

export function AbilityGrid() {
  const reduced = usePrefersReducedMotion();
  return <motion.ul className="ability-grid" {...(reduced ? {} : { variants: container, initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, amount: .12 } })}>
    {ability.map(({ icon: Icon, title, text, state }) => <motion.li className="ability-card" {...(reduced ? {} : { variants: item })} key={title}>
      <span className="ability-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5}/></span>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="ability-state"><i className="status-dot" aria-hidden="true"/>{state}</span>
    </motion.li>)}
  </motion.ul>;
}
