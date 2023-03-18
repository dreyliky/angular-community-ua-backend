import { User } from '@acua/shared/user';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument, now, SchemaTypes, Types } from 'mongoose';
import { CodeReviewRequestStatusEnum as ReviewStatus } from '../enums';

@Schema()
export class CodeReviewRequest {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public userId?: Types.ObjectId;

    @Prop()
    @IsNotEmpty()
    public title: string;

    @Prop()
    public description: string;

    @Prop({ type: String, enum: ReviewStatus, default: ReviewStatus.Opened })
    public status?: ReviewStatus;

    @Prop()
    public sourceUrl: string;

    @Prop({ default: now() })
    public date?: Date;
}

export type CodeReviewRequestDocument = HydratedDocument<CodeReviewRequest>;

export const CodeReviewRequestSchema = SchemaFactory.createForClass(CodeReviewRequest);
