import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { TokenModule } from './../token/token.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    imports: [
        UserModule,
        TokenModule
    ],
    providers: [
        LoginService
    ],
    controllers: [LoginController]
})
export class LoginModule {}
