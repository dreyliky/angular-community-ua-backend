import { HttpExceptionDto } from '@acua/shared';
import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto, TelegramLoginDto } from './dto';
import { LoginViaTelegramService } from './login-via-telegram.service';

@Controller('login')
@ApiTags('Login')
export class LoginController {
    constructor(private readonly loginService: LoginViaTelegramService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiOperation({
        summary: 'Login to App via Telegram Login Widget Response'
    })
    @ApiResponse({
        description: `Returns Bearer Token`,
        status: HttpStatus.OK,
        type: LoginResponseDto
    })
    @ApiResponse({
        description: `Invalid data passed (fields don't match with hash)`,
        status: HttpStatus.BAD_REQUEST,
        type: HttpExceptionDto
    })
    @ApiResponse({
        description: `Something went wrong in internal logic`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        type: HttpExceptionDto
    })
    public login(@Body() data: TelegramLoginDto): Promise<LoginResponseDto> {
        return this.loginService.login(data);
    }
}
