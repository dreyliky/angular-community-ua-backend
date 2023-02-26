import { Provider } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENT_KEY } from '@telegram-bot/core';
import * as TelegramBot from 'node-telegram-bot-api';

export const TELEGRAM_BOT_PROVIDER: Provider = {
    provide: TelegramBot,
    useFactory: (configService: ConfigService) => {
        const token = configService.get(ENVIRONMENT_KEY.BotToken);

        return new TelegramBot(token, { polling: true });
    },
    inject: [ConfigService]
};
