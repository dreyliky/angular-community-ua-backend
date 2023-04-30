import {
    AuthorizedUser,
    CommandEnum as M_UserCommand,
    USER_MICROSERVICE
} from '@acua/shared/m-user';
import { User, UserDocument } from '@acua/shared/m-user/schemas';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Document, LeanDocument, Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { ReviewRequestStatusEnum } from '../enums';
import { ReviewRequestCreationDto } from '../models';
import { ReviewRequest, ReviewRequestDocument } from '../schemas';

@Injectable()
export class ReviewRequestDocumentService {
    private readonly userMicroservice = this.moduleRef.get<ClientProxy>(USER_MICROSERVICE, {
        strict: false
    });

    constructor(
        @InjectModel(ReviewRequest.name)
        private readonly codeReviewRequestModel: Model<ReviewRequestDocument>,
        private readonly moduleRef: ModuleRef
    ) {}

    public get(id: string): Promise<ReviewRequestDocument> {
        try {
            return this.codeReviewRequestModel.findOne({ _id: id }).populate('user').exec();
        } catch {
            throw new NotFoundException(`ReviewRequest with id ${id} not found.`);
        }
    }

    public getAll(): Promise<ReviewRequestDocument[]> {
        return this.codeReviewRequestModel.find().populate('user').exec();
    }

    public async getAllMy(userTgId: number): Promise<LeanDocument<ReviewRequest>[]> {
        const user = await firstValueFrom(
            this.userMicroservice.send<UserDocument>(M_UserCommand.GetByTgId, userTgId)
        );
        const reviewRequestDocuments = await this.codeReviewRequestModel
            .find({ user: user._id })
            .lean();

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
        const createdModel = new this.codeReviewRequestModel(<ReviewRequest>{
            user: userDocument,
            ...reviewDataRequest
        });

        return createdModel.save();
    }

    public async editStatus(id: string, status: ReviewRequestStatusEnum): Promise<unknown> {
        await this.get(id);

        return this.codeReviewRequestModel.updateOne({ _id: id }, { status }).exec();
    }
}
