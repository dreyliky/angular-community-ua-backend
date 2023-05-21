import { CommentCreationDto, CommentEditingDto } from '@acua/common/code-review';
import {
    AuthorizedUser,
    CommandEnum as M_UserCommand,
    USER_MICROSERVICE
} from '@acua/common/m-user';
import { Schema } from '@acua/shared/mongo';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { ReviewRequestDocumentService } from '../../review-request/services';
import { adaptCommentCreationDtoToSchema } from '../adapters';

@Injectable()
export class CommentDocumentService {
    private readonly userMicroservice = this.moduleRef.get<ClientProxy>(USER_MICROSERVICE, {
        strict: false
    });

    private readonly reviewRequestService = this.moduleRef.get(ReviewRequestDocumentService, {
        strict: false
    });

    constructor(
        @InjectModel(Schema.Cr.ReviewRequestComment.name)
        private readonly commentModel: Model<Schema.Cr.ReviewRequestCommentDoc>,
        private readonly moduleRef: ModuleRef
    ) {}

    public getAll(reviewRequestId: string): Promise<Schema.Cr.ReviewRequestCommentDoc[]> {
        return this.commentModel
            .find({ reviewRequest: reviewRequestId })
            .populate('reviewer')
            .exec();
    }

    public getAllPerFileLine(
        reviewRequestId: string,
        fileFullPath: string,
        lineNumber: number
    ): Promise<Schema.Cr.ReviewRequestCommentDoc[]> {
        return this.commentModel
            .find({ reviewRequest: reviewRequestId, fileFullPath, lineNumber })
            .populate('reviewer')
            .exec();
    }

    public async create(
        data: CommentCreationDto,
        reviewRequestId: string,
        userTgId: number
    ): Promise<Document> {
        const userDocument = await firstValueFrom(
            this.userMicroservice.send<Schema.User>(M_UserCommand.GetByTgId, userTgId)
        );
        const reviewRequestDocument = await this.reviewRequestService.get(reviewRequestId);
        const comment = adaptCommentCreationDtoToSchema(data, reviewRequestDocument, userDocument);
        const commentModel = new this.commentModel(comment);

        return await commentModel.save();
    }

    public async edit(
        data: CommentEditingDto,
        reviewRequestId: string,
        commentId: string,
        user: AuthorizedUser
    ): Promise<unknown> {
        const commentDocument = await this.commentModel
            .findOne({ _id: commentId, reviewRequest: reviewRequestId })
            .populate('reviewer')
            .exec();

        this.validateIsUserRelated(commentDocument, user);

        if (!commentDocument) {
            throw new NotFoundException();
        }

        return await this.commentModel.updateOne({ _id: commentId }, data).exec();
    }

    public async delete(commentId: string, user: AuthorizedUser): Promise<unknown> {
        const commentDocument = await this.commentModel
            .findOne({ _id: commentId })
            .populate('reviewer')
            .exec();

        this.validateIsUserRelated(commentDocument, user);

        return await this.commentModel.deleteOne({ _id: commentId }).exec();
    }

    private validateIsUserRelated(
        comment: Schema.Cr.ReviewRequestCommentDoc,
        user: AuthorizedUser
    ): void {
        if (comment.reviewer.tgId !== user.tgId) {
            throw new ForbiddenException();
        }
    }
}
