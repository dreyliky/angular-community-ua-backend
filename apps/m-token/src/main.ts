import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ENVIRONMENT_KEY } from './data';
import { MTokenModule } from './m-token.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        MTokenModule,
        {
            transport: Transport.TCP,
            options: {
                host: '0.0.0.0',
                port: +process.env[ENVIRONMENT_KEY.Port]
            }
        }
    );

    await app.listen();
}
bootstrap();
