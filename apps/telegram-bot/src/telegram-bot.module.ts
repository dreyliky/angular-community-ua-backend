import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${process.cwd()}/apps/telegram-bot/envs/.env`],
            isGlobal: true
        })
    ],
    controllers: [TelegramBotController],
    providers: [TelegramBotService]
})
export class TelegramBotModule {}
