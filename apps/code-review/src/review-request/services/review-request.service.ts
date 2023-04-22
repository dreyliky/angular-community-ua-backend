import {
    AuthorizedUser,
    CommandEnum as M_UserCommand,
    USER_MICROSERVICE,
    UserDto
} from '@acua/shared/m-user';
import { User } from '@acua/shared/m-user/schemas';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { adaptCodeReviewRequestDocumentToDtoOne } from '../adapters';
import { CodeReviewRequestStatusEnum } from '../enums';
import { CodeReviewCreationDto, CodeReviewRequestDto } from './../models';
import { CodeReviewRequest, CodeReviewRequestDocument } from './../schemas';

@Injectable()
export class ReviewRequestService {
    private readonly userMicroservice = this.moduleRef.get<ClientProxy>(USER_MICROSERVICE, {
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

    public async findOne(id: string): Promise<CodeReviewRequestDocument> {
        try {
            return await this.codeReviewRequestModel
                .findOne({
                    _id: id
                })
                .populate('user')
                .exec();
        } catch {
            throw new NotFoundException(`ReviewRequest with id ${id} not found.`);
        }
    }

    public async getOne(id: string): Promise<CodeReviewRequestDto> {
        const dataDocument = await this.findOne(id);

        if (!dataDocument) {
            throw new NotFoundException();
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
        user: AuthorizedUser
    ): Promise<unknown> {
        const userDocument = await firstValueFrom(
            this.userMicroservice.send<User>(M_UserCommand.GetByTgId, user.tgId)
        );
        const data: CodeReviewRequest = {
            user: userDocument,
            ...reviewDataRequest
        };

        const createdData = new this.codeReviewRequestModel(data);

        return createdData.save();
    }

    public async updateOne(id: string, status: CodeReviewRequestStatusEnum): Promise<unknown> {
        const data = await this.findOne(id);

        if (!data) {
            throw new NotFoundException();
        }

        return await this.codeReviewRequestModel.updateOne({ _id: id }, { status }).exec();
    }

    public async getCodeReviewRequestDto(
        dataDocument: CodeReviewRequestDocument
    ): Promise<CodeReviewRequestDto> {
        const user: UserDto = await firstValueFrom(
            this.userMicroservice.send(M_UserCommand.AdaptToDto, dataDocument.user)
        );

        return adaptCodeReviewRequestDocumentToDtoOne(dataDocument, user);
    }
}
