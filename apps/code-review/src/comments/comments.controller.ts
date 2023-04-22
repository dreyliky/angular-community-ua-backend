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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

    @ApiResponse({
        description: `Returns array of the comments of request review`,
        status: HttpStatus.OK
    })
    @ApiOperation({ summary: 'Get list of code review requests' })
    @Get(`:id/comments`)
    public getAllPerFileLine(
        @Param('id') reviewRequestId: string,
        @RequiredQuery('fileFullPath') fileFullPath: string,
        @RequiredQuery('lineNumber', ParseIntPipe) lineNumber: number
    ): Promise<CommentDto[]> {
        return this.commentDtoService.getAllPerFileLine(reviewRequestId, fileFullPath, lineNumber);
    }

    @ApiResponse({
        description: `Returns amount of comments per line of codes in each project file`,
        status: HttpStatus.OK,
        schema: COMMENT_AMOUNT_RESPONSE_EXAMPLE
    })
    @ApiOperation({ summary: 'Get amount of comments per line of code in each file' })
    @Get(`:id/comments/amount`)
    public getDictionaryAmount(
        @Param('id') reviewRequestId: string
    ): Promise<CommentAmountDictionaryDto> {
        return this.commentDtoService.getDictionaryAmount(reviewRequestId);
    }

    @ApiResponse({
        description: `Creates comment per line of code in concrete file`,
        status: HttpStatus.OK
    })
    @ApiOperation({ summary: 'Creates comment per line of code in concrete file' })
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

    @ApiResponse({
        description: `Edits comment per line of code in concrete file`,
        status: HttpStatus.OK
    })
    @ApiOperation({ summary: 'Edits comment per line of code in concrete file' })
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

    @ApiResponse({
        description: `Deletes comment per line of code in concrete file`,
        status: HttpStatus.OK
    })
    @ApiOperation({ summary: 'Deletes comment per line of code in concrete file' })
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
