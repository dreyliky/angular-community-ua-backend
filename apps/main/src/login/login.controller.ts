import { HttpExceptionDto } from '@acua/shared';
import {
    Body,
    Controller,
    HttpStatus,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginViaTelegramService } from './login-via-telegram.service';
import { TelegramLoginResponseDto } from './models';

@ApiTags('login')
@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginViaTelegramService) {}

    // eslint-disable-next-line max-lines-per-function
    @Post()
    @ApiOperation({
        summary: 'Login to App via Telegram Login Widget Response'
    })
    @ApiResponse({
        description: `Returns Bearer Token`,
        status: HttpStatus.OK,
        type: String
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
    @UsePipes(new ValidationPipe())
    public login(
        @Body() loginDataResponse: TelegramLoginResponseDto
    ): Promise<string> {
        return this.loginService.login(loginDataResponse);
    }
}
