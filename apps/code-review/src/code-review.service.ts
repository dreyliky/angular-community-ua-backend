import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeReviewService {
  getHello(): string {
    return 'Hello World!';
  }
}
