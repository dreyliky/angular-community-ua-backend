import { ReviewRequestDto } from '@acua/common/code-review';
import { UserDto } from '@acua/common/m-user';
import { Schema } from '@acua/shared/mongo';

export function adaptReviewRequestDocumentToDto(
    data: Schema.Cr.ReviewRequestDoc,
    user: UserDto
): ReviewRequestDto {
    return {
        id: data._id.toString(),
        user: user,
        description: data.description,
        status: data.status,
        sourceUrl: data.sourceUrl,
        date: data.date
    };
}
