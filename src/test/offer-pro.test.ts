import { describe, expect, it } from 'vitest';
import { OFFER, mailPro } from '@/data/offer';

describe('Sára PRO', () => {
  it('cena PRO je od 99 000 Kč nasazení a od 14 990 Kč měsíčně, bez slevy', () => {
    expect(OFFER.proSetup).toBe(99000);
    expect(OFFER.proMonthly).toBe(14990);
  });
  it('PRO má vlastní e-mail s předmětem Sára PRO', () => {
    expect(mailPro).toContain('hello@symbiya.com');
    expect(mailPro).toContain(encodeURIComponent('Sára PRO'));
  });
  it('zaváděcí sleva platí jen na nasazení Sáry, ne na paušál ani PRO', () => {
    expect(OFFER.setupIntro).toBe(OFFER.setupFull / 2);
    expect(OFFER.monthly).toBe(4990);
    expect(OFFER.proMonthly).toBeGreaterThan(OFFER.monthly);
  });
});
