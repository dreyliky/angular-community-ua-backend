import { NestFactory } from '@nestjs/core';
import { CodeReviewModule } from './code-review.module';

const port = process.env.PORT ? process.env.PORT : 3000;

async function bootstrap() {
  const app = await NestFactory.create(CodeReviewModule);
  await app.listen(port);
}

bootstrap();
