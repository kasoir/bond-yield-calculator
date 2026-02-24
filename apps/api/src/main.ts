import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // Add global validation pipe to enforce DTO rules in BondController
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on port ${port}`);
}
bootstrap();
