import { ModuleRef } from '@nestjs/core';
import * as TelegramBot from 'node-telegram-bot-api';
import { MessageHandler } from '../interfaces';

export class MessageLanguageHandler implements MessageHandler {
    private readonly bot = this.moduleRef.get(TelegramBot);

    private readonly russianLanguageRegExp = /([ыёъэ])/g;

    constructor(public readonly moduleRef: ModuleRef) {}

    public async handle(message: TelegramBot.Message): Promise<void> {
        const textAtLowerCase = message.text.toLowerCase();
        const isRussianText = this.russianLanguageRegExp.test(textAtLowerCase);

        if (isRussianText) {
            this.sendMessageAboutRussianLanguageForbidden(message);
        }
    }

    private sendMessageAboutRussianLanguageForbidden(message: TelegramBot.Message): void {
        this.bot.sendMessage(
            message.chat.id,
            `@${message.from.username}, російська мова заборонена в цій групі.`,
            { message_thread_id: message.message_thread_id }
        );
        this.bot.deleteMessage(message.chat.id, message.message_id.toString());
    }
}
