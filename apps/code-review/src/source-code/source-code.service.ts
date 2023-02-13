import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { normalizeSourceUrl } from './adapters';
import { StackblitzApi } from './api';
import { validateSourceUrl } from './helpers';
import { AppFile, AppFolder } from './interfaces';
import { StackblitzProjectParser } from './parsers';

@Injectable()
export class SourceCodeService {
    constructor(
        private readonly stackblitzApi: StackblitzApi,
        private readonly stackblitzProjectParser: StackblitzProjectParser
    ) {}

    public get(sourceUrl: string): Observable<Array<AppFile | AppFolder>> {
        validateSourceUrl(sourceUrl);

        const stackblitzUrl = normalizeSourceUrl(sourceUrl);

        return this.stackblitzApi.getStackblitzHtml(stackblitzUrl)
            .pipe(
                map((html) => this.stackblitzProjectParser.parse(html))
            );
    }
}
