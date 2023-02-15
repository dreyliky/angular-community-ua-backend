import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.entity';
import { TokenService } from './token.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
        JwtModule.register({
            secret: 'Fx4rquOfxR7TFLS89DbsZRzgoSQW2A'
        })
    ],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {}
