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
            host: process.env['M_USER_HOST'],
            port: +process.env['M_USER_PORT']
        }),
        TokenMicroserviceModule.forRoot({
            host: process.env['M_TOKEN_HOST'],
            port: +process.env['M_TOKEN_PORT']
        })
    ],
    controllers: [AppController]
})
export class AppModule {}
