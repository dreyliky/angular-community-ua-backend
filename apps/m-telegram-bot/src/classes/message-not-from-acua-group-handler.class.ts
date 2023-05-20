import { ModuleRef } from '@nestjs/core';
import type { Message } from 'node-telegram-bot-api';
import { MessageHandler } from '../interfaces';

export class MessageNotFromAcuaGroupHandler implements MessageHandler {
    constructor(public readonly moduleRef: ModuleRef) {}

    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    public handle(message: Message): void {}
}
