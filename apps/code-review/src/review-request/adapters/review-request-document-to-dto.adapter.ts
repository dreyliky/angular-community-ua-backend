import { UserDto } from '@acua/shared/m-user';
import { ReviewRequestDto } from '../models';
import { ReviewRequestDocument } from '../schemas';

export function adaptReviewRequestDocumentToDto(
    data: ReviewRequestDocument,
    user: UserDto
): ReviewRequestDto {
    return {
        id: data._id.toString(),
        user: user,
        title: data.title,
        description: data.description,
        status: data.status,
        sourceUrl: data.sourceUrl,
        date: data.date
    };
}
