import { ReviewRequestStatusEnum } from '@acua/shared/code-review';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument, SchemaTypes, now } from 'mongoose';
import { User } from '../main/user.schema';

@Schema({ collection: 'cr-review-requests' })
export class ReviewRequest {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public user?: User;

    @Prop()
    @IsNotEmpty()
    public title: string;

    @Prop()
    public description: string;

    @Prop({ type: Number, enum: ReviewRequestStatusEnum, default: ReviewRequestStatusEnum.Opened })
    public status?: ReviewRequestStatusEnum;

    @Prop()
    public sourceUrl: string;

    @Prop({ default: now() })
    public date?: Date;
}

export type ReviewRequestDoc = HydratedDocument<ReviewRequest>;
