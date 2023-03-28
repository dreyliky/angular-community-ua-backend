import { ServiceTokenPayload, ServiceUser } from '@acua/shared';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';
import { ENVIRONMENT_KEY } from '../core';
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
        @Inject('M-TOKEN') private readonly mTokenClient: ClientProxy,
        @Inject('M-USER') private readonly mUserClient: ClientProxy
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
        const token: string = await firstValueFrom(
            this.mTokenClient.send('sign_token', payload)
        );
        const encryptedToken: string = await firstValueFrom(
            this.mTokenClient.send('encrypt_token', token)
        );
        const userData: ServiceUser = adaptTelegramResponseToUser(
            data,
            encryptedToken
        );

        await firstValueFrom(this.mUserClient.send('create_user', userData));

        return token;
    }

    private getTokenCreationPayload(
        id: number,
        username: string
    ): ServiceTokenPayload {
        return {
            tgId: id,
            username: username
        };
    }
}
