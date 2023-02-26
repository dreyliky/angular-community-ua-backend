import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AES } from 'crypto-js';
import { ENVIRONMENT_KEY } from '../core';
import { TokenPayload } from './interfaces';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    public async sign(payload: TokenPayload): Promise<string> {
        const token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get(ENVIRONMENT_KEY.JwtTokenSecret)
        });

        return token;
    }

    public encrypt(token: string): string {
        const encryptedKey = this.configService.get(
            ENVIRONMENT_KEY.EncryptionSecret
        );
        const encryptedToken = AES.encrypt(token, encryptedKey);

        return encryptedToken.toString();
    }

    public decrypt(encryptedToken: string): string {
        const encryptedKey = this.configService.get(
            ENVIRONMENT_KEY.EncryptionSecret
        );
        const decryptedToken = AES.decrypt(encryptedToken, encryptedKey);

        return decryptedToken.toString();
    }
}
