import { ModuleRef } from '@nestjs/core';
import TelegramBot from 'node-telegram-bot-api';

export interface MessageHandler {
    readonly moduleRef: ModuleRef;

    handle(message: TelegramBot.Message): void;
}
