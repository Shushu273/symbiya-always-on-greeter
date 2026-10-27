import { MAIL } from './obory';

export const OFFER = {
  slotsTotal: 10,
  slotsLeft: 10,
  priceFull: 4990,
  priceIntro: 2495,
} as const;

export const mailPilot = `mailto:${MAIL}?subject=${encodeURIComponent('Pilot SYMBIYA')}`;

export const ZAKAZKA_PRESETS: { slug: string; label: string; value: number }[] = [
  { slug: 'barbershopy', label: 'Barbershop', value: 700 },
  { slug: 'kosmeticke-salony', label: 'Kosmetika', value: 1200 },
  { slug: 'kliniky', label: 'Klinika', value: 1500 },
  { slug: 'gastro', label: 'Gastro', value: 900 },
  { slug: 'stavebnictvi', label: 'Stavebnictví', value: 25000 },
  { slug: 'doprava', label: 'Doprava', value: 8000 },
];

export const presetForObor = (slug: string) => ZAKAZKA_PRESETS.find((p) => p.slug === slug)?.value;

export const monthlyLoss = (missed: number, sharePct: number, value: number) =>
  Math.round(missed * 4.33 * (sharePct / 100) * value);

export const paybackJobs = (value: number) => Math.max(1, Math.ceil(OFFER.priceIntro / Math.max(1, value)));

export const roiMultiple = (loss: number) => loss / OFFER.priceIntro;
