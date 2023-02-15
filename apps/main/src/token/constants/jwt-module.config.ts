import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvironmentKeyEnum } from '../../core/enums';

export const JWT_MODULE_CONFIG: JwtModuleOptions = {
    secret: process.env[EnvironmentKeyEnum.JwtTokenSecret]
};
