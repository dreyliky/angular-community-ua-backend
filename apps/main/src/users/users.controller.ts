import { JwtAuthGuard } from '@acua/common/m-token';
import { UserDto } from '@acua/common/m-user';
import { AuthorizedRequest } from '@acua/shared';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { UsersService } from './services';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Get user data who sent the request.'
    })
    @ApiResponse({
        description: ``,
        status: HttpStatusCode.Ok,
        type: UserDto
    })
    @ApiBearerAuth()
    public getMe(@Req() request: AuthorizedRequest): Promise<UserDto> {
        return this.usersService.getMe(request.user.tgId);
    }
}
