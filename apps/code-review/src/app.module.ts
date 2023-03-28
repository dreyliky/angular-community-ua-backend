import { LoggerModule } from '@acua/shared/logger';
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
        ReviewRequestModule

    ],
    controllers: [AppController]
})
export class AppModule {}
