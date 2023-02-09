import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environment';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: '*' }
    });

    await app.listen(environment.port);
}

bootstrap();
