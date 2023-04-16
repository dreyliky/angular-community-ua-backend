import { LOGGER_ENVIRONMENT_KEY } from '@acua/shared/logger';
import { M_TOKEN_ENVIRONMENT_KEY } from '@acua/shared/m-token';
import { M_USER_ENVIRONMENT_KEY } from '@acua/shared/m-user';
import { MONGO_ENVIRONMENT_KEY } from '@acua/shared/mongo';

export const ENVIRONMENT_KEY = {
    ...MONGO_ENVIRONMENT_KEY,
    ...LOGGER_ENVIRONMENT_KEY,
    ...M_TOKEN_ENVIRONMENT_KEY,
    ...M_USER_ENVIRONMENT_KEY,
    Port: 'PORT',
    Production: 'PROD'
} as const;
