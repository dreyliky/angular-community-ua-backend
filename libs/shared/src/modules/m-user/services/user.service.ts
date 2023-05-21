import { CommandEnum, USER_MICROSERVICE } from '@acua/shared/m-user';
import { Schema } from '@acua/shared/mongo';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserMS {
    private readonly microService = this.moduleRef.get<ClientProxy>(USER_MICROSERVICE, {
        strict: false
    });

    constructor(private readonly moduleRef: ModuleRef) {}

    public getByTgId(tgId: number): Promise<Schema.UserDoc> {
        return firstValueFrom(this.microService.send(CommandEnum.GetByTgId, tgId));
    }
}
