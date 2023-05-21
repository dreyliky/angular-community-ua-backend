import { ReviewRequestDto } from '@acua/shared/code-review';
import { CommandEnum } from '@acua/shared/m-telegram-bot';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ReviewRequestMessageService } from './services';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly reviewRequestMessageService: ReviewRequestMessageService
    ) {}

    @MessagePattern(CommandEnum.ReviewRequestCreated)
    public onReviewRequestCreated(data: ReviewRequestDto): boolean {
        this.reviewRequestMessageService.create(data);

        return true;
    }
}
