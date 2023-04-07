import { LoggerModule } from '@acua/shared/logger';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './schemas';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongoModule,
        LoggerModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
