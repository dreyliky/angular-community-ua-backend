import { EnvModule } from '@acua/shared/env';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JWT_MODULE_CONFIG } from './constants';

@Module({
    imports: [EnvModule, JwtModule.register(JWT_MODULE_CONFIG)],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
