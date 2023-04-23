import { LoggerModule } from '@acua/shared/logger';
import { TokenMicroserviceModule } from '@acua/shared/m-token';
import { UserMicroserviceModule } from '@acua/shared/m-user';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login';
import { UsersModule } from './users';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        LoggerModule,
        MongoModule,
        LoginModule,
        UsersModule,
        UserMicroserviceModule,
        TokenMicroserviceModule
    ]
})
export class AppModule {}
