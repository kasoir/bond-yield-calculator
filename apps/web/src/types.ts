export interface CashFlow {
    period: number;
    amount: number;
    isPrincipal: boolean;
}

export type PriceClassification = 'Premium' | 'Discount' | 'Par';

export interface BondAnalyticsResponse {
    currentYield: number;
    ytm: number;
    totalInterestEarned: number;
    priceClassification: PriceClassification;
    cashFlowSchedule: CashFlow[];
}

export interface BondParameters {
    faceValue: number;
    annualCouponRate: number;
    marketPrice: number;
    yearsToMaturity: number;
    couponFrequency: 1 | 2;
}
