import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { UsersService } from './users.service';

@Module({
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            signOptions: { expiresIn: '1d' }
        })
    ],
    providers: [UsersService, JwtStrategy, JwtService],
    exports: [UsersService]
})
export class UserModule {}
