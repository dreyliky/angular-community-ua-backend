import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SourceUrlService } from './services';

@ApiTags('source-url')
@Controller('source-url')
export class SourceUrlController {
    constructor(private readonly sourceUrlService: SourceUrlService) {}

    @Get('stackblitz/normalized')
    @ApiOperation({ summary: 'Get normalized source url in stackblitz format' })
    @ApiQuery({ name: 'url', description: 'Url to Stackblitz or Github' })
    @ApiResponse({
        description: `Returns normalized source url in stackblitz format.`,
        status: HttpStatus.OK,
        type: String
    })
    public getNormalized(@Query('url') sourceUrl: string): string {
        return this.sourceUrlService.getNormalized(sourceUrl);
    }

    @Get('validate')
    @ApiOperation({ summary: 'Validate source url' })
    @ApiQuery({ name: 'url', description: 'Url to Stackblitz or Github' })
    @ApiResponse({
        description: `Returns normalized source url in stackblitz format.`,
        status: HttpStatus.OK,
        type: Boolean
    })
    public validate(@Query('url') sourceUrl: string): boolean {
        return this.sourceUrlService.validate(sourceUrl);
    }
}
