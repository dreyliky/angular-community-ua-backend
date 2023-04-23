import { User } from '@acua/shared/m-user/schemas';
import { ReviewRequest } from '../../review-request/schemas';
import { CommentCreationDto } from '../models';
import { Comment } from '../schemas';

export function adaptCommentCreationDtoToSchema(
    data: CommentCreationDto,
    reviewRequest: ReviewRequest,
    user: User
): Partial<Comment> {
    return {
        ...data,
        reviewer: user,
        reviewRequest
    };
}
