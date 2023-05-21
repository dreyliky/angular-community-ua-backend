import { SourceUrlValidator } from '@acua/shared/code-review';
import { TelegramBotMS } from '@acua/shared/m-telegram-bot';
import { AuthGuard } from '@acua/shared/m-token';
import { UserMS } from '@acua/shared/m-user';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { ReviewRequestSourceCodeController } from './controllers';
import { ReviewRequestController } from './review-request.controller';
import {
    ReviewRequestDocumentService,
    ReviewRequestDtoService,
    ReviewRequestSourceCodeService
} from './services';

@Module({
    imports: [MongoModule.forFeature()],
    controllers: [ReviewRequestController, ReviewRequestSourceCodeController],
    providers: [
        UserMS,
        TelegramBotMS,
        ReviewRequestDocumentService,
        ReviewRequestDtoService,
        ReviewRequestSourceCodeService,
        SourceUrlValidator,
        AuthGuard
    ]
})
export class ReviewRequestModule {}
