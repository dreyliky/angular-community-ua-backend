import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotModule } from '@telegram-bot/bot';
import { MongoModule } from '@telegram-bot/mongo';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        MongoModule,
        TelegramBotModule
    ]
})
export class AppModule {}
