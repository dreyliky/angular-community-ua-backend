import { Injectable } from '@nestjs/common';
import { map, Observable, retry } from 'rxjs';
import {
    adaptStackblitzEntitiesToProjectEntities,
    normalizeSourceUrl
} from '../adapters';
import { StackblitzApi } from '../api';
import { validateSourceUrl } from '../helpers';
import { StackblitzProjectParser } from '../parsers';
import { ProjectEntity } from '../types';

@Injectable()
export class SourceCodeService {
    constructor(
        private readonly stackblitzApi: StackblitzApi,
        private readonly stackblitzProjectParser: StackblitzProjectParser
    ) {}

    public get(sourceUrl: string): Observable<ProjectEntity[]> {
        validateSourceUrl(sourceUrl);

        const stackblitzUrl = normalizeSourceUrl(sourceUrl);

        return this.stackblitzApi.getStackblitzHtml(stackblitzUrl).pipe(
            map((html) => this.stackblitzProjectParser.parse(html)),
            map((data) => adaptStackblitzEntitiesToProjectEntities(data)),
            retry({ delay: 700, count: 10 })
        );
    }
}
