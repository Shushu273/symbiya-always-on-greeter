import { describe, it, expect } from 'vitest';
import { DEMO_BARBER, DEMO_GASTRO, obory, mailHovor } from '@/data/obory';
describe('Preserved redesign rules', () => {
 it('keeps the barber demo number', () => { expect(DEMO_BARBER.tel).toBe('+420577544795'); expect(DEMO_BARBER.cislo).toBe('+420 577 544 795'); });
 it('keeps the gastro demo number', () => { expect(DEMO_GASTRO.tel).toBe('+420222760297'); expect(DEMO_GASTRO.cislo).toBe('+420 222 760 297'); });
 it('does not add demos for other industries', () => { expect(obory.filter(o => o.demo).map(o => o.slug)).toEqual(['barbershopy', 'gastro']); });
 it('preserves every industry route', () => { expect(obory.map(o => o.slug)).toEqual(['barbershopy','kliniky','kosmeticke-salony','stavebnictvi','doprava','gastro']); });
 it('keeps the 20 minute call contact', () => { expect(mailHovor).toBe('mailto:hello@symbiya.com?subject=Domluvit%2020min%20hovor'); });
});
