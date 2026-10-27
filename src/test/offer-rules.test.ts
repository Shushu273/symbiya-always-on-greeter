import { describe, it, expect } from 'vitest';
import { OFFER, ZAKAZKA_PRESETS, mailNasazeni, monthlyLoss, monthlyProfit, setupPaybackMonths } from '@/data/offer';

describe('Offer rules', () => {
  it('keeps Sára pricing: setup 59 000, intro half 29 500, monthly 4 990 without discount', () => {
    expect(OFFER.setupFull).toBe(59000);
    expect(OFFER.setupIntro).toBe(29500);
    expect(OFFER.setupIntro).toBe(OFFER.setupFull / 2);
    expect(OFFER.monthly).toBe(4990);
  });
  it('keeps Sára PRO pricing without discount', () => {
    expect(OFFER.proSetup).toBe(99000);
    expect(OFFER.proMonthly).toBe(14990);
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
  it('computes monthly profit as loss minus monthly fee', () => {
    expect(monthlyProfit(10000)).toBe(5010);
    expect(monthlyProfit(4990)).toBe(0);
  });
  it('computes setup payback in whole months, honestly null when not profitable', () => {
    expect(setupPaybackMonths(10000)).toBe(Math.ceil(29500 / 5010));
    expect(setupPaybackMonths(4990)).toBeNull();
    expect(setupPaybackMonths(0)).toBeNull();
  });
  it('keeps the booking mail subject', () => {
    expect(mailNasazeni).toBe('mailto:hello@symbiya.com?subject=Nasazen%C3%AD%20S%C3%A1ry');
  });
});
