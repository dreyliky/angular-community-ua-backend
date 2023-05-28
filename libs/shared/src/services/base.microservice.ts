import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export abstract class BaseMicroservice {
    protected readonly microService = this.moduleRef.get<ClientProxy>(this.msToken, {
        strict: false
    });

    constructor(protected readonly msToken: any, protected readonly moduleRef: ModuleRef) {}

    protected trySend<T>(event: any, data: any): Promise<T | null> {
        try {
            // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
            return firstValueFrom(this.microService.send(event, data)).catch(() => {});
        } catch (error) {
            return Promise.resolve(null);
        }
    }
}
