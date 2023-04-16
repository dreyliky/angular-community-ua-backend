import {
    CommandEnum as M_TokenCommand,
    TOKEN_MICROSERVICE,
    TokenPayload
} from '@acua/shared/m-token';
import {
    CommandEnum as M_UserCommand,
    USER_MICROSERVICE,
    User
} from '@acua/shared/m-user';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
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

    private readonly userMicroservice = this.moduleRef.get<ClientProxy>(
        USER_MICROSERVICE,
        { strict: false }
    );

    private readonly tokenMicroservice = this.moduleRef.get<ClientProxy>(
        TOKEN_MICROSERVICE,
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

    // eslint-disable-next-line max-lines-per-function
    public async login(data: TelegramLoginResponseDto): Promise<string> {
        this.validateLoginResponseDto(data);

        const payload: TokenPayload = {
            tgId: data.id,
            username: data.username
        };
        const token: string = await firstValueFrom(
            this.tokenMicroservice.send(M_TokenCommand.Sign, payload)
        );
        const encryptedToken: string = await firstValueFrom(
            this.tokenMicroservice.send(M_TokenCommand.Encrypt, token)
        );
        const userData: User = adaptTelegramResponseToUser(
            data,
            encryptedToken
        );

        await firstValueFrom(
            this.userMicroservice.send(M_UserCommand.Create, userData)
        );

        return token;
    }
}
