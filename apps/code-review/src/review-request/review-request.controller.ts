import { AuthorizedUser } from '@acua/shared/user/interfaces';
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RouteParamEnum } from './enums';
import { CodeReviewDataRequestDto, CodeReviewRequestDto } from './models';
import { CodeReviewRequestDocument } from './schemas';
import { ReviewRequestService } from './services';

@ApiBearerAuth()
@ApiTags('review-request')
@UseGuards(AuthGuard('jwt'))
@Controller('review-request')
export class ReviewRequestController {
    constructor(private readonly reviewRequestService: ReviewRequestService) {}

    @Get()
    public find(): Promise<CodeReviewRequestDto[]> {
        return this.reviewRequestService.get();
    }

    @Get(`:${RouteParamEnum.Id}`)
    public findOne(@Param() params: any): Promise<CodeReviewRequestDto> {
        return this.reviewRequestService.getOne(params[RouteParamEnum.Id]);
    }

    @Post()
    public create(
        @Request() req: any,
        @Body() reviewDataRequest: CodeReviewDataRequestDto
    ): Promise<CodeReviewRequestDocument> {
        const authorizedUser = req.user as AuthorizedUser;

        return this.reviewRequestService.create(reviewDataRequest, authorizedUser.tgId);
    }

    @Patch(`:${RouteParamEnum.Id}/status/:${RouteParamEnum.StatusId}`)
    public async updateStatus(@Param() params: any): Promise<object> {
        const id = params[RouteParamEnum.Id];
        const status = params[RouteParamEnum.StatusId];

        await this.reviewRequestService.updateOne(id, status);

        return {};
    }
}
