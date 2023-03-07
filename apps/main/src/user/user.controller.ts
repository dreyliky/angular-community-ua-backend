import { Controller, Get } from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizedUser } from './interfaces';

@Controller('users')
export class UserController {
    @Get('me')
    @ApiTags('users')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public get(@Req() request: Request): AuthorizedUser {
        const authorizedUser = request.user as AuthorizedUser;

        return authorizedUser;
    }
}
