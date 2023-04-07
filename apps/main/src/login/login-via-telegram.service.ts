import {
    ServiceTokenPayload,
    ServiceUser,
    TokenMicroservicePatternsEnum,
    UserMicroservicePattersEnum
} from '@acua/shared';
import { TOKEN_MICROSERVICE_TOKEN } from '@acua/shared/token-microservice';
import { USER_MICROSERVICE_TOKEN } from '@acua/shared/user-microservice';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
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

    private readonly userMicroservice = this.moduleRef.get(
        USER_MICROSERVICE_TOKEN,
        { strict: false }
    );

    private readonly tokenMicroservice = this.moduleRef.get(
        TOKEN_MICROSERVICE_TOKEN,
        { strict: false }
    );

    constructor(
        private readonly configService: ConfigService,
        private readonly moduleRef: ModuleRef
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
            this.tokenMicroservice.send(TokenMicroservicePatternsEnum.Sign, payload)
        );
        const encryptedToken: string = await firstValueFrom(
            this.tokenMicroservice.send(TokenMicroservicePatternsEnum.Encrypt, token)
        );
        const userData: ServiceUser = adaptTelegramResponseToUser(
            data,
            encryptedToken
        );

        await firstValueFrom(this.userMicroservice.send(
            UserMicroservicePattersEnum.Create, userData));

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
