import {
    ReviewRequestCreationDto,
    ReviewRequestFiltersDto,
    ReviewRequestUpdateDto
} from '@acua/shared/code-review';
import { AuthorizedUser, UserMS } from '@acua/shared/m-user';
import { Schema } from '@acua/shared/mongo';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, LeanDocument, Model, Query } from 'mongoose';

@Injectable()
export class ReviewRequestDocumentService {
    constructor(
        @InjectModel(Schema.Cr.ReviewRequest.name)
        private readonly codeReviewRequestModel: Model<Schema.Cr.ReviewRequestDoc>,
        private readonly userService: UserMS
    ) {}

    public get(id: string): Promise<Schema.Cr.ReviewRequestDoc> {
        try {
            return this.codeReviewRequestModel.findOne({ _id: id }).populate('user').exec();
        } catch {
            throw new NotFoundException(`ReviewRequest with id ${id} not found.`);
        }
    }

    public getAll(): Promise<Schema.Cr.ReviewRequestDoc[]> {
        return this.find().exec();
    }

    public getMultipleFiltered(
        data: ReviewRequestFiltersDto
    ): Promise<Schema.Cr.ReviewRequestDoc[]> {
        return this.find(data).exec();
    }

    public async getAllMy(userTgId: number): Promise<LeanDocument<Schema.Cr.ReviewRequest>[]> {
        const user = await this.userService.getByTgId(userTgId);
        const reviewRequestDocuments = await this.find({ user: user._id }).lean().exec();

        reviewRequestDocuments.forEach((document) => (document.user = user));

        return reviewRequestDocuments;
    }

    public async create(
        reviewDataRequest: ReviewRequestCreationDto,
        user: AuthorizedUser
    ): Promise<Document> {
        const userDocument = await this.userService.getByTgId(user.tgId);
        const createdModel = new this.codeReviewRequestModel(<Schema.Cr.ReviewRequest>{
            user: userDocument as Schema.User,
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

    private find(
        filters?: FilterQuery<Schema.Cr.ReviewRequest>
    ): Query<any, Schema.Cr.ReviewRequestDoc> {
        return this.codeReviewRequestModel.find(filters).populate('user').sort({ date: 'desc' });
    }
}
