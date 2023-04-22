import { User, UserSchema } from '@acua/shared/m-user/schemas';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { Comment, CommentSchema } from './schemas';
import { CommentDocumentService, CommentDtoService } from './services';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Comment.name, schema: CommentSchema }
        ])
    ],
    controllers: [CommentsController],
    providers: [CommentDocumentService, CommentDtoService]
})
export class CommentsModule {}
