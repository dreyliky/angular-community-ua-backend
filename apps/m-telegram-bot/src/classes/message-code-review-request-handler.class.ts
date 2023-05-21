import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import * as TelegramBot from 'node-telegram-bot-api';
import { ENVIRONMENT_KEY } from '../data';
import { MessageHandler } from '../interfaces';

export class MessageCodeReviewRequestHandler implements MessageHandler {
    private readonly bot = this.moduleRef.get(TelegramBot);
    private readonly config = this.moduleRef.get(ConfigService, {
        strict: false
    });

    private readonly reviewPageUrl = this.config.get(ENVIRONMENT_KEY.AcuaWebOverviewPageUrl);

    constructor(public readonly moduleRef: ModuleRef) {}

    public handle(message: TelegramBot.Message): void {
        this.bot.deleteMessage(message.chat.id, message.message_id.toString());
        this.sendMessageAboutReviewRequest(message); // Temporary hardcode
        // TODO: Send http req for review-request creation with user bearer token in headers
        // Send http req to get review request info by createdReviewRequestId
        // Create ReviewRequestMessageModel
        // Send message to chat by passing model to ReviewRequestMessageService
    }

    private sendMessageAboutReviewRequest(message: TelegramBot.Message): void {
        this.bot.sendMessage(
            message.chat.id,
            `Користувач @${message.from.username} очікує Код-Ревью у спільноти.`,
            {
                message_thread_id: message.message_thread_id,
                reply_markup: this.createKeyboardWithAppLink('123-review-id')
            }
        );
    }

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
