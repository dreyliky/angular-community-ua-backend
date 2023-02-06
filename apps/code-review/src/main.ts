import { NestFactory } from '@nestjs/core';
import { CodeReviewModule } from './code-review.module';

const port = process.env.PORT ?? 3000;

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(CodeReviewModule, {
        cors: { origin: '*' }
    });

    await app.listen(port);
}

bootstrap();
