import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONFIG } from './constants';
import {
    CrReviewRequest,
    CrReviewRequestComment,
    CrReviewRequestCommentSchema,
    CrReviewRequestSchema,
    CrSourceCode,
    CrSourceCodeSchema,
    MtgbotReviewRequestTgMessageRef,
    MtgbotReviewRequestTgMessageRefSchema,
    User,
    UserSchema
} from './schemas';

const MONGOOSE_WITH_MODELS_DEF = MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: CrReviewRequestComment.name, schema: CrReviewRequestCommentSchema },
    { name: CrReviewRequest.name, schema: CrReviewRequestSchema },
    { name: CrSourceCode.name, schema: CrSourceCodeSchema },
    {
        name: MtgbotReviewRequestTgMessageRef.name,
        schema: MtgbotReviewRequestTgMessageRefSchema
    }
]);

@Module({})
export class MongoModule {
    public static forRoot(): DynamicModule {
        return {
            module: MongoModule,
            imports: [MongooseModule.forRootAsync(MONGO_CONFIG), MONGOOSE_WITH_MODELS_DEF],
            exports: [MongooseModule]
        };
    }

    public static forFeature(): DynamicModule {
        return {
            module: MongoModule,
            imports: [MONGOOSE_WITH_MODELS_DEF],
            exports: [MongooseModule]
        };
    }
}
