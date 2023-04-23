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
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewRequestStatusEnum } from './enums';
import { ReviewRequestCreationDto, ReviewRequestDto } from './models';
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
        const response = await this.reviewRequestDtoService.create(reviewDataRequest, request.user);

        await this.sourceCodeService.downloadAndSaveToDb(response.id);

        return response;
    }

    @Patch(`:id/status/:statusId`)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update code review request status' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Boolean
    })
    @ApiParam({
        name: 'id',
        description: 'Specifies which code review request should be updated',
        type: 'string'
    })
    @ApiParam({
        name: 'statusId',
        description: 'Changes the status of code review request (Opened - 1 | Closed - 2)',
        enum: ReviewRequestStatusEnum
    })
    @ApiBearerAuth()
    public async updateStatus(
        @Param('id') id: string,
        @Param('statusId') status: ReviewRequestStatusEnum
    ): Promise<boolean> {
        await this.reviewRequestDocumentService.editStatus(id, status);

        return true;
    }
}
