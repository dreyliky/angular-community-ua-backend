import { Module } from '@nestjs/common';
import { TOKEN_MICROSERVICE_PROVIDER } from './providers';

@Module({
    providers: [TOKEN_MICROSERVICE_PROVIDER]
})
export class TokenMicroserviceModule {}
