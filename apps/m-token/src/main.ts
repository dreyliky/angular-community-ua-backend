import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ENVIRONMENT_KEY } from './data';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env[ENVIRONMENT_KEY.Host],
            port: +process.env[ENVIRONMENT_KEY.Port]
        }
    });

    await app.listen();
}
bootstrap();
