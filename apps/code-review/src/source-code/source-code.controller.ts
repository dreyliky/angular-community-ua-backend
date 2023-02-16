import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
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
}
