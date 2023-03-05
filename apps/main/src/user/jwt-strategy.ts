import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_TOKEN_SECRET
        });
    }

    public async validate(data: any): Promise<any> {
        if (!data) {
            throw new UnauthorizedException();
        }
        const user = await this.usersService.getById(+data.id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
