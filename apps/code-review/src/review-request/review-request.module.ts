import { AuthGuard } from '@acua/shared/m-token';
import { User, UserSchema } from '@acua/shared/m-user/schemas';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    providers: [ReviewRequestService, SourceUrlValidator, AuthGuard]
})
export class ReviewRequestModule {}
