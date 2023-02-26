import { LoggerModule } from '@acua/shared/logger';
import { MongoModule } from '@acua/shared/mongo';
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
        MongoModule,
        TelegramBotModule
    ]
})
export class AppModule {}
