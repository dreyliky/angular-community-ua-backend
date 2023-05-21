import { EnvModule } from '@acua/shared/env';
import { LoggerModule } from '@acua/shared/logger';
import { UserMS, UserMicroserviceModule } from '@acua/shared/m-user';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageHandlerFactory } from './classes';
import { TELEGRAM_BOT_PROVIDER } from './providers';
import {
    ReviewRequestMessageDocService,
    ReviewRequestMessageService
} from './review-request/services';

@Module({
    imports: [EnvModule, MongoModule.forRoot(), LoggerModule, UserMicroserviceModule],
    controllers: [AppController],
    providers: [
        AppService,
        UserMS,
        MessageHandlerFactory,
        TELEGRAM_BOT_PROVIDER,
        ReviewRequestMessageService,
        ReviewRequestMessageDocService
    ]
})
export class AppModule {
    constructor(appService: AppService) {
        appService.init();
    }
}
