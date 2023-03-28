import { ServiceTokenPayload } from '@acua/shared';
import {
    CanActivate,
    ExecutionContext, Inject, Injectable, UnauthorizedException
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

  @Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      @Inject('M-TOKEN') private readonly mTokenClient: ClientProxy
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const tokenPayload: ServiceTokenPayload = await firstValueFrom(
            this.mTokenClient.send('decode_token', request.headers.authorization)
        );

        if (!tokenPayload) {
            throw new UnauthorizedException('Invalid token');
        }

        request.user = tokenPayload;

        return true;
    }
}
