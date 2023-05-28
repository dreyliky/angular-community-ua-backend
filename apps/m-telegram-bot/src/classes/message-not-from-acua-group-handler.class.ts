import { ModuleRef } from '@nestjs/core';
import type { Message } from 'node-telegram-bot-api';
import { MessageHandler } from '../interfaces';

export class MessageNotFromAcuaGroupHandler implements MessageHandler {
    constructor(public readonly moduleRef: ModuleRef) {}

    public async handle(message: Message): Promise<unknown> {
        return message;
    }
}
