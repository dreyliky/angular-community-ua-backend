import { LOGGER_ENVIRONMENT_KEY } from '@acua/shared/logger';

export const ENVIRONMENT_KEY = {
    ...LOGGER_ENVIRONMENT_KEY,
    Host: 'HOST',
    Port: 'PORT',
    JwtTokenSecret: 'JWT_TOKEN_SECRET',
    EncryptionSecret: 'ENCRYPTION_SECRET'
} as const;
