import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MTokenModule } from './m-token.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        MTokenModule,
        {
            transport: Transport.TCP
        }
    );

    await app.listen();
}
bootstrap();
