import { Injectable } from '@nestjs/common';
import { CalculateBondDto } from './dto/calculate-bond.dto.js';
import {
    generateCashFlows,
    calculateCurrentYield,
    calculateYTM,
    calculateTotalInterest,
    classifyPrice,
    type BondParameters
} from 'bond-engine';

@Injectable()
export class BondService {
    /**
     * Orchestrates the bond-engine to calculate all relevant financial
     * analytics for a given bond and returns them in a structured format.
     * 
     * Note: The logic strictly resides in the pure TypeScript library `bond-engine`.
     * The NestJS service only handles parameter mapping and structuring the response.
     */
    public calculateAnalytics(dto: CalculateBondDto) {
        const params: BondParameters = {
            faceValue: dto.faceValue,
            annualCouponRate: dto.annualCouponRate,
            marketPrice: dto.marketPrice,
            yearsToMaturity: dto.yearsToMaturity,
            couponFrequency: dto.couponFrequency,
        };

        return {
            currentYield: calculateCurrentYield(params),
            ytm: calculateYTM(params),
            totalInterestEarned: calculateTotalInterest(params),
            priceClassification: classifyPrice(params),
            cashFlowSchedule: generateCashFlows(params),
        };
    }
}
