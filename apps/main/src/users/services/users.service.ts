import { CommandEnum, USER_MICROSERVICE, UserDto } from '@acua/shared/m-user';
import { User } from '@acua/shared/m-user/schemas';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, switchMap } from 'rxjs';

@Injectable()
export class UsersService {
    private readonly userMicroservice = this.moduleRef.get<ClientProxy>(USER_MICROSERVICE, {
        strict: false
    });

    constructor(private readonly moduleRef: ModuleRef) {}

    public getMe(userTgId: number): Promise<UserDto> {
        const userDto$ = this.userMicroservice
            .send<User>(CommandEnum.GetByTgId, userTgId)
            .pipe(
                switchMap((userDocument) =>
                    this.userMicroservice.send<UserDto>(CommandEnum.AdaptToDto, userDocument)
                )
            );

        return firstValueFrom(userDto$);
    }
}
