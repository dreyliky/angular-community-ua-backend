import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        console.log(this.userModel);
        this.create();
    }

    public async create(): Promise<User> {
        const createdUser = new this.userModel({ age: 123, name: 'Test' });

        return createdUser.save();
    }
}
