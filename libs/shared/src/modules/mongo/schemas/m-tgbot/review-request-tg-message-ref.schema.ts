import { UserDto } from '@acua/shared/m-user';
import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { ReviewRequestDto } from '../../../code-review';
import { ReviewRequest } from '../cr';
import { User } from '../main';

@Schema({ collection: 'm-tgbot-review-request-tg-message-refs' })
export class ReviewRequestTgMessageRef {
    @Prop()
    public tgMessageId: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: ReviewRequest.name })
    public reviewRequest: ReviewRequestDto;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public user: UserDto;

    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: User.name }], default: [] })
    public reviewers: UserDto[];

    @Prop({ type: Number, default: 0 })
    public commentAmount: number;
}

export type ReviewRequestTgMessageRefDoc = HydratedDocument<ReviewRequestTgMessageRef>;
