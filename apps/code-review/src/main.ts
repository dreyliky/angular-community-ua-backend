import { HttpExceptionFilter } from '@acua/shared/logger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENVIRONMENT_KEY } from './core';
import { setupSwagger } from './swagger';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: '*' }
    });

    app.useGlobalFilters(app.get(HttpExceptionFilter));
    setupSwagger(app);

    await app.listen(process.env[ENVIRONMENT_KEY.Port]);
}

bootstrap();
