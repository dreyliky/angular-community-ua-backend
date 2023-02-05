import { NestFactory } from '@nestjs/core';
import { CodeReviewModule } from './code-review.module';

async function bootstrap() {
  const app = await NestFactory.create(CodeReviewModule);
  await app.listen(3000);
}
bootstrap();
