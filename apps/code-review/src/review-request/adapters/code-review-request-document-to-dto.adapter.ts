import { UserDto } from '@acua/shared/m-user';
import { CodeReviewRequestDto } from '../models';
import { CodeReviewRequestDocument } from './../schemas';

export function adaptCodeReviewRequestDocumentToDtoOne(
    data: CodeReviewRequestDocument,
    user: UserDto
): CodeReviewRequestDto {
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
