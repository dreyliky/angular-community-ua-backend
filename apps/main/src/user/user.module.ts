import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { UsersService } from './users.service';

@Module({
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}
