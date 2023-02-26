import { HttpExceptionFilter } from '@acua/shared/logger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENVIRONMENT_KEY } from './core';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(app.get(HttpExceptionFilter));

    await app.listen(process.env[ENVIRONMENT_KEY.Port]);
}

bootstrap();
