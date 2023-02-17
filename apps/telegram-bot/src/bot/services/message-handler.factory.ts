import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { EnvironmentKeyEnum as EnvironmentKey } from '@telegram-bot/core';
import type { Message } from 'node-telegram-bot-api';
import {
    MessageCodeReviewRequestHandler,
    MessageLanguageHandler,
    MessageNotFromAcuaGroupHandler
} from '../classes';
import { MessageHandler } from '../interfaces';

@Injectable()
export class MessageHandlerFactory {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly configService: ConfigService
    ) {}

    public create(message: Message): MessageHandler {
        if (!this.isAcuaGroupContext(message)) {
            return new MessageNotFromAcuaGroupHandler(this.moduleRef);
        }

        if (this.isCodeReviewRequest(message)) {
            return new MessageCodeReviewRequestHandler(this.moduleRef);
        }

        return new MessageLanguageHandler(this.moduleRef);
    }

    private isAcuaGroupContext(message: Message): boolean {
        const targetChatId = this.configService.get(EnvironmentKey.AcuaGroupChatId);

        return (message.chat.id === +targetChatId);
    }

    private isCodeReviewRequest(message: Message): boolean {
        const targetThreadId = this.configService.get(EnvironmentKey.AcuaGroupCodeReviewThreadId);

        return (message.message_thread_id === +targetThreadId);
    }
}
