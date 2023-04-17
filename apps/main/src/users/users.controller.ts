import { JwtAuthGuard } from '@acua/shared/m-token';
import { AuthorizedUser, CommandEnum, USER_MICROSERVICE, UserDto } from '@acua/shared/m-user';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { Request } from 'express';
import { Observable } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    private readonly userMicroservice = this.moduleRef.get<ClientProxy>(USER_MICROSERVICE, {
        strict: false
    });

    constructor(private readonly moduleRef: ModuleRef) {}

    @Get('me')
    @ApiOperation({
        summary: 'Get user data who sent the request.'
    })
    @ApiResponse({
        description: ``,
        status: HttpStatusCode.Ok,
        type: UserDto
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    public getMe(@Req() request: Request): Observable<UserDto> {
        const user = request.user as AuthorizedUser;

        return this.userMicroservice.send(CommandEnum.GetByTgId, user.tgId);
    }
}
