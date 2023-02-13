import { Controller, Get } from '@nestjs/common';

@Controller()
export class CodeReviewController {
    @Get()
    public getHello(): string {
        return 'code-review backend works!';
    }
}
