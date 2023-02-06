import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeReviewService {
    public getHello(): string {
        return 'code-review ACUA backend! ' + process.env.PORT;
    }
}
