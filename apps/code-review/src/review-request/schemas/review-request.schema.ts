import { User } from '@acua/shared/m-user/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument, SchemaTypes, now } from 'mongoose';
import { ReviewRequestStatusEnum as ReviewStatus } from '../enums';

@Schema({ collection: 'cr-review-requests' })
export class ReviewRequest {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public user?: User;

    @Prop()
    @IsNotEmpty()
    public title: string;

    @Prop()
    public description: string;

    @Prop({ type: Number, enum: ReviewStatus, default: ReviewStatus.Opened })
    public status?: ReviewStatus;

    @Prop()
    public sourceUrl: string;

    @Prop({ default: now() })
    public date?: Date;
}

export type ReviewRequestDocument = HydratedDocument<ReviewRequest>;

export const ReviewRequestSchema = SchemaFactory.createForClass(ReviewRequest);
