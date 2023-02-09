import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CodeReviewController } from './code-review.controller';
import { CodeReviewService } from './code-review.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        })
    ],
    controllers: [CodeReviewController],
    providers: [CodeReviewService]
})
export class CodeReviewModule {}
