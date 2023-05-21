import { CreationResponseDto, RequiredQuery } from '@acua/shared';
import {
    CommentAmountDictionaryDto,
    CommentCreationDto,
    CommentDto,
    CommentEditingDto
} from '@acua/shared/code-review';
import { JwtAuthGuard } from '@acua/shared/m-token';
import { AuthorizedRequest } from '@acua/shared/m-user';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { CommentDocumentService, CommentDtoService } from './services';
import { COMMENT_AMOUNT_RESPONSE_EXAMPLE } from './swagger-examples';

@ApiTags('Comments')
@Controller('review-requests')
export class CommentsController {
    constructor(
        private readonly commentDtoService: CommentDtoService,
        private readonly commentDocumentService: CommentDocumentService
    ) {}

    @Get(`:id/comments`)
    @ApiOperation({ summary: 'Get all comments of request review' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CommentDto,
        isArray: true
    })
    public getAll(@Param('id') reviewRequestId: string): Promise<CommentDto[]> {
        return this.commentDtoService.getAll(reviewRequestId);
    }

    @Get(`:id/comments/within-line-of-code`)
    @ApiOperation({
        summary: 'Returns comments of request review on specific file and line of code'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CommentDto,
        isArray: true
    })
    @ApiQuery({ name: 'fileFullPath', description: 'Full Path to the file', type: String })
    @ApiQuery({ name: 'lineNumber', description: 'Line of the Code', type: Number })
    public getAllPerFileLine(
        @Param('id') reviewRequestId: string,
        @RequiredQuery('fileFullPath') fileFullPath: string,
        @RequiredQuery('lineNumber', ParseIntPipe) lineNumber: number
    ): Promise<CommentDto[]> {
        return this.commentDtoService.getAllPerFileLine(reviewRequestId, fileFullPath, lineNumber);
    }

    @Get(`:id/comments/amount-per-files`)
    @ApiOperation({ summary: 'Get amount of comments per each file' })
    @ApiResponse({
        status: HttpStatus.OK,
        schema: COMMENT_AMOUNT_RESPONSE_EXAMPLE
    })
    public getDictionaryAmount(
        @Param('id') reviewRequestId: string
    ): Promise<CommentAmountDictionaryDto> {
        return this.commentDtoService.getDictionaryAmount(reviewRequestId);
    }

    @Post(`:id/comments`)
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    @ApiOperation({ summary: 'Creates comment per line of code in concrete file' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CreationResponseDto
    })
    @ApiBearerAuth()
    public create(
        @Req() request: AuthorizedRequest,
        @Param('id') reviewRequestId: string,
        @Body() creationDto: CommentCreationDto
    ): Promise<CreationResponseDto> {
        return this.commentDtoService.create(creationDto, reviewRequestId, request.user);
    }

    @Patch(`:id/comments/:commentId`)
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    @ApiOperation({ summary: 'Edits comment per line of code in concrete file' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Boolean
    })
    @ApiParam({ name: 'id', type: String })
    @ApiParam({ name: 'commentId', type: String })
    @ApiBearerAuth()
    public async edit(
        @Req() request: AuthorizedRequest,
        @Param('id') reviewRequestId: string,
        @Param('commentId') commentId: string,
        @Body() editingDto: CommentEditingDto
    ): Promise<boolean> {
        await this.commentDocumentService.edit(
            editingDto,
            reviewRequestId,
            commentId,
            request.user
        );

        return true;
    }

    @Delete(`:id/comments/:commentId`)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Deletes comment per line of code in concrete file' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Boolean
    })
    @ApiParam({ name: 'id', type: String })
    @ApiParam({ name: 'commentId', type: String })
    @ApiBearerAuth()
    public async delete(
        @Req() request: AuthorizedRequest,
        @Param('commentId') commentId: string
    ): Promise<unknown> {
        await this.commentDocumentService.delete(commentId, request.user);

        return true;
    }
}
