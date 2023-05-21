import { CommentAmountDictionaryDto } from '@acua/common/code-review';
import { Schema } from '@acua/shared/mongo';

export function adaptCommentDocumentsToAmountDictionary(
    commentDocuments: Schema.Cr.ReviewRequestCommentDoc[]
): CommentAmountDictionaryDto {
    const result: CommentAmountDictionaryDto = {};

    commentDocuments.forEach(({ fileFullPath, lineNumber }) => {
        if (!result[fileFullPath]) {
            result[fileFullPath] = {};
        }

        if (!result[fileFullPath][lineNumber]) {
            result[fileFullPath][lineNumber] = 0;
        }

        result[fileFullPath][lineNumber] += 1;
    });

    return result;
}
