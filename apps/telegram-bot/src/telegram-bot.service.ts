import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {
    private readonly TOKEN = this.configEnvService.get('TELEGRAM_BOT_TOKEN');
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
