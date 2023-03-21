import { UserDocument, UsersService } from '@acua/shared/user';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { adaptCodeReviewRequestDocumentToDtoOne } from '../adapters';
import { CodeReviewRequestStatusEnum } from '../enums';
import { CodeReviewCreationDto, CodeReviewRequestDto } from './../models';
import { CodeReviewRequest, CodeReviewRequestDocument } from './../schemas';

@Injectable()
export class ReviewRequestService {
    constructor(
        @InjectModel(CodeReviewRequest.name)
        private readonly codeReviewRequestModel: Model<CodeReviewRequestDocument>,
        private readonly userService: UsersService
    ) {}

    public async find(): Promise<CodeReviewRequestDocument[]> {
        return await this.codeReviewRequestModel.find().populate('user').exec();
    }

    public async findOne(
        id: Types.ObjectId
    ): Promise<CodeReviewRequestDocument> {
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

        const data = adaptCodeReviewRequestDocumentToDtoOne(dataDocument);

        return data;
    }

    public async get(): Promise<CodeReviewRequestDto[]> {
        return (await this.find()).map((dataDocument) =>
            adaptCodeReviewRequestDocumentToDtoOne(dataDocument)
        );
    }

    public async create(
        reviewDataRequest: CodeReviewCreationDto,
        userTgId: number
    ): Promise<CodeReviewRequestDto> {
        const user = (await this.userService.findOneByTgId(
            userTgId
        )) as UserDocument;

        const data: CodeReviewRequest = {
            user,
            ...reviewDataRequest
        };

        const createdData = new this.codeReviewRequestModel(data).save();

        return adaptCodeReviewRequestDocumentToDtoOne(await createdData);
    }

    public async updateOne(
        id: Types.ObjectId,
        status: CodeReviewRequestStatusEnum
    ): Promise<unknown> {
        const data = await this.findOne(id);

        if (!data) {
            throw new NotFoundException();
        }

        return await this.codeReviewRequestModel
            .updateOne({ _id: id }, { status: status })
            .exec();
    }
}
