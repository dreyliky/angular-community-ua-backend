import { MICROSERVICE_ENVIRONMENT_KEY } from '@acua/shared';
import { LoggerModule } from '@acua/shared/logger';
import { TokenMicroserviceModule } from '@acua/shared/token-microservice';
import { UserMicroserviceModule } from '@acua/shared/user-microservice';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';
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
        UserMicroserviceModule.forRoot({
            host: process.env[MICROSERVICE_ENVIRONMENT_KEY.UserHost],
            port: +process.env[MICROSERVICE_ENVIRONMENT_KEY.UserPort]
        }),
        TokenMicroserviceModule.forRoot({
            host: process.env[MICROSERVICE_ENVIRONMENT_KEY.TokenHost],
            port: +process.env[MICROSERVICE_ENVIRONMENT_KEY.TokenPort]
        })
    ],
    controllers: [AppController]
})
export class AppModule {}
