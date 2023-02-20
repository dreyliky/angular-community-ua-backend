import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { UserResponseDto } from './models';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users/me')
@Controller('users/me')
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    @ApiOkResponse({ type: UserResponseDto })
    @ApiResponse({
        status: HttpStatusCode.Ok,
        description:
            'The user with the specified ID has been successfully retrieved.',
        type: User
    })
    @ApiResponse({
        status: 401,
        description: 'User not found.'
    })
    public getById(@Param('id') id: number): Promise<UserResponseDto> {
        return this.usersService.findOne(id);
    }
}
