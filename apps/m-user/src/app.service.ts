import { UserDto } from '@acua/shared/m-user';
import { User, UserDocument } from '@acua/shared/m-user/schemas';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { adaptUserToUserDto } from './adapters';

@Injectable()
export class AppService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    public async getById(id: Types.ObjectId): Promise<UserDto> {
        const userDocument = await this.userModel.findOne({ _id: id }).exec();

        if (!userDocument) {
            throw new NotFoundException();
        }

        return adaptUserToUserDto(userDocument);
    }

    public async getByTgId(tgId: number): Promise<UserDto> {
        const userDocument = await this.userModel.findOne({ tgId: tgId }).exec();

        if (!userDocument) {
            throw new NotFoundException();
        }

        return adaptUserToUserDto(userDocument);
    }

    public async update(userData: User): Promise<unknown> {
        return await this.userModel.updateOne({ tgId: userData.tgId }, userData);
    }

    public async createOrUpdate(userData: User): Promise<unknown> {
        const tgId = userData.tgId;
        const user = await this.userModel.findOne({ tgId: tgId }).exec();

        if (user) {
            return await this.update(userData);
        }

        const createdUser = new this.userModel(userData);

        return await createdUser.save();
    }
}
