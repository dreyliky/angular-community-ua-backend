import { NestFactory } from '@nestjs/core';
import { EnvironmentKeyEnum } from './core';
import { TelegramBotModule } from './telegram-bot.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(TelegramBotModule);

    await app.listen(process.env[EnvironmentKeyEnum.Port]);
}

bootstrap();
