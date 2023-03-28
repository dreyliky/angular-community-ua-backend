import { ServiceTokenPayload } from '@acua/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AES } from 'crypto-js';
import { ENVIRONMENT_KEY } from './data';

@Injectable()
export class MTokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    public async sign(payload: ServiceTokenPayload): Promise<string> {
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

    public decode(token: string): Pick<ServiceTokenPayload, 'tgId'> {
        const tokenPayload = this.jwtService.decode(token) as ServiceTokenPayload;

        return {
            tgId: tokenPayload.tgId
        };
    }

    public async verify(token: string | null): Promise<any> {
        await this.jwtService.verifyAsync(token, {
            secret: this.configService.get(ENVIRONMENT_KEY.JwtTokenSecret)
        });
    }

    public extractToken(bearerToken: string): string | null {
        if (bearerToken && bearerToken.split(' ')[0] === 'Bearer') {
            return bearerToken.split(' ')[1];
        }

        return null;
    }
}
