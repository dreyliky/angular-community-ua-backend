import { MongoModule } from '@acua/shared/mongo';
import { UserModule } from '@acua/shared/user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewRequestController } from './review-request.controller';
import { CodeReviewRequest, CodeReviewRequestSchema } from './schemas';
import { ReviewRequestService } from './services';
import { SourceUrlValidator } from './validators';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: CodeReviewRequest.name, schema: CodeReviewRequestSchema }
        ]),
        MongoModule,
        UserModule
    ],
    controllers: [ReviewRequestController],
    providers: [ReviewRequestService, SourceUrlValidator]
})
export class ReviewRequestModule {}
