import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { MessageHandlerFactory } from './classes';

@Injectable()
export class AppService {
    constructor(
        private readonly bot: TelegramBot,
        private readonly messageHandlerFactory: MessageHandlerFactory
    ) {
        this.initMessageObserver();
    }

    private initMessageObserver(): void {
        this.bot.addListener('message', (message: TelegramBot.Message) => {
            const messageHandler = this.messageHandlerFactory.create(message);

            messageHandler.handle(message);
        });
    }
}
