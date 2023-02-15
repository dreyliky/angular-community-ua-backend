import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';
import { TelegramLoginResponseDto } from './models';

@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) {}

    @Post()
    @UsePipes(new ValidationPipe())
    public login(@Body() loginDataResponse: TelegramLoginResponseDto): Promise<any> {
        this.loginService.checkTelegramAuth(loginDataResponse);

        return this.loginService.login(loginDataResponse);
    }
}
