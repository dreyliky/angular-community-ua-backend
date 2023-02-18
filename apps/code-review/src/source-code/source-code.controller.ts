import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { normalizeSourceUrl } from './adapters';
import { validateSourceUrl } from './helpers';
import { ProjectFile, ProjectFolder } from './models';
import { SourceCodeService } from './source-code.service';
import { ProjectEntity } from './types';

@ApiTags('source-code')
@Controller('source-code')
export class SourceCodeController {
    constructor(
        private readonly sourceCodeService: SourceCodeService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get "source code" of the project' })
    @ApiQuery({ name: 'url', description: 'Url to Stackblitz or Github' })
    @ApiResponse({
        description: `Returns array with either "folder" [type: 2] & "file" [type: 1] objects.`,
        status: HttpStatus.OK,
        type: ProjectFile
    })
    @ApiResponse({ type: ProjectFolder })
    public get(
        @Query('url') sourceUrl: string
    ): Observable<ProjectEntity[]> {
        return this.sourceCodeService.get(sourceUrl);
    }

    @Get('stackblitz/normalized-url')
    @ApiOperation({ summary: 'Get normalized source url in stackblitz format' })
    @ApiQuery({ name: 'url', description: 'Url to Stackblitz or Github' })
    @ApiResponse({
        description: `Returns normalized source url in stackblitz format.`,
        status: HttpStatus.OK,
        type: String
    })
    public getNormalizedSourceUrl(
        @Query('url') sourceUrl: string
    ): string {
        validateSourceUrl(sourceUrl);

        return normalizeSourceUrl(sourceUrl);
    }
}
