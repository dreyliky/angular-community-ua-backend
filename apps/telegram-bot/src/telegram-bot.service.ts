import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentKeyEnum } from '@telegram-bot/core';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {
    private readonly TOKEN = this.configEnvService.get(EnvironmentKeyEnum.BotToken);
    private bot: TelegramBot;

    constructor(
        private configEnvService: ConfigService
    ) {
        this.initSetup();
    }

    private initSetup(): void {
        this.bot = new TelegramBot(this.TOKEN, { polling: true });
    }
}
