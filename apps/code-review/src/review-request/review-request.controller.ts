import { AuthorizedRequest } from '@acua/shared';
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
import { CodeReviewRequestStatusEnum } from './enums';
import { CodeReviewCreationDto, CodeReviewRequestDto } from './models';
import { ReviewRequestService } from './services';

@ApiTags('Review Requests')
@Controller('review-requests')
export class ReviewRequestController {
    constructor(private readonly reviewRequestService: ReviewRequestService) {}

    @ApiResponse({
        description: `Returns list of code review requests`,
        status: HttpStatus.OK,
        type: [CodeReviewRequestDto]
    })
    @ApiOperation({ summary: 'Get list of code review requests' })
    @Get()
    public getAll(): Promise<CodeReviewRequestDto[]> {
        return this.reviewRequestService.get();
    }

    @ApiResponse({
        description: `Returns code review request`,
        status: HttpStatus.OK,
        type: CodeReviewRequestDto
    })
    @ApiParam({
        name: 'id',
        description: 'Specifies which code review request to retrieve',
        type: 'string'
    })
    @ApiOperation({
        summary: 'Get particular code review request by specifying its id as param'
    })
    @Get(`:id`)
    public getOne(@Param('id') id: string): Promise<CodeReviewRequestDto> {
        return this.reviewRequestService.getOne(id);
    }

    @ApiResponse({
        description: `Returns created code review request`,
        status: HttpStatus.CREATED
    })
    @ApiOperation({ summary: 'Create a new code review request' })
    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    public create(
        @Req() request: AuthorizedRequest,
        @Body() reviewDataRequest: CodeReviewCreationDto
    ): Promise<unknown> {
        return this.reviewRequestService.create(reviewDataRequest, request.user);
    }

    @ApiOperation({ summary: 'Update code review request status' })
    @ApiParam({
        name: 'id',
        description: 'Specifies which code review request should be updated',
        type: 'string'
    })
    @ApiParam({
        name: 'statusId',
        description: 'Changes the status of code review request (Opened - 1 | Closed - 2)',
        enum: CodeReviewRequestStatusEnum
    })
    @Patch(`:id/status/:statusId`)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    public async updateStatus(
        @Param('id') id: string,
        @Param('statusId') status: CodeReviewRequestStatusEnum
    ): Promise<object> {
        await this.reviewRequestService.updateOne(id, status);

        return {};
    }
}
