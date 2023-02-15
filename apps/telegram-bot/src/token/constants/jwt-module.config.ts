import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvironmentKeyEnum } from '../../core';

export const JWT_MODULE_CONFIG: JwtModuleOptions = {
    secret: new ConfigService().get(EnvironmentKeyEnum.JwtToken)
};
