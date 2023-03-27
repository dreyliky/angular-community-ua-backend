import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MUserModule } from './m-user.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        MUserModule,
        {
            transport: Transport.TCP
        }
    );

    await app.listen();
}

bootstrap();
