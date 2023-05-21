import { ProjectEntity, ProjectFile, ProjectFolder } from '@acua/shared/code-review';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewRequestSourceCodeService } from '../services';

@ApiTags('Source Code')
@Controller('review-requests')
export class ReviewRequestSourceCodeController {
    constructor(private readonly sourceCodeService: ReviewRequestSourceCodeService) {}

    @Get(':id/source-code')
    @ApiOperation({ summary: 'Get array of project files and folders (source code)' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'File object',
        type: ProjectFile,
        isArray: true
    })
    @ApiResponse({
        description: 'Folder object',
        type: ProjectFolder,
        isArray: true
    })
    public getAll(@Param('id') reviewRequestId: string): Promise<ProjectEntity[]> {
        return this.sourceCodeService.get(reviewRequestId);
    }
}
