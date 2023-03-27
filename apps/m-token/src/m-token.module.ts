import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_MODULE_CONFIG } from './constants';
import { MTokenService } from './m-token.service';
import { MTokenController } from './m-user.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        JwtModule.register(JWT_MODULE_CONFIG)
    ],
    controllers: [MTokenController],
    providers: [MTokenService]
})
export class MTokenModule {}
