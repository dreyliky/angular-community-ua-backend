import { Injectable } from '@nestjs/common';
import LanguageDetect from 'languagedetect';

@Injectable()
export class LanguageDetectorService {
    private readonly detector = new LanguageDetect();
    private readonly ruLanguageKey = 'ru';

    constructor() {
        this.detector.setLanguageType('iso2');
    }

    public isRussian(text: string): boolean {
        const [language] = this.detector.detect(text, 1);

        return language[0] === this.ruLanguageKey;
    }
}
