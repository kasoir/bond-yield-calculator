/**
 * Core parameters defining a bond for calculation purposes.
 */
export interface BondParameters {
  /** The face value (par value) of the bond */
  faceValue: number;
  /** The annual coupon rate expressed as a percentage (e.g., 5 for 5%) */
  annualCouponRate: number;
  /** The current market price of the bond */
  marketPrice: number;
  /** Number of years until the bond matures */
  yearsToMaturity: number;
  /** Number of coupon payments per year (1 for annual, 2 for semiannual) */
  couponFrequency: 1 | 2;
}

/**
 * Represents a single cash flow in the bond's schedule.
 */
export interface CashFlow {
  /** The period number (1-indexed) */
  period: number;
  /** The monetary amount of the cash flow in this period */
  amount: number;
  /** Whether this cash flow includes the return of principal */
  isPrincipal: boolean;
}

/**
 * Categorization of the bond's price relative to its face value.
 */
export type PriceClassification = 'Premium' | 'Discount' | 'Par';
