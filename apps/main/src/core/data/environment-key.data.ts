import { LOGGER_ENVIRONMENT_KEY } from '@acua/shared/logger';
import { MONGO_ENVIRONMENT_KEY } from '@acua/shared/mongo';

export const ENVIRONMENT_KEY = {
    ...LOGGER_ENVIRONMENT_KEY,
    ...MONGO_ENVIRONMENT_KEY,
    Port: 'PORT',
    Production: 'PROD',
    BotToken: 'TELEGRAM_BOT_TOKEN',
    JwtTokenSecret: 'JWT_TOKEN_SECRET',
    EncryptionSecret: 'ENCRYPTION_SECRET'
} as const;
