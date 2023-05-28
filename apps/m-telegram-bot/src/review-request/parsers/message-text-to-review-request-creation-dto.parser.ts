import { ReviewRequestCreationDto } from '@acua/shared/code-review';

export function parseMessageTextToReviewRequestCreationDto(text: string): ReviewRequestCreationDto {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];
    const sourceUrl = urls[0] || '';
    const description = text.replace(urlRegex, '').trim();
    const result = {
        description: description,
        sourceUrl: sourceUrl
    };

    Object.setPrototypeOf(result, ReviewRequestCreationDto.prototype);

    return result;
}
