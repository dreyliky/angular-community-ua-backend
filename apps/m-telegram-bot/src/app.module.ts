import { EnvModule } from '@acua/shared/env';
import { LoggerModule } from '@acua/shared/logger';
import { TokenMS, TokenMicroserviceModule } from '@acua/shared/m-token';
import { UserMS, UserMicroserviceModule } from '@acua/shared/m-user';
import { MongoModule } from '@acua/shared/mongo';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageHandlerFactory } from './classes';
import { TELEGRAM_BOT_PROVIDER } from './providers';
import {
    ReviewRequestApi,
    ReviewRequestMessageDocService,
    ReviewRequestMessageService
} from './review-request';

@Module({
    imports: [
        EnvModule,
        MongoModule.forRoot(),
        LoggerModule,
        HttpModule,
        UserMicroserviceModule,
        TokenMicroserviceModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        UserMS,
        TokenMS,
        MessageHandlerFactory,
        TELEGRAM_BOT_PROVIDER,
        ReviewRequestApi,
        ReviewRequestMessageService,
        ReviewRequestMessageDocService
    ]
})
export class AppModule {
    constructor(appService: AppService) {
        appService.init();
    }
}
