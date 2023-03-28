import { Provider } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

export const M_TOKEN_PROVIDER: Provider<ClientProxy> = {
    provide: 'M-TOKEN',
    useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
            options: {
                host: '0.0.0.0',
                port: +configService.get('M_TOKEN_PORT')
            },
            transport: Transport.TCP
        });
    },
    inject: [ConfigService]
};
