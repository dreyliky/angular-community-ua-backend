import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
    @Prop()
    public readonly tgId: number;

    @Prop()
    public readonly firstName: string;

    @Prop()
    public readonly lastName: string;

    @Prop()
    public readonly username: string;

    @Prop()
    public readonly photoUrl: string;

    @Prop()
    public readonly auth_date: number;

    @Prop()
    public readonly accessToken: string;
}

export type UserDoc = HydratedDocument<User>;
