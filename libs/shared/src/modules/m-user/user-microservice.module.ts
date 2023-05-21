import { Module } from '@nestjs/common';
import { USER_MICROSERVICE_PROVIDER } from './providers';

@Module({
    providers: [USER_MICROSERVICE_PROVIDER]
})
export class UserMicroserviceModule {}
