import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { M_USER_ENVIRONMENT_KEY } from '../data';
import { USER_MICROSERVICE } from '../tokens';

export const USER_MICROSERVICE_PROVIDER: Provider = {
    provide: USER_MICROSERVICE,
    useFactory: () =>
        ClientProxyFactory.create({
            options: {
                host: process.env[M_USER_ENVIRONMENT_KEY.UserMicroserviceHost],
                port: +process.env[M_USER_ENVIRONMENT_KEY.UserMicroservicePort]
            },
            transport: Transport.TCP
        })
};
