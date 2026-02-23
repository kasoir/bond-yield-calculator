import {
    generateCashFlows,
    calculateCurrentYield,
    calculateTotalInterest,
    classifyPrice,
    calculateYTM
} from './bond-analytics.js';
import type { BondParameters } from './types.js';

describe('Bond Analytics Engine', () => {
    const standardBond: BondParameters = {
        faceValue: 1000,
        annualCouponRate: 5, // 5% coupon
        marketPrice: 950,    // Discount bond
        yearsToMaturity: 10,
        couponFrequency: 2,  // Semiannual
    };

    const premiumBond: BondParameters = {
        ...standardBond,
        marketPrice: 1050,
    };

    const parBond: BondParameters = {
        ...standardBond,
        marketPrice: 1000,
    };

    const zeroCouponBond: BondParameters = {
        faceValue: 1000,
        annualCouponRate: 0,
        marketPrice: 800,
        yearsToMaturity: 5,
        couponFrequency: 1,  // Usually quoted annually or semi-annually, assuming annual here
    };

    describe('generateCashFlows', () => {
        it('generates the correct number of periods and amounts for a semiannual bond', () => {
            const flows = generateCashFlows(standardBond);
            expect(flows.length).toBe(20);

            // Regular period (e.g. period 1)
            expect(flows[0].period).toBe(1);
            expect(flows[0].amount).toBe(25); // 1000 * 5% / 2
            expect(flows[0].isPrincipal).toBe(false);

            // Last period should include principal
            expect(flows[19].period).toBe(20);
            expect(flows[19].amount).toBe(1025);
            expect(flows[19].isPrincipal).toBe(true);
        });

        it('handles zero coupon bonds correctly', () => {
            const flows = generateCashFlows(zeroCouponBond);
            expect(flows.length).toBe(5);
            expect(flows[0].amount).toBe(0);
            expect(flows[4].amount).toBe(1000);
            expect(flows[4].isPrincipal).toBe(true);
        });
    });

    describe('calculateCurrentYield', () => {
        it('calculates correctly for a discount bond', () => {
            // 50 / 950 * 100 = 5.26315...
            expect(calculateCurrentYield(standardBond)).toBeCloseTo(5.263, 3);
        });

        it('calculates correctly for a premium bond', () => {
            // 50 / 1050 * 100 = 4.7619...
            expect(calculateCurrentYield(premiumBond)).toBeCloseTo(4.762, 3);
        });

        it('calculates correctly for a zero coupon bond', () => {
            expect(calculateCurrentYield(zeroCouponBond)).toBe(0);
        });
    });

    describe('calculateTotalInterest', () => {
        it('calculates correctly', () => {
            // 50 annual coupon * 10 years = 500
            expect(calculateTotalInterest(standardBond)).toBe(500);
            expect(calculateTotalInterest(zeroCouponBond)).toBe(0);
        });
    });

    describe('classifyPrice', () => {
        it('classifies discount correctly', () => {
            expect(classifyPrice(standardBond)).toBe('Discount');
        });

        it('classifies premium correctly', () => {
            expect(classifyPrice(premiumBond)).toBe('Premium');
        });

        it('classifies par correctly', () => {
            expect(classifyPrice(parBond)).toBe('Par');
        });
    });

    describe('calculateYTM', () => {
        it('calculates YTM correctly for a discount bond', () => {
            const ytm = calculateYTM(standardBond);
            // Coupon is 5%, price is 950. YTM should be higher than 5%.
            // Actual YTM for these inputs: approx 5.66%
            expect(ytm).toBeGreaterThan(5.0);
            expect(ytm).toBeCloseTo(5.66, 2);
        });

        it('calculates YTM correctly for a premium bond', () => {
            const ytm = calculateYTM(premiumBond);
            // Coupon is 5%, price is 1050. YTM should be lower than 5%.
            // Actual YTM for these inputs: approx 4.38%
            expect(ytm).toBeLessThan(5.0);
            expect(ytm).toBeCloseTo(4.38, 2);
        });

        it('calculates YTM correctly for a par bond (YTM = Coupon Rate)', () => {
            const ytm = calculateYTM(parBond);
            expect(ytm).toBeCloseTo(5.0, 5);
        });

        it('calculates YTM correctly for a zero coupon bond', () => {
            const ytm = calculateYTM(zeroCouponBond);
            // Price = 800, Face = 1000, 5 years. YTM = (1000/800)^(1/5) - 1 = 0.04564 = 4.564%
            expect(ytm).toBeCloseTo(4.564, 3);
        });
    });
});
