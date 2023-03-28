import { M_TOKEN_PROVIDER, M_USER_PROVIDER } from '@acua/shared';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'apps/m-user/src/schemas';
import { ReviewRequestController } from './review-request.controller';
import { CodeReviewRequest, CodeReviewRequestSchema } from './schemas';
import { ReviewRequestService } from './services';
import { SourceUrlValidator } from './validators';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: CodeReviewRequest.name, schema: CodeReviewRequestSchema }
        ]),
        MongoModule
    ],
    controllers: [ReviewRequestController],
    providers: [
        ReviewRequestService,
        SourceUrlValidator,
        M_TOKEN_PROVIDER,
        M_USER_PROVIDER
    ]
})
export class ReviewRequestModule {}
