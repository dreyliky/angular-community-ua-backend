import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentKeyEnum } from './core';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: '*' }
    });

    await app.listen(process.env[EnvironmentKeyEnum.Port]);
}

bootstrap();
