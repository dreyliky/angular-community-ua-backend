import { Controller, Get } from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizedUser } from './interfaces';

@Controller('users')
export class UserController {
    @Get('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public get(@Req() request: Request): Promise<unknown> {
        const authorizedUser = request.user as AuthorizedUser;
        console.log('authorizedUserInfo', authorizedUser);

        return request.body;
    }
}
