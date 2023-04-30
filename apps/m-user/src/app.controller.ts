import { CommandEnum, UserDto } from '@acua/shared/m-user';
import { User, UserDocument } from '@acua/shared/m-user/schemas';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { adaptUserToUserDto } from './adapters';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(CommandEnum.GetById)
    public async getUserById(id: Types.ObjectId): Promise<UserDocument> {
        return this.appService.getById(id);
    }

    @MessagePattern(CommandEnum.GetByTgId)
    public async getUserByTgId(tgId: number): Promise<UserDocument> {
        return this.appService.getByTgId(tgId);
    }

    @MessagePattern(CommandEnum.Create)
    public async createOrUpdateUser(userData: User): Promise<unknown> {
        return this.appService.createOrUpdate(userData);
    }

    @MessagePattern(CommandEnum.AdaptToDto)
    public async adaptUserToDto(userDocument: User): Promise<UserDto> {
        return adaptUserToUserDto(userDocument);
    }
}
