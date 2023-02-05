import { NestFactory } from '@nestjs/core';
import { TelegramBotModule } from './telegram-bot.module';

const port = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(TelegramBotModule);

  await app.listen(port);
}

bootstrap();
