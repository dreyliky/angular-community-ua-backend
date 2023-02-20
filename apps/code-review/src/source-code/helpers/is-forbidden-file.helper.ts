import { FORBIDDEN_PROJECT_FILE_REGEXP_ARRAY } from '../data';

export function isForbiddenFile(fileName: string): boolean {
    return FORBIDDEN_PROJECT_FILE_REGEXP_ARRAY.some((regexp) =>
        regexp.test(fileName)
    );
}
