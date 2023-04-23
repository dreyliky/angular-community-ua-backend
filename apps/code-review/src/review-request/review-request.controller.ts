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
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewRequestStatusEnum } from './enums';
import { ReviewRequestCreationDto, ReviewRequestDto } from './models';
import { ReviewRequestDocumentService, ReviewRequestDtoService } from './services';

@ApiTags('Review Requests')
@Controller('review-requests')
export class ReviewRequestController {
    constructor(
        private readonly reviewRequestDtoService: ReviewRequestDtoService,
        private readonly reviewRequestDocumentService: ReviewRequestDocumentService
    ) {}

    @ApiOperation({ summary: 'Get list of code review requests' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: ReviewRequestDto,
        isArray: true
    })
    @Get()
    public getAll(): Promise<ReviewRequestDto[]> {
        return this.reviewRequestDtoService.getAll();
    }

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
    @Get(`:id`)
    public get(@Param('id') id: string): Promise<ReviewRequestDto> {
        return this.reviewRequestDtoService.get(id);
    }

    @ApiOperation({ summary: 'Create a new code review request' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: CreationResponseDto
    })
    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    public create(
        @Req() request: AuthorizedRequest,
        @Body() reviewDataRequest: ReviewRequestCreationDto
    ): Promise<CreationResponseDto> {
        return this.reviewRequestDtoService.create(reviewDataRequest, request.user);
    }

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
    @Patch(`:id/status/:statusId`)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    public async updateStatus(
        @Param('id') id: string,
        @Param('statusId') status: ReviewRequestStatusEnum
    ): Promise<boolean> {
        await this.reviewRequestDocumentService.editStatus(id, status);

        return true;
    }
}
