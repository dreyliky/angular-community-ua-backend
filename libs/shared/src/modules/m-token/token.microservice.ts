import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseMicroservice } from '../../services';
import { CommandEnum } from './enums';
import { TokenPayload } from './interfaces';
import { TOKEN_MICROSERVICE } from './tokens';

// FIXME: Add all methods Microservice support
// and replace ClientProxy direct usage in all places
@Injectable()
export class TokenMS extends BaseMicroservice {
    constructor(moduleRef: ModuleRef) {
        super(TOKEN_MICROSERVICE, moduleRef);
    }

    public sign(data: TokenPayload): Promise<string> {
        return this.send(CommandEnum.Sign, data);
    }

    public decode(token: string): Promise<string> {
        return this.send(CommandEnum.Decode, token);
    }
}
