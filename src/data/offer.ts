import { MAIL } from './obory';

export const OFFER = {
  slotsTotal: 10,
  slotsLeft: 10,
  setupFull: 59000,
  setupIntro: 29500,
  monthly: 4990,
  proSetup: 99000,
  proMonthly: 14990,
} as const;

export const mailNasazeni = `mailto:${MAIL}?subject=${encodeURIComponent('Nasazení Sáry')}`;
export const mailPro = `mailto:${MAIL}?subject=${encodeURIComponent('Sára PRO')}`;

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

export const monthlyProfit = (loss: number) => loss - OFFER.monthly;

export const setupPaybackMonths = (loss: number) => {
  const profit = monthlyProfit(loss);
  return profit > 0 ? Math.ceil(OFFER.setupIntro / profit) : null;
};
