import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentDocumentService, CommentDtoService } from './services';

@Module({
    imports: [MongoModule.forFeature()],
    controllers: [CommentsController],
    providers: [CommentDocumentService, CommentDtoService]
})
export class CommentsModule {}
