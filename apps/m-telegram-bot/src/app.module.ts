import { LoggerModule } from '@acua/shared/logger';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TELEGRAM_BOT_PROVIDER } from './providers';
import { MessageHandlerFactory } from './services';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        LoggerModule
    ],
    providers: [AppService, MessageHandlerFactory, TELEGRAM_BOT_PROVIDER]
})
export class AppModule {}
