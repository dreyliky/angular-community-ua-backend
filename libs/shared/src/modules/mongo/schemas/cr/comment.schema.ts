import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, now } from 'mongoose';
import { User } from '../main';
import { ReviewRequest } from './review-request.schema';

@Schema({ collection: 'cr-review-request-comments' })
export class ReviewRequestComment {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public reviewer: User;

    @Prop({ type: SchemaTypes.ObjectId, ref: ReviewRequest.name })
    public readonly reviewRequest: ReviewRequest;

    @Prop()
    public readonly fileFullPath: string;

    @Prop()
    public readonly lineNumber: number;

    @Prop()
    public readonly message: string;

    @Prop({ default: now() })
    public readonly date: Date;
}

export type ReviewRequestCommentDoc = HydratedDocument<ReviewRequestComment>;
