import { EnvModule } from '@acua/shared/env';
import { LoggerModule } from '@acua/shared/logger';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [EnvModule, MongoModule.forRoot(), LoggerModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
