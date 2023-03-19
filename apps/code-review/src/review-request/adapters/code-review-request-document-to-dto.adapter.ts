import { UserDocument } from '@acua/shared/user';
import { adaptUserToUserDto } from '@acua/shared/user/adapters';
import { CodeReviewRequestDto } from '../models';
import { CodeReviewRequestDocument } from './../schemas';

export function adaptCodeReviewRequestDocumentToDtoOne(
    data: CodeReviewRequestDocument
): CodeReviewRequestDto {
    const user = adaptUserToUserDto(data.userId as unknown as UserDocument);

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
