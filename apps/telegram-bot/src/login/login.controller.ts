import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginViaTelegramService } from './login-via-telegram.service';
import { TelegramLoginResponseDto } from './models';

@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService: LoginViaTelegramService
    ) {}

    @Post()
    @UsePipes(new ValidationPipe())
    public login(@Body() loginDataResponse: TelegramLoginResponseDto): Promise<string> {
        return this.loginService.login(loginDataResponse);
    }
}
