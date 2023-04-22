import { User } from '@acua/shared/m-user/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, now } from 'mongoose';
import { CodeReviewRequest } from '../../review-request/schemas';

@Schema()
export class Comment {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public reviewer: User;

    @Prop({ type: SchemaTypes.ObjectId, ref: CodeReviewRequest.name })
    public readonly reviewRequest: CodeReviewRequest;

    @Prop()
    public readonly fileFullPath: string;

    @Prop()
    public readonly lineNumber: number;

    @Prop()
    public readonly message: string;

    @Prop({ default: now() })
    public readonly date: string;
}

export type CommentDocument = HydratedDocument<Comment>;

export const CommentSchema = SchemaFactory.createForClass(Comment);
