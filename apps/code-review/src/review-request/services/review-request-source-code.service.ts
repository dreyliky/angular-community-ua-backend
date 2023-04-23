import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import {
    SourceCodeDocumentService,
    SourceCodeDtoService,
    SourceCodeService
} from '../../source-code/services';
import { ProjectEntity } from '../../source-code/types';
import { ReviewRequestDocumentService } from './review-request-document.service';

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
        private readonly reviewRequestDocumentService: ReviewRequestDocumentService
    ) {}

    public get(reviewRequestId: string): Promise<ProjectEntity[]> {
        return this.sourceCodeDtoService.get(reviewRequestId);
    }

    public async downloadAndSaveToDb(reviewRequestId: string): Promise<unknown> {
        const reviewRequestDocument = await this.reviewRequestDocumentService.get(reviewRequestId);
        const sourceUrl = reviewRequestDocument.sourceUrl;
        const sourceCode = await firstValueFrom(this.sourceCodeService.get(sourceUrl));

        return this.sourceCodeDocumentService.create(reviewRequestDocument, sourceCode);
    }
}
