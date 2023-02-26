import { JwtModuleOptions } from '@nestjs/jwt';
import { ENVIRONMENT_KEY } from '../../core';

export const JWT_MODULE_CONFIG: JwtModuleOptions = {
    secret: process.env[ENVIRONMENT_KEY.JwtTokenSecret]
};
