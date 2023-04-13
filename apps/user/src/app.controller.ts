import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserMicroservicePattersEnum } from 'libs/shared/src/enums';
import { Types } from 'mongoose';
import { adaptUserToUserDto } from './adapters';
import { AppService } from './app.service';
import { UserDto } from './models';
import { User } from './schemas';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(UserMicroservicePattersEnum.GetById)
    public async getUserById(id: Types.ObjectId): Promise<unknown> {
        return this.appService.findOneById(id);
    }

    @MessagePattern(UserMicroservicePattersEnum.GetByTgId)
    public async getUserByTgId(tgId: number): Promise<unknown> {
        return this.appService.findOneByTgId(tgId);
    }

    @MessagePattern(UserMicroservicePattersEnum.Create)
    public async createOrUpdateUser(userData: User): Promise<unknown> {
        return this.appService.createOrUpdate(userData);
    }

    @MessagePattern(UserMicroservicePattersEnum.AdaptToUserDto)
    public async adaptUserToDtoOne(userDocument: User): Promise<UserDto> {
        return adaptUserToUserDto(userDocument);
    }
}
