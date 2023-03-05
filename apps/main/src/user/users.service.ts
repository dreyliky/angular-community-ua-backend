import { TokenService } from '@main/token';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService
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

    public getById(userId: string | number): Partial<unknown> {
        const user = this.userModel.findById(userId);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return user;
    }
}
