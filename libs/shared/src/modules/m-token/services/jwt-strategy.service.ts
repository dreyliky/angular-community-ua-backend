import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AuthorizedUser } from '../../m-user/interfaces';
import { CommandEnum } from '../enums';
import { TOKEN_MICROSERVICE } from '../tokens';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly tokenMicroservice = this.moduleRef.get<ClientProxy>(TOKEN_MICROSERVICE, {
        strict: false
    });

    constructor(private readonly moduleRef: ModuleRef) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers?.authorization;

        if (!token) {
            throw new UnauthorizedException();
        }

        const data: AuthorizedUser = await firstValueFrom(
            this.tokenMicroservice.send(CommandEnum.Decode, token)
        );

        if (!data) {
            throw new UnauthorizedException();
        }

        request.user = data;

        return true;
    }
}
