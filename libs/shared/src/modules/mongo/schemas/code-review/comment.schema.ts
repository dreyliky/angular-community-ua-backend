import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, now } from 'mongoose';
import { User } from '../main';
import { CrReviewRequest } from './review-request.schema';

@Schema({ collection: 'cr-review-request-comments' })
export class CrReviewRequestComment {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public reviewer: User;

    @Prop({ type: SchemaTypes.ObjectId, ref: CrReviewRequest.name })
    public readonly reviewRequest: CrReviewRequest;

    @Prop()
    public readonly fileFullPath: string;

    @Prop()
    public readonly lineNumber: number;

    @Prop()
    public readonly message: string;

    @Prop({ default: now() })
    public readonly date: Date;
}

export type CrReviewRequestCommentDocument = HydratedDocument<CrReviewRequestComment>;

export const CrReviewRequestCommentSchema = SchemaFactory.createForClass(CrReviewRequestComment);
