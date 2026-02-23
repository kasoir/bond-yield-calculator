import type { BondParameters, CashFlow, PriceClassification } from './types.js';
import { newtonRaphson } from './math.js';

/**
 * Generates the full schedule of cash flows for the life of the bond.
 * 
 * @param params The core bond parameters
 * @returns An ordered array of cash flows per period
 */
export function generateCashFlows(params: BondParameters): CashFlow[] {
    const { faceValue, annualCouponRate, yearsToMaturity, couponFrequency } = params;

    // Coupon Payment formula: F * (C / 100) / freq
    const couponPayment = faceValue * (annualCouponRate / 100) / couponFrequency;

    // Total periods formula: years * freq
    const numPeriods = Math.round(yearsToMaturity * couponFrequency);

    const cashFlows: CashFlow[] = [];

    for (let t = 1; t <= numPeriods; t++) {
        const isPrincipal = t === numPeriods;
        cashFlows.push({
            period: t,
            amount: couponPayment + (isPrincipal ? faceValue : 0),
            isPrincipal,
        });
    }

    return cashFlows;
}

/**
 * Calculates the current yield.
 * Current Yield measures the annual return based on the market price.
 * 
 * @param params The core bond parameters
 * @returns The current yield as an annualized percentage
 */
export function calculateCurrentYield(params: BondParameters): number {
    const { faceValue, annualCouponRate, marketPrice } = params;
    const annualCoupon = faceValue * (annualCouponRate / 100);

    // Return early to prevent division by zero or negative price edge cases
    if (marketPrice <= 0) {
        return 0;
    }

    return (annualCoupon / marketPrice) * 100;
}

/**
 * Calculates the total nominal interest earned over the life of the bond.
 * 
 * @param params The core bond parameters
 * @returns The total sum of all coupon payments
 */
export function calculateTotalInterest(params: BondParameters): number {
    const { faceValue, annualCouponRate, yearsToMaturity } = params;
    const annualCoupon = faceValue * (annualCouponRate / 100);
    return annualCoupon * yearsToMaturity;
}

/**
 * Classifies whether the bond is trading at a Premium, Discount, or Par.
 * 
 * @param params The core bond parameters
 * @returns The price classification
 */
export function classifyPrice(params: BondParameters): PriceClassification {
    // Floating point precision buffer
    const epsilon = 1e-10;

    if (params.marketPrice > params.faceValue + epsilon) {
        return 'Premium';
    } else if (params.marketPrice < params.faceValue - epsilon) {
        return 'Discount';
    } else {
        return 'Par';
    }
}

/**
 * Calculates the Yield to Maturity (YTM) numerically.
 * 
 * YTM is the internal rate of return (IRR) of the bond's cash flows
 * if held to maturity. This mathematically solves for the rate that makes
 * the present value of all future cash flows equal to the market price.
 * 
 * @param params The core bond parameters
 * @returns The Yield to Maturity as an annualized percentage
 */
export function calculateYTM(params: BondParameters): number {
    const { faceValue, annualCouponRate, marketPrice, yearsToMaturity, couponFrequency } = params;

    if (yearsToMaturity <= 0) {
        return 0; // Bond has matured
    }

    const couponPayment = faceValue * (annualCouponRate / 100) / couponFrequency;
    const numPeriods = Math.round(yearsToMaturity * couponFrequency);

    /**
     * Price function P(r) based on yield per period `r`
     * Target: f(r) = P(r) - marketPrice = 0
     */
    const f = (r: number): number => {
        let pv = 0;
        for (let t = 1; t <= numPeriods; t++) {
            pv += couponPayment / Math.pow(1 + r, t);
        }
        pv += faceValue / Math.pow(1 + r, numPeriods);
        return pv - marketPrice;
    };

    /**
     * First derivative of the price function with respect to r
     */
    const df = (r: number): number => {
        let dpv = 0;
        for (let t = 1; t <= numPeriods; t++) {
            dpv -= (t * couponPayment) / Math.pow(1 + r, t + 1);
        }
        dpv -= (numPeriods * faceValue) / Math.pow(1 + r, numPeriods + 1);
        return dpv;
    };

    // Approximate Yield to Maturity (per period) as an initial guess:
    // (Coupon + (Face - Price) / Periods) / ((Face + Price) / 2)
    let initialGuess = (couponPayment + (faceValue - marketPrice) / numPeriods) / ((faceValue + marketPrice) / 2);

    // Guard against division-by-zero or invalid approximations (e.g., zero coupon and zero price)
    if (isNaN(initialGuess) || !isFinite(initialGuess)) {
        initialGuess = 0.05 / couponFrequency;
    }

    // 1e-7 tolerance offers excellent precision for financial calculations
    const tolerance = 1e-7;
    const ratePerPeriod = newtonRaphson(f, df, initialGuess, tolerance);

    // Convert the numerical per-period rate back to an annualized percentage
    return ratePerPeriod * couponFrequency * 100;
}
