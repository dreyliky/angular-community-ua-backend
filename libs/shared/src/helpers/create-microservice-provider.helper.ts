import { Provider } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ServiceConfiguration } from '../interfaces';

export function createMicroserviceProvider(
    token: string,
    config: ServiceConfiguration
): Provider<ClientProxy> {
    return {
        provide: token,
        useFactory: () => {
            return ClientProxyFactory.create({
                options: {
                    host: config.host,
                    port: config.port
                },
                transport: Transport.TCP
            });
        }
    };
}
