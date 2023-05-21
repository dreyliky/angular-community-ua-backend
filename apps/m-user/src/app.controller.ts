import { CommandEnum, UserDto } from '@acua/shared/m-user';
import { Schema } from '@acua/shared/mongo';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { adaptUserToUserDto } from './adapters';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(CommandEnum.GetById)
    public async getUserById(id: Types.ObjectId): Promise<Schema.UserDoc> {
        return this.appService.getById(id);
    }

    @MessagePattern(CommandEnum.GetByTgId)
    public async getUserByTgId(tgId: number): Promise<Schema.UserDoc> {
        return this.appService.getByTgId(tgId);
    }

    @MessagePattern(CommandEnum.Create)
    public async createOrUpdateUser(userData: Schema.User): Promise<unknown> {
        return this.appService.createOrUpdate(userData);
    }

    @MessagePattern(CommandEnum.AdaptToDto)
    public async adaptUserToDto(userDocument: Schema.User): Promise<UserDto> {
        return adaptUserToUserDto(userDocument);
    }
}
