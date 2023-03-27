import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { adaptCodeReviewRequestDocumentToDtoOne } from '../adapters';
import { CodeReviewRequestStatusEnum } from '../enums';
import { CodeReviewCreationDto, CodeReviewRequestDto } from './../models';
import { CodeReviewRequest, CodeReviewRequestDocument } from './../schemas';

@Injectable()
export class ReviewRequestService {
    constructor(
        @InjectModel(CodeReviewRequest.name)
        private readonly codeReviewRequestModel: Model<CodeReviewRequestDocument>,
        @Inject('M-USER')
        private mUserClient: ClientProxy
    ) {}

    public async find(): Promise<CodeReviewRequestDocument[]> {
        return await this.codeReviewRequestModel.find()
            .populate('user')
            .exec();
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

        const data = adaptCodeReviewRequestDocumentToDtoOne(dataDocument, this.mUserClient);

        return await data;
    }

    public async get(): Promise<any> {

        /* return (await this.find()).map((dataDocument) =>
            adaptCodeReviewRequestDocumentToDtoOne(dataDocument, this.mUserClient);
        );*/
    }

    public async create(
        reviewDataRequest: CodeReviewCreationDto,
        userTgId: number
    ): Promise<unknown> {
        const user = await firstValueFrom(this.mUserClient.send('user_by_tg_id', userTgId));

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

        return await this.codeReviewRequestModel
            .updateOne({ _id: id }, { status: status })
            .exec();
    }
}
