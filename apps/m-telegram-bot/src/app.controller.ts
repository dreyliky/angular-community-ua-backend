import { CommandEnum } from '@acua/common/m-telegram-bot';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ReviewRequestDto } from './interfaces';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(CommandEnum.ReviewRequestCreated)
    public onReviewRequestCreated(data: ReviewRequestDto): Promise<string> {
        console.log(data);

        return null;
    }
}
