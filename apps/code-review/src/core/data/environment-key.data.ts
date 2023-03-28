import { LOGGER_ENVIRONMENT_KEY } from '@acua/shared/logger';
import { MONGO_ENVIRONMENT_KEY } from '@acua/shared/mongo';

export const ENVIRONMENT_KEY = {
    ...MONGO_ENVIRONMENT_KEY,
    ...LOGGER_ENVIRONMENT_KEY,
    MUserPort: 'M_USER_PORT',
    MTokenPort: 'M_TOKEN_PORT',
    Port: 'PORT',
    Production: 'PROD'
} as const;
