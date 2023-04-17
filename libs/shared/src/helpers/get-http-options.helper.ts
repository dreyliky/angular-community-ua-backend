import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import * as fs from 'fs';

export function getHttpOptions(): HttpsOptions | undefined {
    if (process.env['PROD'] === 'true') {
        return {
            key: fs.readFileSync(`${__dirname}/private.key`),
            cert: fs.readFileSync(`${__dirname}/certificate.crt`),
            rejectUnauthorized: true
        };
    }

    return undefined;
}
