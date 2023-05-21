import { DynamicModule, Module, Type } from '@nestjs/common';
import { ModelDefinition, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { MONGO_CONFIG } from './constants';
import { Cr, TgBot, User } from './schemas';

const SCHEMAS: Type<unknown>[] = [
    User,
    Cr.ReviewRequestComment,
    Cr.ReviewRequest,
    Cr.SourceCode,
    TgBot.ReviewRequestTgMessageRef
];

const SCHEMA_MODELS_DEF: ModelDefinition[] = SCHEMAS.map((schema) => {
    return { name: schema.name, schema: SchemaFactory.createForClass(schema) };
});

const MONGOOSE_WITH_MODELS_DEF = MongooseModule.forFeature(SCHEMA_MODELS_DEF);

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
