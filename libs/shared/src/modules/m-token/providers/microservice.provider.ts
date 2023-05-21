import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { M_TOKEN_ENVIRONMENT_KEY } from '../data';
import { TOKEN_MICROSERVICE } from '../tokens';

export const TOKEN_MICROSERVICE_PROVIDER: Provider = {
    provide: TOKEN_MICROSERVICE,
    useFactory: () =>
        ClientProxyFactory.create({
            options: {
                host: process.env[M_TOKEN_ENVIRONMENT_KEY.TokenMicroserviceHost],
                port: +process.env[M_TOKEN_ENVIRONMENT_KEY.TokenMicroservicePort]
            },
            transport: Transport.TCP
        })
};
