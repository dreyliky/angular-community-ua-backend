import { Schema } from '@acua/shared/mongo';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ReviewRequestDto } from '../../code-review';
import { CommandEnum } from '../enums';
import { TG_BOT_MICROSERVICE } from '../tokens';

@Injectable()
export class TelegramBotMS {
    private readonly microService = this.moduleRef.get<ClientProxy>(TG_BOT_MICROSERVICE, {
        strict: false
    });

    constructor(private readonly moduleRef: ModuleRef) {}

    public onReviewRequestCreated(data: ReviewRequestDto): Promise<Schema.UserDoc> {
        return firstValueFrom(this.microService.send(CommandEnum.ReviewRequestCreated, data));
    }
}
