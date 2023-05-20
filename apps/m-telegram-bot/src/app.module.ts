import { LoggerModule } from '@acua/shared/logger';
import { TelegramBotModule } from '@m-telegram-bot/bot';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        LoggerModule,
        TelegramBotModule
    ]
})
export class AppModule {}
