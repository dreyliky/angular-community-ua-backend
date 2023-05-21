import { UserMS } from '@acua/shared/m-user';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentDocumentService, CommentDtoService } from './services';

@Module({
    imports: [MongoModule.forFeature()],
    controllers: [CommentsController],
    providers: [UserMS, CommentDocumentService, CommentDtoService]
})
export class CommentsModule {}
