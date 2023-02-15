import { Module } from '@nestjs/common';
import { TokenModule } from '../token';
import { UserModule } from '../user';
import { LoginViaTelegramService } from './login-via-telegram.service';
import { LoginController } from './login.controller';

@Module({
    imports: [
        UserModule,
        TokenModule
    ],
    providers: [
        LoginViaTelegramService
    ],
    controllers: [LoginController]
})
export class LoginModule {}
