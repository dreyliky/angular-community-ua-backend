import { AuthorizedRequest, CreationResponseDto, RequiredQuery } from '@acua/shared';
import { JwtAuthGuard } from '@acua/shared/m-token';
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
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentAmountDictionaryDto } from './interfaces';
import { CommentCreationDto, CommentDto, CommentEditingDto } from './models';
import { CommentDocumentService, CommentDtoService } from './services';
import { COMMENT_AMOUNT_RESPONSE_EXAMPLE } from './swagger-examples';

@ApiTags('Comments')
@Controller('review-requests')
export class CommentsController {
    constructor(
        private readonly commentDtoService: CommentDtoService,
        private readonly commentDocumentService: CommentDocumentService
    ) {}

    @ApiOperation({ summary: 'Get all comments of request review' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CommentDto,
        isArray: true
    })
    @Get(`:id/comments`)
    public getAll(@Param('id') reviewRequestId: string): Promise<CommentDto[]> {
        return this.commentDtoService.getAll(reviewRequestId);
    }

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
    @Get(`:id/comments/within-line-of-code`)
    public getAllPerFileLine(
        @Param('id') reviewRequestId: string,
        @RequiredQuery('fileFullPath') fileFullPath: string,
        @RequiredQuery('lineNumber', ParseIntPipe) lineNumber: number
    ): Promise<CommentDto[]> {
        return this.commentDtoService.getAllPerFileLine(reviewRequestId, fileFullPath, lineNumber);
    }

    @ApiOperation({ summary: 'Get amount of comments per line of code in each file' })
    @ApiResponse({
        status: HttpStatus.OK,
        schema: COMMENT_AMOUNT_RESPONSE_EXAMPLE
    })
    @Get(`:id/comments/amount`)
    public getDictionaryAmount(
        @Param('id') reviewRequestId: string
    ): Promise<CommentAmountDictionaryDto> {
        return this.commentDtoService.getDictionaryAmount(reviewRequestId);
    }

    @ApiOperation({ summary: 'Creates comment per line of code in concrete file' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CreationResponseDto
    })
    @Post(`:id/comments`)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    public create(
        @Req() request: AuthorizedRequest,
        @Param('id') reviewRequestId: string,
        @Body() creationDto: CommentCreationDto
    ): Promise<CreationResponseDto> {
        return this.commentDtoService.create(creationDto, reviewRequestId, request.user);
    }

    @ApiOperation({ summary: 'Edits comment per line of code in concrete file' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Boolean
    })
    @Patch(`:id/comments/:commentId`)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
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

    @ApiOperation({ summary: 'Deletes comment per line of code in concrete file' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Boolean
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(`:id/comments/:commentId`)
    public async delete(
        @Req() request: AuthorizedRequest,
        @Param('commentId') commentId: string
    ): Promise<unknown> {
        await this.commentDocumentService.delete(commentId, request.user);

        return true;
    }
}
