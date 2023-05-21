import { validateSourceUrl } from '@acua/common/code-review';
import { Injectable } from '@nestjs/common';
import { normalizeSourceUrl } from '../adapters';

@Injectable()
export class SourceUrlService {
    public getNormalized(sourceUrl: string): string {
        validateSourceUrl(sourceUrl);

        return normalizeSourceUrl(sourceUrl);
    }

    public validate(sourceUrl: string): boolean {
        try {
            validateSourceUrl(sourceUrl);
        } catch (error) {
            return false;
        }

        return true;
    }
}
