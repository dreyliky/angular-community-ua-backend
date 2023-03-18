import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { adaptUserToUserDto } from './adapters';
import { UserDto } from './models';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    public async findOneByTgId(tgId: number): Promise<unknown> {
        return await this.userModel.findOne({ tgId: tgId }).exec();
    }

    public async findOneById(id: Types.ObjectId): Promise<unknown> {
        return await this.userModel.findOne({ _id: id }).exec();
    }

    public async update(userData: User): Promise<unknown> {
        return await this.userModel.updateOne(
            { tgId: userData.tgId },
            userData
        );
    }

    public async createOrUpdate(userData: User): Promise<unknown> {
        const tgId = userData.tgId;
        const user = await this.findOneByTgId(tgId);

        if (user) {
            return await this.update(userData);
        }

        const createdUser = new this.userModel(userData);

        return await createdUser.save();
    }

    public async getUserByTgId(tgId: number): Promise<UserDto> {
        const userResponse = await this.findOneByTgId(tgId);

        if (!userResponse) {
            throw new NotFoundException('404 NotFoundException');
        }

        const user = this.getUserDto(userResponse as UserDocument);

        return user;
    }

    public getUserDto(userDocument: UserDocument): UserDto {
        return adaptUserToUserDto(userDocument);
    }
}
