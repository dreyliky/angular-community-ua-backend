import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvironmentKeyEnum } from '../../core';

export const JWT_MODULE_CONFIG: JwtModuleOptions = {
    secret: process.env[EnvironmentKeyEnum.JwtTokenSecret]
};
