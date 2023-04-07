import { ServiceTokenPayload } from '@acua/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenMicroservicePatternsEnum } from 'libs/shared/src/enums';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly mTokenService: AppService) {}

    @MessagePattern(TokenMicroservicePatternsEnum.Sign)
    public sign(payload: ServiceTokenPayload): Promise<string> {
        return this.mTokenService.sign(payload);
    }

    @MessagePattern(TokenMicroservicePatternsEnum.Encrypt)
    public encrypt(token: string): string {
        return this.mTokenService.encrypt(token);
    }

    @MessagePattern(TokenMicroservicePatternsEnum.Decrypt)
    public decrypt(token: string): string {
        return this.mTokenService.decrypt(token);
    }

    @MessagePattern(TokenMicroservicePatternsEnum.Decode)
    public async decode(bearerToken: string): Promise<Pick<ServiceTokenPayload, 'tgId'> | null> {
        const token = this.mTokenService.extractToken(bearerToken);

        if (!token) {
            return null;
        }

        try {
            await this.mTokenService.verify(token);
        } catch {
            return null;
        }

        return this.mTokenService.decode(token);
    }
}
