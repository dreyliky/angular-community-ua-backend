import { M_TOKEN_PROVIDER, M_USER_PROVIDER } from '@acua/shared';
import { Module } from '@nestjs/common';
import { LoginViaTelegramService } from './login-via-telegram.service';
import { LoginController } from './login.controller';

@Module({
    imports: [],
    providers: [
        LoginViaTelegramService,
        M_USER_PROVIDER,
        M_TOKEN_PROVIDER
    ],
    controllers: [LoginController]
})
export class LoginModule {}
