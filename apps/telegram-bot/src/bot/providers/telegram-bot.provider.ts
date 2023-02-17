import { Provider } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { EnvironmentKeyEnum } from '@telegram-bot/core';
import * as TelegramBot from 'node-telegram-bot-api';

export const TELEGRAM_BOT_PROVIDER: Provider = {
    provide: TelegramBot,
    useFactory: (configService: ConfigService) => {
        const token = configService.get(EnvironmentKeyEnum.BotToken);

        return new TelegramBot(token, { polling: true });
    },
    inject: [ConfigService]
};
