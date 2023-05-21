import { EnvModule } from '@acua/shared/env';
import { LoggerModule } from '@acua/shared/logger';
import { TelegramBotMicroserviceModule } from '@acua/shared/m-telegram-bot';
import { TokenMicroserviceModule } from '@acua/shared/m-token';
import { UserMicroserviceModule } from '@acua/shared/m-user';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { CommentsModule } from './comments';
import { ReviewRequestModule } from './review-request';
import { SourceCodeModule } from './source-code';

@Module({
    imports: [
        EnvModule,
        MongoModule.forRoot(),
        LoggerModule,
        SwaggerModule,
        SourceCodeModule,
        ReviewRequestModule,
        UserMicroserviceModule,
        TokenMicroserviceModule,
        TelegramBotMicroserviceModule,
        CommentsModule
    ]
})
export class AppModule {}
