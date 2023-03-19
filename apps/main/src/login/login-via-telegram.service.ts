import { User, UsersService } from '@acua/shared/user';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { ENVIRONMENT_KEY } from '../core';
import { TokenPayload, TokenService } from '../token';
import {
    adaptTelegramResponseToUser,
    convertTelegramLoginResponseToHashRawValue
} from './adapters';
import { TelegramLoginResponseDto } from './models';

@Injectable()
export class LoginViaTelegramService {
    private readonly botToken: string = this.configService.get(
        ENVIRONMENT_KEY.BotToken
    );

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly tokenService: TokenService
    ) {}

    public validateLoginResponseDto(data: TelegramLoginResponseDto): void {
        const dataCheckString =
            convertTelegramLoginResponseToHashRawValue(data);
        const secretKey = crypto
            .createHash('sha256')
            .update(this.botToken)
            .digest();
        const hash = crypto
            .createHmac('sha256', secretKey)
            .update(dataCheckString)
            .digest('hex');

        if (data.hash !== hash) {
            throw new BadRequestException();
        }
    }

    public async login(data: TelegramLoginResponseDto): Promise<string> {
        this.validateLoginResponseDto(data);

        const payload = this.getTokenCreationPayload(data.id, data.username);
        const token = await this.tokenService.sign(payload);
        const encryptedToken = this.tokenService.encrypt(token);
        const userData: User = adaptTelegramResponseToUser(
            data,
            encryptedToken
        );

        await this.userService.createOrUpdate(userData);

        return token;
    }

    private getTokenCreationPayload(
        id: number,
        username: string
    ): TokenPayload {
        return {
            tgId: id,
            username: username
        };
    }
}
