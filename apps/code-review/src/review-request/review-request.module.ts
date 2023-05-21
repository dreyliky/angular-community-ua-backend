import { SourceUrlValidator } from '@acua/shared/code-review';
import { AuthGuard } from '@acua/shared/m-token';
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
        ReviewRequestDocumentService,
        ReviewRequestDtoService,
        ReviewRequestSourceCodeService,
        SourceUrlValidator,
        AuthGuard
    ]
})
export class ReviewRequestModule {}
