import { TokenModule } from '@main/token';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { UsersService } from './users.service';

@Module({
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        TokenModule,
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            signOptions: { expiresIn: '1d' }
        })
    ],
    providers: [UsersService, JwtStrategy, JwtService],
    exports: [UsersService]
})
export class UserModule {}
