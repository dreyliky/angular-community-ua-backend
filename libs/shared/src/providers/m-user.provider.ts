import { Provider } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

export const M_USER_PROVIDER: Provider<ClientProxy> = {
    provide: 'M-USER',
    useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
            options: {
                host: '0.0.0.0',
                port: +configService.get('M_USER_PORT')
            },
            transport: Transport.TCP
        });
    },
    inject: [ConfigService]
};
