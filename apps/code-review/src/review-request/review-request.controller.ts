import { AuthorizedRequest, CreationResponseDto } from '@acua/shared';
import { JwtAuthGuard } from '@acua/shared/m-token';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    ReviewRequestCreationDto,
    ReviewRequestDto,
    ReviewRequestFiltersDto,
    ReviewRequestUpdateDto
} from './models';
import {
    ReviewRequestDocumentService,
    ReviewRequestDtoService,
    ReviewRequestSourceCodeService
} from './services';

@ApiTags('Review Requests')
@Controller('review-requests')
export class ReviewRequestController {
    constructor(
        private readonly reviewRequestDtoService: ReviewRequestDtoService,
        private readonly reviewRequestDocumentService: ReviewRequestDocumentService,
        private readonly sourceCodeService: ReviewRequestSourceCodeService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get list of code review requests' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: ReviewRequestDto,
        isArray: true
    })
    public getAll(): Promise<ReviewRequestDto[]> {
        return this.reviewRequestDtoService.getAll();
    }

    @Get(`/my`)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Get all review requests of authorized user'
    })
    @ApiResponse({
        description: `Returns code review requests`,
        status: HttpStatus.OK,
        type: ReviewRequestDto,
        isArray: true
    })
    @ApiBearerAuth()
    public getAllMy(@Req() request: AuthorizedRequest): Promise<ReviewRequestDto[]> {
        return this.reviewRequestDtoService.getAllMy(request.user.tgId);
    }

    @Get(`/filter`)
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    @ApiOperation({
        summary: 'Get multiple review requests filtered by fields'
    })
    @ApiResponse({
        description: `Returns filtered code review requests`,
        status: HttpStatus.OK,
        type: ReviewRequestDto,
        isArray: true
    })
    public getMultipleFiltered(
        @Query() filters: ReviewRequestFiltersDto
    ): Promise<ReviewRequestDto[]> {
        return this.reviewRequestDtoService.getMultipleFiltered(filters);
    }

    @Get(`:id`)
    @ApiOperation({
        summary: 'Get particular code review request by specifying its id as param'
    })
    @ApiResponse({
        description: `Returns code review request`,
        status: HttpStatus.OK,
        type: ReviewRequestDto
    })
    @ApiParam({
        name: 'id',
        description: 'Specifies which code review request to retrieve',
        type: 'string'
    })
    public get(@Param('id') id: string): Promise<ReviewRequestDto> {
        return this.reviewRequestDtoService.get(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    @ApiOperation({ summary: 'Create a new code review request' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: CreationResponseDto
    })
    @ApiBearerAuth()
    public async create(
        @Req() request: AuthorizedRequest,
        @Body() reviewDataRequest: ReviewRequestCreationDto
    ): Promise<CreationResponseDto> {
        return this.sourceCodeService.downloadAndSaveToDb(request.user, reviewDataRequest);
    }

    @Patch(`:id`)
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    @ApiOperation({ summary: 'Update review request' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Boolean
    })
    @ApiParam({
        name: 'id',
        description: 'Specifies which code review request should be updated',
        type: 'string'
    })
    @ApiBearerAuth()
    public async edit(
        @Param('id') id: string,
        @Body() data: ReviewRequestUpdateDto,
        @Req() request: AuthorizedRequest
    ): Promise<boolean> {
        await this.reviewRequestDocumentService.edit(id, request.user, data);

        return true;
    }
}
