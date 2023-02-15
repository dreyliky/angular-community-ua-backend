import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_MODULE_CONFIG } from './constants';
import { Token, TokenSchema } from './token.entity';
import { TokenService } from './token.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
        JwtModule.register(JWT_MODULE_CONFIG)
    ],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {}
