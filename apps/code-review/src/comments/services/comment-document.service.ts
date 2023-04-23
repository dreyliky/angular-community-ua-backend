import {
    AuthorizedUser,
    CommandEnum as M_UserCommand,
    USER_MICROSERVICE
} from '@acua/shared/m-user';
import { User } from '@acua/shared/m-user/schemas';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { ReviewRequestDocumentService } from '../../review-request/services';
import { adaptCommentCreationDtoToSchema } from '../adapters';
import { CommentCreationDto, CommentEditingDto } from '../models';
import { Comment, CommentDocument } from '../schemas';

@Injectable()
export class CommentDocumentService {
    private readonly userMicroservice = this.moduleRef.get<ClientProxy>(USER_MICROSERVICE, {
        strict: false
    });

    private readonly reviewRequestService = this.moduleRef.get(ReviewRequestDocumentService, {
        strict: false
    });

    constructor(
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
        private readonly moduleRef: ModuleRef
    ) {}

    public getAll(reviewRequestId: string): Promise<CommentDocument[]> {
        return this.commentModel
            .find({ reviewRequest: reviewRequestId })
            .populate('reviewer')
            .exec();
    }

    public getAllPerFileLine(
        reviewRequestId: string,
        fileFullPath: string,
        lineNumber: number
    ): Promise<CommentDocument[]> {
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
            this.userMicroservice.send<User>(M_UserCommand.GetByTgId, userTgId)
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

    private validateIsUserRelated(comment: CommentDocument, user: AuthorizedUser): void {
        if (comment.reviewer.tgId !== user.tgId) {
            throw new ForbiddenException();
        }
    }
}
