import { LoggerModule } from '@acua/shared/logger';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LoginModule } from './login';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        LoggerModule,
        MongoModule,
        LoginModule
    ],
    controllers: [AppController]
})
export class AppModule {}
