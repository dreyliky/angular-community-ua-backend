import { ReviewRequestDto } from '@acua/shared/code-review';
import { CommandEnum } from '@acua/shared/m-telegram-bot';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReviewRequestMessageService } from './review-request/services';

@Controller()
export class AppController {
    constructor(private readonly reviewRequestMessageService: ReviewRequestMessageService) {}

    @MessagePattern(CommandEnum.ReviewRequestCreated)
    public async onReviewRequestCreated(data: ReviewRequestDto): Promise<boolean> {
        await this.reviewRequestMessageService.create(data);

        return true;
    }
}
