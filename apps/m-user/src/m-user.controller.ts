import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { adaptUserToUserDto } from './adapters';
import { MUserService } from './m-user.service';
import { UserDto } from './models';
import { User } from './schemas';

@Controller()
export class MUserController {
    constructor(private readonly mUserService: MUserService) {}

    @MessagePattern('user_by_id')
    public async getUserById(id: Types.ObjectId): Promise<unknown> {
        return this.mUserService.findOneById(id);
    }

    @MessagePattern('user_by_tg_id')
    public async getUserByTgId(tgId: number): Promise<unknown> {
        return this.mUserService.findOneByTgId(tgId);
    }

    @MessagePattern('create_user')
    public async createOrUpdateUser(userData: User): Promise<unknown> {
        return this.mUserService.createOrUpdate(userData);
    }

    @MessagePattern('adapt_user_to_dto_one')
    public async adaptUserToDtoOne(userDocument: User): Promise<UserDto> {
        return adaptUserToUserDto(userDocument);
    }
}
