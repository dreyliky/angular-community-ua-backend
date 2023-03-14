import { Controller, Get } from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizedUser } from './interfaces';
import { UserDto } from './models';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    @ApiTags('users')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public async get(@Req() request: Request): Promise<UserDto> {
        const authorizedUser = request.user as AuthorizedUser;

        return await this.usersService.getUserByTgId(authorizedUser.tgId);
    }
}
