import { TokenPayload } from '@main/token';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthorizedUser } from './interfaces';
import { UserResponseDto } from './models';
import { UsersService } from './users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_TOKEN_SECRET
        });
    }

    public async validate(data: TokenPayload): Promise<AuthorizedUser> {
        const user = (await this.usersService.getUserByTgId(
            data.tgId
        )) as UserResponseDto;

        return this.convertUserToAuthorizedUser(user);
    }

    private convertUserToAuthorizedUser(user: UserResponseDto): AuthorizedUser {
        return {
            tgId: user.tgId,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.photoUrl,
            username: user.username
        };
    }
}
