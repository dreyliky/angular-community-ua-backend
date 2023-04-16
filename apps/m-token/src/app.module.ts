import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JWT_MODULE_CONFIG } from './constants';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        JwtModule.register(JWT_MODULE_CONFIG)
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
