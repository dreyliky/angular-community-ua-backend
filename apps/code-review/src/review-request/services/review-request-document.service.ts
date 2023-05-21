import {
    ReviewRequestCreationDto,
    ReviewRequestFiltersDto,
    ReviewRequestUpdateDto
} from '@acua/common/code-review';
import {
    AuthorizedUser,
    CommandEnum as M_UserCommand,
    USER_MICROSERVICE
} from '@acua/common/m-user';
import { CrReviewRequest, CrReviewRequestDocument, User, UserDocument } from '@acua/shared/mongo';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, LeanDocument, Model, Query } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReviewRequestDocumentService {
    private readonly userMicroservice = this.moduleRef.get<ClientProxy>(USER_MICROSERVICE, {
        strict: false
    });

    constructor(
        @InjectModel(CrReviewRequest.name)
        private readonly codeReviewRequestModel: Model<CrReviewRequestDocument>,
        private readonly moduleRef: ModuleRef
    ) {}

    public get(id: string): Promise<CrReviewRequestDocument> {
        try {
            return this.codeReviewRequestModel.findOne({ _id: id }).populate('user').exec();
        } catch {
            throw new NotFoundException(`ReviewRequest with id ${id} not found.`);
        }
    }

    public getAll(): Promise<CrReviewRequestDocument[]> {
        return this.find().exec();
    }

    public getMultipleFiltered(data: ReviewRequestFiltersDto): Promise<CrReviewRequestDocument[]> {
        return this.find(data).exec();
    }

    public async getAllMy(userTgId: number): Promise<LeanDocument<CrReviewRequest>[]> {
        const user = await firstValueFrom(
            this.userMicroservice.send<UserDocument>(M_UserCommand.GetByTgId, userTgId)
        );
        const reviewRequestDocuments = await this.find({ user: user._id }).lean().exec();

        reviewRequestDocuments.forEach((document) => (document.user = user));

        return reviewRequestDocuments;
    }

    public async create(
        reviewDataRequest: ReviewRequestCreationDto,
        user: AuthorizedUser
    ): Promise<Document> {
        const userDocument = await firstValueFrom(
            this.userMicroservice.send<User>(M_UserCommand.GetByTgId, user.tgId)
        );
        const createdModel = new this.codeReviewRequestModel(<CrReviewRequest>{
            user: userDocument,
            ...reviewDataRequest
        });

        return createdModel.save();
    }

    public async edit(
        id: string,
        user: AuthorizedUser,
        data: ReviewRequestUpdateDto
    ): Promise<unknown> {
        const reviewRequest = await this.get(id);

        if (reviewRequest.user.tgId !== user.tgId) {
            throw new ForbiddenException();
        }

        return this.codeReviewRequestModel.updateOne({ _id: id }, data).exec();
    }

    private find(filters?: FilterQuery<CrReviewRequest>): Query<any, CrReviewRequestDocument> {
        return this.codeReviewRequestModel.find(filters).populate('user').sort({ date: 'desc' });
    }
}
