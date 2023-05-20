import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { MessageHandlerFactory } from './services';

@Injectable()
export class TelegramBotService {
    constructor(
        private readonly bot: TelegramBot,
        private readonly messageHandlerFactory: MessageHandlerFactory
    ) {
        this.initMessageObserver();
    }

    private initMessageObserver(): void {
        this.bot.addListener('message', (message: TelegramBot.Message) => {
            console.log(message);
            const messageHandler = this.messageHandlerFactory.create(message);

            messageHandler.handle(message);
        });
    }
}
