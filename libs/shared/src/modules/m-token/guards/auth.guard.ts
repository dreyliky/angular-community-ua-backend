import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import { TokenPayload } from '../interfaces';
import { TOKEN_MICROSERVICE } from '../tokens';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly tokenMicroservice = this.moduleRef.get(
        TOKEN_MICROSERVICE,
        { strict: false }
    );

    constructor(private readonly moduleRef: ModuleRef) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const tokenPayload: TokenPayload = await firstValueFrom(
            this.tokenMicroservice.send(
                'decode_token',
                request.headers.authorization
            )
        );

        if (!tokenPayload) {
            throw new UnauthorizedException('Invalid token');
        }

        request.user = tokenPayload;

        return true;
    }
}
