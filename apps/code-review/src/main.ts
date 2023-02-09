import { NestFactory } from '@nestjs/core';
import { CodeReviewModule } from './code-review.module';
import { EnvironmentKeyEnum } from './core';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(CodeReviewModule, {
        cors: { origin: '*' }
    });

    await app.listen(process.env[EnvironmentKeyEnum.Port]);
}

bootstrap();
