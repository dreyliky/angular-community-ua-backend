import { LanguageDetectorService } from '@acua/shared';
import { ModuleRef } from '@nestjs/core';
import * as TelegramBot from 'node-telegram-bot-api';
import { MessageHandler } from '../interfaces';

export class MessageLanguageHandler implements MessageHandler {
    private readonly bot = this.moduleRef.get(TelegramBot);
    private readonly languageService = this.moduleRef.get(
        LanguageDetectorService
    );

    constructor(public readonly moduleRef: ModuleRef) {}

    public handle(message: TelegramBot.Message): void {
        const isRussianMessage = this.languageService.isRussian(message.text);

        if (isRussianMessage) {
            const chatId = message.chat.id;
            const messageId = message.message_id.toString();

            this.sendMessageAboutRussianLanguageForbidden(message);
            this.bot.deleteMessage(chatId, messageId);
        }
    }

    private sendMessageAboutRussianLanguageForbidden(
        message: TelegramBot.Message
    ): void {
        this.bot.sendMessage(
            message.chat.id,
            `@${message.from.username}, російська мова заборонена в цій групі.`,
            { message_thread_id: message.message_thread_id }
        );
    }
}
