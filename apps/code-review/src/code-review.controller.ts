import { Controller, Get } from '@nestjs/common';
import { CodeReviewService } from './code-review.service';

@Controller()
export class CodeReviewController {
    constructor(private readonly codeReviewService: CodeReviewService) {}

    @Get()
    public getHello(): string {
        return this.codeReviewService.getHello();
    }
}
