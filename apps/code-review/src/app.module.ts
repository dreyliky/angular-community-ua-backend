import { TokenMicroserviceModule } from '@acua/common/m-token';
import { UserMicroserviceModule } from '@acua/common/m-user';
import { EnvModule } from '@acua/shared/env';
import { LoggerModule } from '@acua/shared/logger';
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
        CommentsModule
    ]
})
export class AppModule {}
