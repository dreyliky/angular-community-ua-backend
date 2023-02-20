import { Injectable } from '@nestjs/common';
import { normalizeSourceUrl } from '../adapters';
import { validateSourceUrl } from '../helpers';

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
