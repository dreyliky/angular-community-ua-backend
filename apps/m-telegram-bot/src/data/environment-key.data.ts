import { LOGGER_ENVIRONMENT_KEY } from '@acua/shared/logger';
import { M_USER_ENVIRONMENT_KEY } from '@acua/shared/m-user';
import { MONGO_ENVIRONMENT_KEY } from '@acua/shared/mongo';

export const ENVIRONMENT_KEY = {
    ...MONGO_ENVIRONMENT_KEY,
    ...LOGGER_ENVIRONMENT_KEY,
    ...M_USER_ENVIRONMENT_KEY,
    Host: 'HOST',
    Port: 'PORT',
    Production: 'PROD',
    BotToken: 'TELEGRAM_BOT_TOKEN',
    AcuaWebOverviewPageUrl: 'ACUA_WEB_OVERVIEW_PAGE_URL',
    AcuaGroupChatId: 'ACUA_GROUP_CHAT_ID',
    AcuaGroupCodeReviewThreadId: 'ACUA_GROUP_CODE_REVIEW_THREAD_ID'
} as const;
