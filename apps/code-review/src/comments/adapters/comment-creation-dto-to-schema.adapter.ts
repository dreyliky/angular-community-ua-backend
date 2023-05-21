import { CommentCreationDto } from '@acua/shared/code-review';
import { Schema } from '@acua/shared/mongo';

export function adaptCommentCreationDtoToSchema(
    data: CommentCreationDto,
    reviewRequest: Schema.Cr.ReviewRequest,
    user: Schema.User
): Partial<Schema.Cr.ReviewRequestComment> {
    return {
        ...data,
        reviewer: user,
        reviewRequest
    };
}
