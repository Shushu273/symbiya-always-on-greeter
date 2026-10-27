import { describe, expect, it } from 'vitest';
import { OFFER, mailPro } from '@/data/offer';

describe('Sára PRO', () => {
  it('cena PRO je 14 990 Kč bez slevy', () => {
    expect(OFFER.pricePro).toBe(14990);
  });
  it('PRO má vlastní e-mail s předmětem Sára PRO', () => {
    expect(mailPro).toContain('hello@symbiya.com');
    expect(mailPro).toContain(encodeURIComponent('Sára PRO'));
  });
  it('zaváděcí sleva platí jen pro Sáru, ne PRO', () => {
    expect(OFFER.priceIntro).toBe(OFFER.priceFull / 2);
    expect(OFFER.pricePro).toBeGreaterThan(OFFER.priceFull);
  });
});
