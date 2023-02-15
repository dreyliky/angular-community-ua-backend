import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
    @Prop()
    public tgId: number;

    @Prop()
    public firstName: string;

    @Prop()
    public lastName: string;

    @Prop()
    public username: string;

    @Prop()
    public photoUrl: string;

    @Prop()
    public auth_date: number;

    @Prop()
    public hash: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
