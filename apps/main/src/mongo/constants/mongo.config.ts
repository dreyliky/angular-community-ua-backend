import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvironmentKeyEnum } from '../../core';

export const MONGO_CONFIG: MongooseModuleAsyncOptions = {
    useFactory: (configService: ConfigService) => (<MongooseModuleOptions>{
        uri: configService.get(EnvironmentKeyEnum.MongoUrl),
        auth: {
            username: configService.get(EnvironmentKeyEnum.MongoUser),
            password: configService.get(EnvironmentKeyEnum.MongoPassword)
        },
        dbName: configService.get(EnvironmentKeyEnum.MongoDatabase),
        retryDelay: (1000 * 60)
    }),
    inject: [
        ConfigService
    ]
};
