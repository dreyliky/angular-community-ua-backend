import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { EnvironmentKeyEnum } from '@telegram-bot/core';
import { AES } from 'crypto-js';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.entity';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
        private readonly configEnvService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        // FIXME: Remove
        // This is example of working with database
        // this.create();
    }

    public async findOne(token: string): Promise<any> {
        return await this.tokenModel.findOne({ accessToken: token }).exec();
    }

    public async create(payload: { tgId: number, username: string }): Promise<any> {
        const newToken = await this.signToken(payload);
        const newEncToken = this.encryptToken(newToken);

        const encToken = await this.findOne(newEncToken);

        if (encToken === newEncToken) {
            return encToken;
        }

        const newEncAccessToken = new this.tokenModel({ accessToken: newEncToken });
        await newEncAccessToken.save();

        return newToken;
    }

    private async signToken(payload: { tgId: number, username: string }): Promise<any> {
        return this.jwtService.signAsync(payload, {
            secret: this.configEnvService.get(EnvironmentKeyEnum.JwtToken)
        });
    }

    private encryptToken(token: string): string {
        const encKey = this.configEnvService.get(EnvironmentKeyEnum.EncryptionKey);
        const encToken = AES.encrypt(token, encKey);

        return encToken.toString();
    }

    private decryptToken(encToken: string): string {
        const encKey = this.configEnvService.get(EnvironmentKeyEnum.EncryptionKey);
        const decToken = AES.decrypt(encToken, encKey);

        return decToken.toString();
    }
}
