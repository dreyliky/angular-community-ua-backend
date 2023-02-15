import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './mongo';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        MongoModule
    ],
    controllers: [TelegramBotController],
    providers: [TelegramBotService]
})
export class TelegramBotModule {}
