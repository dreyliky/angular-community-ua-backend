import { CommentAmountDictionaryDto } from '../interfaces';
import { CommentDocument } from '../schemas';

export function adaptCommentDocumentsToAmountDictionary(
    commentDocuments: CommentDocument[]
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
