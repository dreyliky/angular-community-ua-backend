import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument, SchemaTypes, now } from 'mongoose';
// import { ReviewRequestStatusEnum as ReviewStatus } from '../enums';
import { User } from '../main/user.schema';

@Schema({ collection: 'cr-review-requests' })
export class CrReviewRequest {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public user?: User;

    @Prop()
    @IsNotEmpty()
    public title: string;

    @Prop()
    public description: string;

    // FIXME: Replace to ENUM
    // @Prop({ type: Number, enum: ReviewStatus, default: ReviewStatus.Opened })
    @Prop({ type: Number })
    public status?: number;

    @Prop()
    public sourceUrl: string;

    @Prop({ default: now() })
    public date?: Date;
}

export type CrReviewRequestDocument = HydratedDocument<CrReviewRequest>;

export const CrReviewRequestSchema = SchemaFactory.createForClass(CrReviewRequest);
