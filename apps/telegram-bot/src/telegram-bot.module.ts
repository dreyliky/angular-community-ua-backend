import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login';
import { MongoModule } from './mongo';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        LoginModule,
        MongoModule
    ],
    controllers: [TelegramBotController],
    providers: [TelegramBotService]
})
export class TelegramBotModule {}
