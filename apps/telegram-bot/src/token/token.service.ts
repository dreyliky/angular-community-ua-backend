import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentKeyEnum } from '@telegram-bot/core';
import { AES } from 'crypto-js';
import { TokenPayload } from './../login/interfaces';

@Injectable()
export class TokenService {
    constructor(
        private readonly configEnvService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    public async sign(payload: TokenPayload): Promise<any> {
        const token = await this.jwtService.signAsync(payload, {
            secret: this.configEnvService.get(EnvironmentKeyEnum.JwtTokenSecret)
        });

        return token;
    }

    public encrypt(token: string): string {
        const encryptedKey = this.configEnvService.get(EnvironmentKeyEnum.EncryptionSecret);
        const encryptedToken = AES.encrypt(token, encryptedKey);

        return encryptedToken.toString();
    }

    public decryptToken(encryptedToken: string): string {
        const encryptedKey = this.configEnvService.get(EnvironmentKeyEnum.EncryptionSecret);
        const decryptedToken = AES.decrypt(encryptedToken, encryptedKey);

        return decryptedToken.toString();
    }
}
