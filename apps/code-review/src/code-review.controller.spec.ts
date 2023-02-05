import { Test, TestingModule } from '@nestjs/testing';
import { CodeReviewController } from './code-review.controller';
import { CodeReviewService } from './code-review.service';

describe('CodeReviewController', () => {
  let codeReviewController: CodeReviewController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CodeReviewController],
      providers: [CodeReviewService],
    }).compile();

    codeReviewController = app.get<CodeReviewController>(CodeReviewController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(codeReviewController.getHello()).toBe('Hello World!');
    });
  });
});
