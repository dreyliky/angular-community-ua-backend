import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { EnvironmentKeyEnum } from '../core/enums';
import { TokenService } from '../token';
import { TokenPayload } from '../token/interfaces';
import { User, UsersService } from '../user';
import {
    adaptTelegramResponseToUser,
    convertTelegramLoginResponseToHashRawValue
} from './adapters';
import { TelegramLoginResponseDto } from './models';

@Injectable()
export class LoginViaTelegramService {
    private readonly botToken: string = this.configService.get(EnvironmentKeyEnum.BotToken);

    constructor(
        private readonly configService: ConfigService,
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

        const payload = this.getTokenCreationPayload(dataResponse.id, dataResponse.username);

        const token = await this.tokenService.sign(payload);
        const encryptedToken = this.tokenService.encrypt(token);

        const userData: User = adaptTelegramResponseToUser(dataResponse, encryptedToken);

        await this.userService.createOrUpdate(userData);

        return token;
    }

    private getTokenCreationPayload(id: number, username: string): TokenPayload {
        return {
            tgId: id,
            username: username
        };
    }
}
