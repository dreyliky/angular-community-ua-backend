import { DynamicModule, Module } from '@nestjs/common';
import { createMicroserviceProvider } from '../../helpers';
import { ServiceConfiguration } from '../../interfaces';
import { USER_MICROSERVICE } from './user-microservice.data';

@Module({})
export class UserMicroserviceModule {
    public static forRoot(config: ServiceConfiguration): DynamicModule {
        const provider = createMicroserviceProvider(USER_MICROSERVICE, config);

        return {
            module: UserMicroserviceModule,
            providers: [provider],
            exports: [provider]
        };
    }
}
