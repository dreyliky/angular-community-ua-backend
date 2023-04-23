import { AuthGuard } from '@acua/shared/m-token';
import { User, UserSchema } from '@acua/shared/m-user/schemas';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewRequestController } from './review-request.controller';
import { ReviewRequest, ReviewRequestSchema } from './schemas';
import { ReviewRequestDocumentService, ReviewRequestDtoService } from './services';
import { SourceUrlValidator } from './validators';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: ReviewRequest.name, schema: ReviewRequestSchema }
        ]),
        MongoModule
    ],
    controllers: [ReviewRequestController],
    providers: [
        ReviewRequestDocumentService,
        ReviewRequestDtoService,
        SourceUrlValidator,
        AuthGuard
    ]
})
export class ReviewRequestModule {}
