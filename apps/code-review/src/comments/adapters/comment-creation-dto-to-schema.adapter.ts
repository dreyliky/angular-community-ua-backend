import { CommentCreationDto } from '@acua/common/code-review';
import { CrReviewRequest, CrReviewRequestComment, User } from '@acua/shared/mongo';

export function adaptCommentCreationDtoToSchema(
    data: CommentCreationDto,
    reviewRequest: CrReviewRequest,
    user: User
): Partial<CrReviewRequestComment> {
    return {
        ...data,
        reviewer: user,
        reviewRequest
    };
}
