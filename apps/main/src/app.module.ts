import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LoginModule } from './login';
import { MongoModule } from './mongo';
import { UserModule } from './user';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        MongoModule,
        LoginModule,
        UserModule
    ],
    controllers: [AppController]
})
export class AppModule {}
