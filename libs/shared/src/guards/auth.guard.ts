import { ServiceTokenPayload } from '@acua/shared';
import { TOKEN_MICROSERVICE_TOKEN } from '@acua/shared/token-microservice';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly tokenMicroservice = this.moduleRef.get(
        TOKEN_MICROSERVICE_TOKEN,
        { strict: false }
    );

    constructor(
      private readonly moduleRef: ModuleRef
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const tokenPayload: ServiceTokenPayload = await firstValueFrom(
            this.tokenMicroservice.send('decode_token', request.headers.authorization)
        );

        if (!tokenPayload) {
            throw new UnauthorizedException('Invalid token');
        }

        request.user = tokenPayload;

        return true;
    }
}
