import { LoggerModule } from '@acua/shared/logger';
import { TokenMicroserviceModule } from '@acua/shared/m-token';
import { UserMicroserviceModule } from '@acua/shared/m-user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { CommentsModule } from './comments';
import { ReviewRequestModule } from './review-request';
import { SourceCodeModule } from './source-code';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        LoggerModule,
        SwaggerModule,
        SourceCodeModule,
        ReviewRequestModule,
        UserMicroserviceModule,
        TokenMicroserviceModule,
        CommentsModule
    ],
    controllers: [AppController]
})
export class AppModule {}
