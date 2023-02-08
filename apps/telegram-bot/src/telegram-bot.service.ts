import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { TelegramBotConfigEnum } from './core/enums/telegram-bot-config.enum';

@Injectable()
export class TelegramBotService {
    private readonly token: TelegramBotConfigEnum = TelegramBotConfigEnum['Token'];
    private bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot(this.token, { polling: true });
    }
}
