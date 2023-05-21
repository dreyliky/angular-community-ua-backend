import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { M_TELEGRAM_BOT_ENVIRONMENT_KEY } from '../data';
import { TG_BOT_MICROSERVICE } from '../tokens';

export const TG_BOT_MICROSERVICE_PROVIDER: Provider = {
    provide: TG_BOT_MICROSERVICE,
    useFactory: () =>
        ClientProxyFactory.create({
            options: {
                host: process.env[M_TELEGRAM_BOT_ENVIRONMENT_KEY.TelegramBotMicroserviceHost],
                port: +process.env[M_TELEGRAM_BOT_ENVIRONMENT_KEY.TelegramBotMicroservicePort]
            },
            transport: Transport.TCP
        })
};
