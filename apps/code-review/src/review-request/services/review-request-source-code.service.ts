import { CreationResponseDto } from '@acua/shared';
import {
    ProjectEntity,
    ReviewRequestCreationDto,
    ReviewRequestDto
} from '@acua/shared/code-review';
import { TelegramBotMS } from '@acua/shared/m-telegram-bot';
import { AuthorizedUser } from '@acua/shared/m-user';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import {
    SourceCodeDocumentService,
    SourceCodeDtoService,
    SourceCodeService
} from '../../source-code/services';
import { ReviewRequestDocumentService } from './review-request-document.service';
import { ReviewRequestDtoService } from './review-request-dto.service';

@Injectable()
export class ReviewRequestSourceCodeService {
    private readonly sourceCodeDtoService = this.moduleRef.get(SourceCodeDtoService, {
        strict: false
    });

    private readonly sourceCodeDocumentService = this.moduleRef.get(SourceCodeDocumentService, {
        strict: false
    });

    private readonly sourceCodeService = this.moduleRef.get(SourceCodeService, {
        strict: false
    });

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly reviewRequestDtoService: ReviewRequestDtoService,
        private readonly reviewRequestDocumentService: ReviewRequestDocumentService,
        private readonly telegramBotMS: TelegramBotMS
    ) {}

    public get(reviewRequestId: string): Promise<ProjectEntity[]> {
        return this.sourceCodeDtoService.get(reviewRequestId);
    }

    // FIXME: Refactor
    public async downloadAndSaveToDb(
        user: AuthorizedUser,
        data: ReviewRequestCreationDto
    ): Promise<CreationResponseDto> {
        const sourceCode = await firstValueFrom(this.sourceCodeService.get(data.sourceUrl));
        const response = await this.reviewRequestDtoService.create(data, user);
        const reviewRequestDocument = await this.reviewRequestDocumentService.get(response.id);
        const reviewDto = plainToInstance(ReviewRequestDto, reviewRequestDocument.toObject());

        await this.sourceCodeDocumentService.create(reviewRequestDocument, sourceCode);
        this.telegramBotMS.onReviewRequestCreated(reviewDto);

        return response;
    }
}
