import { Injectable } from '@nestjs/common';
import type LanguageDetect from 'languagedetect';

@Injectable()
export class LanguageDetectorService {
    private readonly detector: LanguageDetect;
    private readonly ruLanguageKey = 'ru';

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const LanguageDetect = require('languagedetect');
        this.detector = new LanguageDetect();

        this.detector.setLanguageType('iso2');
    }

    public isRussian(text: string): boolean {
        const [language] = this.detector.detect(text, 1);

        return language?.[0] === this.ruLanguageKey;
    }
}
