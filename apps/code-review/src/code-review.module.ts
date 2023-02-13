import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CodeReviewController } from './code-review.controller';
import { SourceCodeModule } from './source-code';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        SourceCodeModule
    ],
    controllers: [
        CodeReviewController
    ]
})
export class CodeReviewModule {}
