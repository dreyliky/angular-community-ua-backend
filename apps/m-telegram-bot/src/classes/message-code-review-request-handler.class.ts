import { ReviewRequestCreationDto } from '@acua/shared/code-review';
import { TokenMS } from '@acua/shared/m-token';
import { BadRequestException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { validateSync } from 'class-validator';
import * as TelegramBot from 'node-telegram-bot-api';
import { MessageHandler } from '../interfaces';
import { ReviewRequestApi, parseMessageTextToReviewRequestCreationDto } from '../review-request';

export class MessageCodeReviewRequestHandler implements MessageHandler {
    private readonly bot = this.moduleRef.get(TelegramBot);
    private readonly tokenMS = this.moduleRef.get(TokenMS);
    private readonly reviewRequestApi = this.moduleRef.get(ReviewRequestApi);

    constructor(public readonly moduleRef: ModuleRef) {}

    public async handle(message: TelegramBot.Message): Promise<unknown> {
        await this.sendMessageAboutProcessingRequest(message);
        this.bot.deleteMessage(message.chat.id, message.message_id.toString());

        const creationDto = await this.messageToReviewRequestCreationDto(message);
        const userBearerToken = await this.tokenMS.sign({
            tgId: message.from.id,
            username: message.from.username
        });
        const reviewRequestId = await this.reviewRequestApi.create(creationDto, userBearerToken);

        return this.reviewRequestApi.getById(reviewRequestId);
    }

    private async messageToReviewRequestCreationDto(
        message: TelegramBot.Message
    ): Promise<ReviewRequestCreationDto> {
        const creationDto = parseMessageTextToReviewRequestCreationDto(message.text);

        if (!!validateSync(creationDto).length) {
            await this.sendWarnMessageAboutIncorrectText(message);

            throw new BadRequestException(`Incorrect Message Text!`);
        }

        return creationDto;
    }

    // eslint-disable-next-line max-lines-per-function
    private async sendWarnMessageAboutIncorrectText(
        initialMessage: TelegramBot.Message
    ): Promise<unknown> {
        const messageDeleteDelay = 20000;
        const { chat, message_id } = await this.bot.sendMessage(
            initialMessage.chat.id,
            `@${initialMessage.from.username}, відхилено. Будь ласка, вкажіть посилання на ` +
                `*Github* або *Stackblitz* для створення запиту на Код-Ревью.\n\n` +
                `_Приклад повідомлення:_\n\n` +
                `*Подивіться мою бібліотеку для роботи зі стейтами, як вам?*\n` +
                `https://github.com/Nillcon248/ngx-base-state`,
            {
                message_thread_id: initialMessage.message_thread_id,
                parse_mode: 'Markdown',
                disable_web_page_preview: true,
                disable_notification: true
            }
        );

        setTimeout(
            () => this.bot.deleteMessage(chat.id, message_id.toString()),
            messageDeleteDelay
        );

        return message_id;
    }

    private async sendMessageAboutProcessingRequest(
        initialMessage: TelegramBot.Message
    ): Promise<unknown> {
        const messageDeleteDelay = 7000;
        const { chat, message_id } = await this.bot.sendMessage(
            initialMessage.chat.id,
            `@${initialMessage.from.username} опрацьовую запит на Код-Ревью...`,
            { message_thread_id: initialMessage.message_thread_id, disable_notification: true }
        );

        setTimeout(
            () => this.bot.deleteMessage(chat.id, message_id.toString()),
            messageDeleteDelay
        );

        return message_id;
    }
}
