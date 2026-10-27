import { describe, it, expect } from 'vitest';
import { OFFER, ZAKAZKA_PRESETS, mailPilot, monthlyLoss, paybackJobs, roiMultiple } from '@/data/offer';

describe('Offer rules', () => {
  it('keeps launch pricing at half of the base price', () => {
    expect(OFFER.priceFull).toBe(4990);
    expect(OFFER.priceIntro).toBe(2495);
  });
  it('limits the launch offer to 10 firms with slots left in range', () => {
    expect(OFFER.slotsTotal).toBe(10);
    expect(OFFER.slotsLeft).toBeLessThanOrEqual(OFFER.slotsTotal);
    expect(OFFER.slotsLeft).toBeGreaterThan(0);
  });
  it('keeps the industry presets from the brief', () => {
    expect(Object.fromEntries(ZAKAZKA_PRESETS.map((p) => [p.slug, p.value]))).toEqual({
      barbershopy: 700,
      'kosmeticke-salony': 1200,
      kliniky: 1500,
      gastro: 900,
      stavebnictvi: 25000,
      doprava: 8000,
    });
  });
  it('computes the model loss as calls x 4.33 x share x value', () => {
    expect(monthlyLoss(15, 30, 700)).toBe(Math.round(15 * 4.33 * 0.3 * 700));
  });
  it('computes payback jobs as ceil of intro price over job value', () => {
    expect(paybackJobs(700)).toBe(4);
    expect(paybackJobs(25000)).toBe(1);
  });
  it('computes roi against the intro price', () => {
    expect(roiMultiple(4990)).toBeCloseTo(2);
  });
  it('keeps the pilot mail subject', () => {
    expect(mailPilot).toBe('mailto:hello@symbiya.com?subject=Pilot%20SYMBIYA');
  });
});
