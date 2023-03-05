import { TokenPayload } from '@main/token';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthorizedUser } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_TOKEN_SECRET
        });
    }

    public validate(data: TokenPayload): AuthorizedUser {
        console.log(data);

        return { tgId: data.tgId };
    }
}
