import { getHttpOptions } from '@acua/shared';
import { HttpExceptionFilter } from '@acua/shared/logger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ENVIRONMENT_KEY } from './core';
import { setupSwagger } from './swagger';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: '*' },
        httpsOptions: getHttpOptions()
    });

    app.useGlobalPipes(new ValidationPipe());

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalFilters(app.get(HttpExceptionFilter));
    setupSwagger(app);

    await app.listen(process.env[ENVIRONMENT_KEY.Port]);
}

bootstrap();
