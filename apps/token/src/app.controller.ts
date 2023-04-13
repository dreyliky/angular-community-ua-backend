import { TokenPayload } from '@acua/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenMicroservicePatternsEnum } from 'libs/shared/src/enums';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(TokenMicroservicePatternsEnum.Sign)
    public sign(payload: TokenPayload): Promise<string> {
        return this.appService.sign(payload);
    }

    @MessagePattern(TokenMicroservicePatternsEnum.Encrypt)
    public encrypt(token: string): string {
        return this.appService.encrypt(token);
    }

    @MessagePattern(TokenMicroservicePatternsEnum.Decrypt)
    public decrypt(token: string): string {
        return this.appService.decrypt(token);
    }

    @MessagePattern(TokenMicroservicePatternsEnum.Decode)
    public async decode(bearerToken: string): Promise<Pick<TokenPayload, 'tgId'> | null> {
        const token = this.appService.extractToken(bearerToken);

        if (!token) {
            return null;
        }

        try {
            await this.appService.verify(token);
        } catch {
            return null;
        }

        return this.appService.decode(token);
    }
}
