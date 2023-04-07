import { Module } from '@nestjs/common';
import { LoginViaTelegramService } from './login-via-telegram.service';
import { LoginController } from './login.controller';

@Module({
    imports: [],
    providers: [
        LoginViaTelegramService
    ],
    controllers: [LoginController]
})
export class LoginModule {}
