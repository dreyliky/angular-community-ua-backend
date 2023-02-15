import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvironmentKeyEnum } from '../../core/enums';

export const JWT_MODULE_CONFIG: JwtModuleOptions = {
    secret: new ConfigService().get(EnvironmentKeyEnum.JwtTokenSecret)
};
