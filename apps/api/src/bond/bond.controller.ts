import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { BondService } from './bond.service.js';
import { CalculateBondDto } from './dto/calculate-bond.dto.js';

@Controller('bond')
export class BondController {
    constructor(private readonly bondService: BondService) { }

    @Post('calculate')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    calculate(@Body() calculateBondDto: CalculateBondDto): any {
        return this.bondService.calculateAnalytics(calculateBondDto);
    }
}
