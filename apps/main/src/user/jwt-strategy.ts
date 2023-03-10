import { ENVIRONMENT_KEY } from '@main/core';
import { TokenPayload } from '@main/token';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthorizedUser } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(ENVIRONMENT_KEY.JwtTokenSecret)
        });
    }

    public validate(data: TokenPayload): AuthorizedUser {
        return { tgId: data.tgId };
    }
}
