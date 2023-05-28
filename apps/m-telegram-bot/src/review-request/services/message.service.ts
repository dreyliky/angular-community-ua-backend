import { ReviewRequestDto } from '@acua/shared/code-review';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import * as TelegramBot from 'node-telegram-bot-api';
import { ENVIRONMENT_KEY } from '../../data';
import { ReviewRequestMessageInfo } from '../models';
import { ReviewRequestMessageDocService } from './message-doc.service';

@Injectable()
export class ReviewRequestMessageService {
    private readonly config = this.moduleRef.get(ConfigService, {
        strict: false
    });

    private readonly chatId = this.config.get(ENVIRONMENT_KEY.AcuaGroupChatId);
    private readonly threadId = this.config.get(ENVIRONMENT_KEY.AcuaGroupCodeReviewThreadId);
    private readonly reviewPageUrl = this.config.get(ENVIRONMENT_KEY.AcuaWebOverviewPageUrl);

    constructor(
        private readonly bot: TelegramBot,
        private readonly messageDocService: ReviewRequestMessageDocService,
        private readonly moduleRef: ModuleRef
    ) {}

    public async create(reviewRequestDto: ReviewRequestDto): Promise<unknown> {
        const { text, keyboard } = new ReviewRequestMessageInfo({
            reviewRequestDto,
            reviewPageUrl: this.reviewPageUrl,
            commentAmount: 0,
            reviewerAmount: 0
        });
        const message = await this.bot.sendMessage(this.chatId, text, {
            message_thread_id: this.threadId,
            reply_markup: keyboard
        });

        return this.messageDocService.create(message.message_id, reviewRequestDto);
    }
}
