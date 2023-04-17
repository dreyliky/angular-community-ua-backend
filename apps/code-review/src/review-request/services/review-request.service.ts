import {
    CommandEnum as M_UserCommand,
    USER_MICROSERVICE,
    User,
    UserDto
} from '@acua/shared/m-user';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { adaptCodeReviewRequestDocumentToDtoOne } from '../adapters';
import { CodeReviewRequestStatusEnum } from '../enums';
import { CodeReviewCreationDto, CodeReviewRequestDto } from './../models';
import { CodeReviewRequest, CodeReviewRequestDocument } from './../schemas';

@Injectable()
export class ReviewRequestService {
    public readonly userMicroservice = this.moduleRef.get(USER_MICROSERVICE, {
        strict: false
    });

    constructor(
        @InjectModel(CodeReviewRequest.name)
        private readonly codeReviewRequestModel: Model<CodeReviewRequestDocument>,
        private readonly moduleRef: ModuleRef
    ) {}

    public async find(): Promise<CodeReviewRequestDocument[]> {
        return await this.codeReviewRequestModel.find().populate('user').exec();
    }

    public async findOne(id: Types.ObjectId): Promise<CodeReviewRequestDocument> {
        try {
            return await this.codeReviewRequestModel
                .findOne({
                    _id: id
                })
                .populate('user')
                .exec();
        } catch {
            throw new BadRequestException();
        }
    }

    public async getOne(id: Types.ObjectId): Promise<CodeReviewRequestDto> {
        const dataDocument = await this.findOne(id);

        if (!dataDocument) {
            throw new NotFoundException('404 NotFoundException');
        }

        const data = this.getCodeReviewRequestDto(dataDocument);

        return data;
    }

    public async get(): Promise<CodeReviewRequestDto[]> {
        const dataDocuments = await this.find();

        return await Promise.all(
            dataDocuments.map((dataDocument) => this.getCodeReviewRequestDto(dataDocument))
        );
    }

    public async create(
        reviewDataRequest: CodeReviewCreationDto,
        userTgId: number
    ): Promise<unknown> {
        const user: User = await firstValueFrom(
            this.userMicroservice.send(M_UserCommand.GetByTgId, userTgId)
        );

        const data: CodeReviewRequest = {
            user,
            ...reviewDataRequest
        };

        const createdData = new this.codeReviewRequestModel(data);

        return createdData.save();
    }

    public async updateOne(
        id: Types.ObjectId,
        status: CodeReviewRequestStatusEnum
    ): Promise<unknown> {
        const data = await this.findOne(id);

        if (!data) {
            throw new NotFoundException();
        }

        return await this.codeReviewRequestModel.updateOne({ _id: id }, { status: status }).exec();
    }

    public async getCodeReviewRequestDto(
        dataDocument: CodeReviewRequestDocument
    ): Promise<CodeReviewRequestDto> {
        const user: UserDto = await firstValueFrom(
            this.userMicroservice.send(M_UserCommand.AdaptToUserDto, dataDocument.user)
        );

        return adaptCodeReviewRequestDocumentToDtoOne(dataDocument, user);
    }
}
