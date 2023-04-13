import { DynamicModule, Module } from '@nestjs/common';
import { createMicroserviceProvider } from '../../helpers';
import { ServiceConfiguration } from '../../interfaces';
import { TOKEN_MICROSERVICE } from './token-microservice.data';

@Module({})
export class TokenMicroserviceModule {
    public static forRoot(config: ServiceConfiguration): DynamicModule {
        const provider = createMicroserviceProvider(TOKEN_MICROSERVICE, config);

        return {
            module: TokenMicroserviceModule,
            providers: [provider],
            exports: [provider]
        };
    }
}
