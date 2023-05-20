import { CreationResponseDto } from '@acua/shared';
import { AuthorizedUser } from '@acua/shared/m-user';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewRequestCreationDto, ReviewRequestDto, ReviewRequestFiltersDto } from '../models';
import { ReviewRequestDocumentService } from './review-request-document.service';

@Injectable()
export class ReviewRequestDtoService {
    constructor(private readonly reviewRequestDocumentService: ReviewRequestDocumentService) {}

    public async get(id: string): Promise<ReviewRequestDto> {
        const dataDocument = await this.reviewRequestDocumentService.get(id);

        return plainToInstance(ReviewRequestDto, dataDocument.toObject());
    }

    public async getAll(): Promise<ReviewRequestDto[]> {
        const dataDocuments = await this.reviewRequestDocumentService.getAll();

        return dataDocuments.map((dataDocument) =>
            plainToInstance(ReviewRequestDto, dataDocument.toObject())
        );
    }

    public async getMultipleFiltered(data: ReviewRequestFiltersDto): Promise<ReviewRequestDto[]> {
        const dataDocuments = await this.reviewRequestDocumentService.getMultipleFiltered(data);

        return dataDocuments.map((dataDocument) =>
            plainToInstance(ReviewRequestDto, dataDocument.toObject())
        );
    }

    public async getAllMy(userTgId: number): Promise<ReviewRequestDto[]> {
        const dataDocuments = await this.reviewRequestDocumentService.getAllMy(userTgId);

        return dataDocuments.map((dataDocument) => plainToInstance(ReviewRequestDto, dataDocument));
    }

    public async create(
        reviewDataRequest: ReviewRequestCreationDto,
        user: AuthorizedUser
    ): Promise<CreationResponseDto> {
        const document = await this.reviewRequestDocumentService.create(reviewDataRequest, user);

        return new CreationResponseDto(document);
    }
}
