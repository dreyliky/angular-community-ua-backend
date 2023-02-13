import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppFile, AppFolder } from './interfaces';
import { SourceCodeService } from './source-code.service';

@Controller('source-code')
export class SourceCodeController {
    constructor(
        private readonly sourceCodeService: SourceCodeService
    ) {}

    @Get()
    public get(
        @Query('url') sourceUrl: string
    ): Observable<Array<AppFile | AppFolder>> {
        return this.sourceCodeService.get(sourceUrl);
    }
}
