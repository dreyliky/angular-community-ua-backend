import { Schema } from '@acua/shared/mongo';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseMicroservice } from '../../../services';
import { ReviewRequestDto } from '../../code-review';
import { CommandEnum } from '../enums';
import { TG_BOT_MICROSERVICE } from '../tokens';

@Injectable()
export class TelegramBotMS extends BaseMicroservice {
    constructor(moduleRef: ModuleRef) {
        super(TG_BOT_MICROSERVICE, moduleRef);
    }

    public notifyReviewRequestCreated(data: ReviewRequestDto): Promise<Schema.UserDoc> {
        return this.trySend(CommandEnum.ReviewRequestCreated, data);
    }
}
