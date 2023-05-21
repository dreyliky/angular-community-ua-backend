import { UserDto } from '@acua/common/m-user';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from '../main';

@Schema({ collection: 'm-tgbot-review-request-tg-message-refs' })
export class MtgbotReviewRequestTgMessageRef {
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

export type MtgbotReviewRequestTgMessageRefDocument =
    HydratedDocument<MtgbotReviewRequestTgMessageRef>;

export const MtgbotReviewRequestTgMessageRefSchema = SchemaFactory.createForClass(
    MtgbotReviewRequestTgMessageRef
);
