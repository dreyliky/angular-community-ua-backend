import { Module } from '@nestjs/common';
import { TG_BOT_MICROSERVICE_PROVIDER } from './providers';

@Module({
    providers: [TG_BOT_MICROSERVICE_PROVIDER]
})
export class TelegramBotMicroserviceModule {}
