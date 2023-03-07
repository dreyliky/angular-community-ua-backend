import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    public async findOne(tgId: number): Promise<unknown> {
        return await this.userModel.findOne({ tgId: tgId }).exec();
    }

    public async update(userData: User): Promise<unknown> {
        return await this.userModel.updateOne(
            { tgId: userData.tgId },
            userData
        );
    }

    public async createOrUpdate(userData: User): Promise<unknown> {
        const tgId = userData.tgId;
        const user = await this.findOne(tgId);

        if (user) {
            return await this.update(userData);
        }

        const createdUser = new this.userModel(userData);

        return await createdUser.save();
    }

    public async getUserByTgId(tgId: number): Promise<User> {
        const user = await this.userModel.find({ tgId }).exec();

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user[0];
    }
}
