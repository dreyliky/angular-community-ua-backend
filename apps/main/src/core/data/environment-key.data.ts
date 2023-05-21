import { M_TOKEN_ENVIRONMENT_KEY } from '@acua/common/m-token';
import { M_USER_ENVIRONMENT_KEY } from '@acua/common/m-user';
import { LOGGER_ENVIRONMENT_KEY } from '@acua/shared/logger';
import { MONGO_ENVIRONMENT_KEY } from '@acua/shared/mongo';

export const ENVIRONMENT_KEY = {
    ...LOGGER_ENVIRONMENT_KEY,
    ...MONGO_ENVIRONMENT_KEY,
    ...M_TOKEN_ENVIRONMENT_KEY,
    ...M_USER_ENVIRONMENT_KEY,
    Port: 'PORT',
    Production: 'PROD',
    BotToken: 'TELEGRAM_BOT_TOKEN',
    JwtTokenSecret: 'JWT_TOKEN_SECRET',
    EncryptionSecret: 'ENCRYPTION_SECRET'
} as const;
