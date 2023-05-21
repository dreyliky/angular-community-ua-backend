import { EnvModule } from '@acua/shared/env';
import { LoggerModule } from '@acua/shared/logger';
import { TokenMicroserviceModule } from '@acua/shared/m-token';
import { UserMicroserviceModule } from '@acua/shared/m-user';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { LoginModule } from './login';
import { UsersModule } from './users';

@Module({
    imports: [
        EnvModule,
        LoggerModule,
        MongoModule.forRoot(),
        LoginModule,
        UsersModule,
        UserMicroserviceModule,
        TokenMicroserviceModule
    ]
})
export class AppModule {}
