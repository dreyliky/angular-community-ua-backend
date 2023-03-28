import { ServiceUserDto } from '@acua/shared';
import { CodeReviewRequestDto } from '../models';
import { CodeReviewRequestDocument } from './../schemas';

export function adaptCodeReviewRequestDocumentToDtoOne(
    data: CodeReviewRequestDocument,
    user: ServiceUserDto
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
