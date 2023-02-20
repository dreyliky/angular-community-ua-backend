import { ModuleRef } from '@nestjs/core';
import { EnvironmentKeyEnum } from '@telegram-bot/core';
import * as TelegramBot from 'node-telegram-bot-api';
import { MessageHandler } from '../interfaces';

export class MessageCodeReviewRequestHandler implements MessageHandler {
    private readonly bot = this.moduleRef.get(TelegramBot);

    constructor(public readonly moduleRef: ModuleRef) {}

    public handle(message: TelegramBot.Message): void {
        // TODO: Add real logic
        const isProduction =
            process.env[EnvironmentKeyEnum.Production] === 'true';

        if (!isProduction) {
            this.bot.deleteMessage(
                message.chat.id,
                message.message_id.toString()
            );
            this.bot.sendMessage(
                message.chat.id,
                `Користувач @${message.from.username} очікує Код-Ревью у спільноти.`,
                { message_thread_id: message.message_thread_id }
            );
        }
    }
}
