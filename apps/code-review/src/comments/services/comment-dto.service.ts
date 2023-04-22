import { CreationResponseDto } from '@acua/shared';
import { AuthorizedUser } from '@acua/shared/m-user';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { adaptCommentDocumentsToAmountDictionary } from '../adapters';
import { CommentAmountDictionaryDto } from '../interfaces';
import { CommentCreationDto, CommentDto } from '../models';
import { CommentDocumentService } from './comment-document.service';

@Injectable()
export class CommentDtoService {
    constructor(private readonly commentDocumentService: CommentDocumentService) {}

    public async getDictionaryAmount(reviewRequestId: string): Promise<CommentAmountDictionaryDto> {
        const commentDocuments = await this.commentDocumentService.getAll(reviewRequestId);

        return adaptCommentDocumentsToAmountDictionary(commentDocuments);
    }

    public async getAllPerFileLine(
        reviewRequestId: string,
        fileFullPath: string,
        lineNumber: number
    ): Promise<CommentDto[]> {
        const commentDocuments = await this.commentDocumentService.getAllPerFileLine(
            reviewRequestId,
            fileFullPath,
            lineNumber
        );

        return commentDocuments.map((commentDocument) =>
            plainToInstance(CommentDto, commentDocument.toObject())
        );
    }

    public async create(
        data: CommentCreationDto,
        reviewRequestId: string,
        user: AuthorizedUser
    ): Promise<CreationResponseDto> {
        const document = await this.commentDocumentService.create(data, reviewRequestId, user.tgId);

        return new CreationResponseDto(document);
    }
}
