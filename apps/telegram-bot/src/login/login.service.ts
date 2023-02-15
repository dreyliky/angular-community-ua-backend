import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentKeyEnum } from '@telegram-bot/core';
import * as crypto from 'crypto';
import { User, UsersService } from '../user';
import { TokenService } from './../token/token.service';
import { convertResponseToCheckString } from './adapters';
import { TelegramLoginResponseDto } from './models';

@Injectable()
export class LoginService {
    private readonly botToken: string = this.configEnvService.get(EnvironmentKeyEnum.BotToken);

    constructor(
        private readonly configEnvService: ConfigService,
        private readonly userService: UsersService,
        private readonly tokenService: TokenService
    ) {}

    public checkTelegramAuth(dataResponse: TelegramLoginResponseDto): void {
        const checkHash = dataResponse.hash;
        const dataCheckString = convertResponseToCheckString(dataResponse);
        const secretKey = crypto.createHash('sha256').update(this.botToken).digest();
        const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

        if (checkHash !== hash) {
            throw new UnauthorizedException();
        }
    }

    public async login(dataResponse: TelegramLoginResponseDto): Promise<any> {
        const payload = {
            tgId: dataResponse.id,
            username: dataResponse.username
        };
        const userData: User = {
            tgId: dataResponse.id,
            firstName: dataResponse.first_name,
            lastName: dataResponse.last_name,
            auth_date: dataResponse.auth_date,
            hash: dataResponse.hash,
            photoUrl: dataResponse.photo_url,
            username: dataResponse.username
        };
        await this.userService.createOrUpdate(userData);

        return {
            access_token: await this.tokenService.create(payload)
        };
    }
}
