import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_MODULE_CONFIG } from './constants';
import { TokenService } from './token.service';

@Module({
    imports: [JwtModule.register(JWT_MODULE_CONFIG)],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {}
