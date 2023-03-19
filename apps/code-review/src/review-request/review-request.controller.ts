import { AuthorizedUser } from '@acua/shared/user/interfaces';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CodeReviewRequestStatusEnum, RouteParamEnum } from './enums';
import { CodeReviewDataRequestDto, CodeReviewRequestDto } from './models';
import { CodeReviewRequestDocument } from './schemas';
import { ReviewRequestService } from './services';

@ApiBearerAuth()
@ApiTags('review-request')
@UseGuards(AuthGuard('jwt'))
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
    public find(): Promise<CodeReviewRequestDto[]> {
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
    @ApiOperation({ summary: 'Get particular code review request by specifying its id as param' })
    @Get(`:${RouteParamEnum.Id}`)
    public findOne(@Param() params: any): Promise<CodeReviewRequestDto> {
        return this.reviewRequestService.getOne(params[RouteParamEnum.Id]);
    }

    @ApiResponse({
        description: `Returns raw code review request`,
        status: HttpStatus.CREATED
    })
    @ApiOperation({ summary: 'Create a new code review request' })
    @Post()
    public create(
        @Request() req: any,
        @Body() reviewDataRequest: CodeReviewDataRequestDto
    ): Promise<CodeReviewRequestDocument> {
        const authorizedUser = req.user as AuthorizedUser;

        return this.reviewRequestService.create(reviewDataRequest, authorizedUser.tgId);
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
    @Patch(`:${RouteParamEnum.Id}/status/:${RouteParamEnum.StatusId}`)
    public async updateStatus(@Param() params: any): Promise<object> {
        const id = params[RouteParamEnum.Id];
        const status = params[RouteParamEnum.StatusId];

        await this.reviewRequestService.updateOne(id, status);

        return {};
    }
}
