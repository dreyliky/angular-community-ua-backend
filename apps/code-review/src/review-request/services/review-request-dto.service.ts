import { CreationResponseDto } from '@acua/shared';
import { AuthorizedUser } from '@acua/shared/m-user';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewRequestCreationDto, ReviewRequestDto } from '../models';
import { ReviewRequestDocumentService } from './review-request-document.service';

@Injectable()
export class ReviewRequestDtoService {
    constructor(private readonly reviewRequestDtoService: ReviewRequestDocumentService) {}

    public async get(id: string): Promise<ReviewRequestDto> {
        const dataDocument = await this.reviewRequestDtoService.get(id);

        return plainToInstance(ReviewRequestDto, dataDocument.toObject());
    }

    public async getAll(): Promise<ReviewRequestDto[]> {
        const dataDocuments = await this.reviewRequestDtoService.getAll();

        return dataDocuments.map((dataDocument) =>
            plainToInstance(ReviewRequestDto, dataDocument.toObject())
        );
    }

    public async create(
        reviewDataRequest: ReviewRequestCreationDto,
        user: AuthorizedUser
    ): Promise<CreationResponseDto> {
        const document = await this.reviewRequestDtoService.create(reviewDataRequest, user);

        return new CreationResponseDto(document);
    }
}
