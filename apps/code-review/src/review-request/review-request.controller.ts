import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { CodeReviewRequestStatusEnum } from './enums';
import { CodeReviewCreationDto, CodeReviewRequestDto } from './models';
import { ReviewRequestService } from './services';

@ApiBearerAuth()
@ApiTags('review-request')
// @UseGuards(AuthGuard('jwt'))
@Controller('review-request')
export class ReviewRequestController {
    constructor(private readonly reviewRequestService: ReviewRequestService) {}

    @ApiResponse({
        description: `Returns list of code review requests`,
        status: HttpStatus.OK,
        type: [CodeReviewRequestDto]
    })
    @ApiOperation({ summary: 'Get list of code review requests' })
    @Get()
    public get(): Promise<CodeReviewRequestDto[]> {
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
        summary:
            'Get particular code review request by specifying its id as param'
    })
    @Get(`:id`)
    public getOne(
        @Param('id') id: Types.ObjectId
    ): Promise<CodeReviewRequestDto> {
        return this.reviewRequestService.getOne(id);
    }

    @ApiResponse({
        description: `Returns created code review request`,
        status: HttpStatus.CREATED
    })
    @ApiOperation({ summary: 'Create a new code review request' })
    @Post()
    public create(
        @Req() req: Request,
        @Body() reviewDataRequest: CodeReviewCreationDto
    ): Promise<unknown> {
        return this.reviewRequestService.create(
            reviewDataRequest,
            672489459
        );
    }

    // eslint-disable-next-line max-lines-per-function
    @ApiOperation({ summary: 'Update code review request status' })
    @ApiParam({
        name: 'id',
        description: 'Specifies which code review request should be updated',
        type: 'string'
    })
    @ApiParam({
        name: 'statusId',
        description:
            'Changes the status of code review request (Opened - 1 | Closed - 2)',
        enum: CodeReviewRequestStatusEnum
    })
    @Patch(`:id/status/:statusId`)
    public async updateStatus(
        @Param('id') id: Types.ObjectId,
        @Param('statusId') status: CodeReviewRequestStatusEnum
    ): Promise<object> {
        await this.reviewRequestService.updateOne(id, status);

        return {};
    }
}
