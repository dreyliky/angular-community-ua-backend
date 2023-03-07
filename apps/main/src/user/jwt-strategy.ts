import { TokenPayload } from '@main/token';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthorizedUser } from './interfaces';
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

    public validate(data: TokenPayload): AuthorizedUser {
        return { tgId: data.tgId };
    }
}
