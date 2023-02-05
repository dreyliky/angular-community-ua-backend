import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeReviewService {
  getHello(): string {
    return 'code-review ACUA backend!';
  }
}
