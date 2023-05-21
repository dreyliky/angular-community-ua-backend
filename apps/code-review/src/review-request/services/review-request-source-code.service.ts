import { ProjectEntity, ReviewRequestCreationDto } from '@acua/common/code-review';
import { AuthorizedUser } from '@acua/common/m-user';
import { CreationResponseDto } from '@acua/shared';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
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
        private readonly reviewRequestDocumentService: ReviewRequestDocumentService
    ) {}

    public get(reviewRequestId: string): Promise<ProjectEntity[]> {
        return this.sourceCodeDtoService.get(reviewRequestId);
    }

    public async downloadAndSaveToDb(
        user: AuthorizedUser,
        data: ReviewRequestCreationDto
    ): Promise<CreationResponseDto> {
        const sourceCode = await firstValueFrom(this.sourceCodeService.get(data.sourceUrl));
        const response = await this.reviewRequestDtoService.create(data, user);
        const reviewRequestDocument = await this.reviewRequestDocumentService.get(response.id);
        this.sourceCodeDocumentService.create(reviewRequestDocument, sourceCode);

        return response;
    }
}
