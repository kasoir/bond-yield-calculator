import { Module } from '@nestjs/common';
import { BondModule } from './bond/bond.module.js';

@Module({
    imports: [BondModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
