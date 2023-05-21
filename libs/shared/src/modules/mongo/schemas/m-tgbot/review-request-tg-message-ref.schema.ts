import { UserDto } from '@acua/shared/m-user';
import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from '../main';

@Schema({ collection: 'm-tgbot-review-request-tg-message-refs' })
export class ReviewRequestTgMessageRef {
    @Prop()
    public tgMessageId: number;

    @Prop()
    public reviewRequestId: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public user: UserDto;

    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: User.name }] })
    public reviewers: UserDto[];

    @Prop()
    public commentAmount: number;
}

export type ReviewRequestTgMessageRefDoc = HydratedDocument<ReviewRequestTgMessageRef>;
