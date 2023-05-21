import { EnvModule } from '@acua/shared/env';
import { LoggerModule } from '@acua/shared/logger';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageHandlerFactory } from './classes';
import { TELEGRAM_BOT_PROVIDER } from './providers';
import { ReviewRequestMessageService } from './services';

@Module({
    imports: [EnvModule, MongoModule.forRoot(), LoggerModule],
    controllers: [AppController],
    providers: [
        AppService,
        MessageHandlerFactory,
        TELEGRAM_BOT_PROVIDER,
        ReviewRequestMessageService
    ]
})
export class AppModule {}
