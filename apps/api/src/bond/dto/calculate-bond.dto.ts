import { IsNumber, IsIn, Min, Max, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CalculateBondDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    faceValue!: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    @Type(() => Number)
    annualCouponRate!: number; // Percentage, e.g., 5 for 5%

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    marketPrice!: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    yearsToMaturity!: number;

    @IsIn([1, 2])
    @Type(() => Number)
    couponFrequency!: 1 | 2;
}
