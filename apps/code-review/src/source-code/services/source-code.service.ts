import { ProjectEntity, validateSourceUrl } from '@acua/common/code-review';
import { HttpStatus, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Observable, map, retry, throwError, timer } from 'rxjs';
import { adaptStackblitzEntitiesToProjectEntities, normalizeSourceUrl } from '../adapters';
import { StackblitzApi } from '../api';
import { sortProjectEntitiesRecursively } from '../helpers';
import { StackblitzProjectParser } from '../parsers';

@Injectable()
export class SourceCodeService {
    constructor(
        private readonly stackblitzApi: StackblitzApi,
        private readonly stackblitzProjectParser: StackblitzProjectParser
    ) {}

    // eslint-disable-next-line max-lines-per-function
    public get(sourceUrl: string): Observable<ProjectEntity[]> {
        validateSourceUrl(sourceUrl);

        const maxRetries = 10;
        const retryDelay = 1000;
        const stackblitzUrl = normalizeSourceUrl(sourceUrl);

        return this.stackblitzApi.getStackblitzHtml(stackblitzUrl).pipe(
            map((html) => this.stackblitzProjectParser.parse(html)),
            map((data) => adaptStackblitzEntitiesToProjectEntities(data)),
            map((data) => sortProjectEntitiesRecursively(data)),
            retry({
                delay: (error, retryCount) => {
                    // Error might be from parser or from stackblitz (status in different fields)
                    const status = error?.status ?? error?.response?.status;

                    if (status === HttpStatus.NOT_FOUND) {
                        return throwError(
                            () => new NotFoundException(`Can't resolve project information.`)
                        );
                    }

                    if (retryCount >= maxRetries) {
                        return throwError(() => new RequestTimeoutException());
                    }

                    return timer(retryDelay);
                },
                count: maxRetries
            })
        );
    }
}
