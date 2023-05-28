import { CommandEnum, TokenPayload } from '@acua/shared/m-token';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(CommandEnum.Sign)
    public sign(payload: TokenPayload): Promise<string> {
        return this.appService.sign(payload);
    }

    @MessagePattern(CommandEnum.Encrypt)
    public encrypt(token: string): string {
        return this.appService.encrypt(token);
    }

    @MessagePattern(CommandEnum.Decrypt)
    public decrypt(token: string): string {
        return this.appService.decrypt(token);
    }

    @MessagePattern(CommandEnum.Decode)
    public async decode(bearerToken: string): Promise<Pick<TokenPayload, 'tgId'> | null> {
        const token = this.appService.extractToken(bearerToken);

        try {
            await this.appService.verify(token);
        } catch {
            return null;
        }

        return this.appService.decode(token);
    }
}
