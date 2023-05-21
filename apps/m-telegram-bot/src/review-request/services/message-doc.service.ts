import { ReviewRequestDto } from '@acua/shared/code-review';
import { UserMS } from '@acua/shared/m-user';
import { Schema } from '@acua/shared/mongo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewRequestMessageDocService {
    constructor(
        @InjectModel(Schema.TgBot.ReviewRequestTgMessageRef.name)
        private readonly messageRefModel: Model<Schema.TgBot.ReviewRequestTgMessageRefDoc>,
        private readonly userMS: UserMS
    ) {}

    public async create(
        tgMessageId: number,
        reviewRequest: ReviewRequestDto
    ): Promise<Schema.TgBot.ReviewRequestTgMessageRefDoc> {
        const userDoc = await this.userMS.getByTgId(reviewRequest.user.tgId);
        const messageModel = new this.messageRefModel({
            tgMessageId,
            reviewRequest: reviewRequest.id,
            user: userDoc
        });

        return messageModel.save();
    }
}
