import { ReviewRequestDto } from '@acua/shared/code-review';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import * as TelegramBot from 'node-telegram-bot-api';
import { ENVIRONMENT_KEY } from '../data';

@Injectable()
export class ReviewRequestMessageService {
    private readonly config = this.moduleRef.get(ConfigService, {
        strict: false
    });

    private readonly reviewPageUrl = this.config.get(ENVIRONMENT_KEY.AcuaWebOverviewPageUrl);

    constructor(private readonly bot: TelegramBot, private readonly moduleRef: ModuleRef) {}

    public create(reviewRequest: ReviewRequestDto): void {
        const chatId = this.config.get(ENVIRONMENT_KEY.AcuaGroupChatId);
        const threadId = this.config.get(ENVIRONMENT_KEY.AcuaGroupCodeReviewThreadId);

        this.bot.sendMessage(
            chatId,
            `Користувач @${reviewRequest.user.username} очікує Код-Ревью у спільноти.`,
            {
                message_thread_id: threadId,
                reply_markup: this.createKeyboardWithAppLink(reviewRequest.id)
            }
        );
    }

    // FIXME: Refactor. Same code exists
    private createKeyboardWithAppLink(reviewRequestId: string): TelegramBot.InlineKeyboardMarkup {
        return {
            inline_keyboard: [
                [
                    {
                        text: 'Почати Код-Ревью',
                        url: `${this.reviewPageUrl}/${reviewRequestId}`
                    }
                ]
            ]
        };
    }
}
