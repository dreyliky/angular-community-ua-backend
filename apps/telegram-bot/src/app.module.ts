import { LoggerModule } from '@acua/shared/logger';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotModule } from '@telegram-bot/bot';

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
