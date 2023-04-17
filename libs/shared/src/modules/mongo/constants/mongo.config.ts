import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from '@nestjs/mongoose';
import { MONGO_ENVIRONMENT_KEY as ENVIRONMENT_KEY } from '../data';

export const MONGO_CONFIG: MongooseModuleAsyncOptions = {
    useFactory: (configService: ConfigService) =>
        <MongooseModuleOptions>{
            uri: configService.get(ENVIRONMENT_KEY.MongoUrl),
            auth: {
                username: configService.get(ENVIRONMENT_KEY.MongoUser),
                password: configService.get(ENVIRONMENT_KEY.MongoPassword)
            },
            dbName: configService.get(ENVIRONMENT_KEY.MongoDatabase),
            retryDelay: 1000 * 60
        },
    inject: [ConfigService]
};
