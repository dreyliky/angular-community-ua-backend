import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentKeyEnum } from '@telegram-bot/core';
import * as crypto from 'crypto';
import { User, UsersService } from '../user';
import { TokenService } from './../token/token.service';
import {
    adaptTelegramResponseToUser,
    convertTelegramLoginResponseToHashRawValue
} from './adapters';
import { TokenPayload } from './interfaces';
import { TelegramLoginResponseDto } from './models';

@Injectable()
export class LoginViaTelegramService {
    private readonly botToken: string = this.configEnvService.get(EnvironmentKeyEnum.BotToken);

    constructor(
        private readonly configEnvService: ConfigService,
        private readonly userService: UsersService,
        private readonly tokenService: TokenService
    ) {}

    public validateLoginResponseDto(data: TelegramLoginResponseDto): void {
        const dataCheckString = convertTelegramLoginResponseToHashRawValue(data);
        const secretKey = crypto.createHash('sha256').update(this.botToken).digest();
        const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

        if (data.hash !== hash) {
            throw new BadRequestException();
        }
    }

    public async login(dataResponse: TelegramLoginResponseDto): Promise<string> {
        this.validateLoginResponseDto(dataResponse);

        const payload = this.tokenCreationPayload(dataResponse.id, dataResponse.username);

        const token = await this.tokenService.sign(payload);
        const encryptedToken = this.tokenService.encrypt(token);

        const userData: User = adaptTelegramResponseToUser(dataResponse, encryptedToken);

        await this.userService.createOrUpdate(userData);

        return token;
    }

    private tokenCreationPayload(id: number, username: string): TokenPayload {
        return {
            tgId: id,
            username: username
        };
    }
}
