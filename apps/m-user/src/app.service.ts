import { Schema } from '@acua/shared/mongo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AppService {
    constructor(@InjectModel(Schema.User.name) private userModel: Model<Schema.UserDoc>) {}

    public async getById(id: Types.ObjectId): Promise<Schema.UserDoc> {
        const userDocument = await this.userModel.findOne({ _id: id }).exec();

        if (!userDocument) {
            throw new NotFoundException();
        }

        return userDocument;
    }

    public async getByTgId(tgId: number): Promise<Schema.UserDoc> {
        const userDocument = await this.userModel.findOne({ tgId: tgId }).exec();

        if (!userDocument) {
            throw new NotFoundException();
        }

        return userDocument;
    }

    public async update(userData: Schema.User): Promise<unknown> {
        return await this.userModel.updateOne({ tgId: userData.tgId }, userData);
    }

    public async createOrUpdate(userData: Schema.User): Promise<unknown> {
        const tgId = userData.tgId;
        const user = await this.userModel.findOne({ tgId: tgId }).exec();

        if (user) {
            return await this.update(userData);
        }

        const createdUser = new this.userModel(userData);

        return await createdUser.save();
    }
}
