export interface CommentAmountDictionaryDto {
    [fileFullPath: string]: {
        [lineNumber: string]: number;
    };
}
