import { Controller, Get } from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    @Get('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public get(@Req() request: any): Promise<unknown> {
        return request.body;
    }
}
