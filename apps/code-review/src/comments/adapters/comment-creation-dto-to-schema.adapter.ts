import { User } from '@acua/shared/m-user/schemas';
import { CodeReviewRequest } from '../../review-request/schemas';
import { CommentCreationDto } from '../models';
import { Comment } from '../schemas';

export function adaptCommentCreationDtoToSchema(
    data: CommentCreationDto,
    reviewRequest: CodeReviewRequest,
    user: User
): Partial<Comment> {
    return {
        ...data,
        reviewer: user,
        reviewRequest
    };
}
