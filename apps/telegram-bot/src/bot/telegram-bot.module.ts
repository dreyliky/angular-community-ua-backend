import { LanguageDetectorService } from '@acua/shared';
import { Module } from '@nestjs/common';
import { TELEGRAM_BOT_PROVIDER } from './providers';
import { MessageHandlerFactory } from './services';
import { TelegramBotService } from './telegram-bot.service';

@Module({
    providers: [
        LanguageDetectorService,
        TelegramBotService,
        MessageHandlerFactory,
        TELEGRAM_BOT_PROVIDER
    ]
})
export class TelegramBotModule {}
